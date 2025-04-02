import express from 'express';
import pkg from 'pg';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import cors from 'cors';
const { Pool } = pkg;

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Adjust if your frontend runs on a different port
    credentials: true
  })
);

// Initialize Clerk middleware with your secret key
app.use(
  ClerkExpressWithAuth({
    clerkSecretKey: process.env.CLERK_SECRET_KEY
  })
);

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_v4gEsSw6tNlP@ep-ancient-moon-a11ocv3e-pooler.ap-southeast-1.aws.neon.tech/neondb',
  ssl: { rejectUnauthorized: false }
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        title TEXT NOT NULL,
        description TEXT,
        due_date TIMESTAMP,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database tables initialized successfully');
  } catch (err) {
    console.error('Database initialization error:', err.stack);
  }
}

async function verifyDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    return true;
  } catch (err) {
    console.error('Database connection error:', err.stack);
    return false;
  }
}

// Format the todo response from DB rows
function formatTodoResponse(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    dueDate: row.due_date ? row.due_date.toISOString() : '',
    completed: row.completed,
    createdAt: row.created_at ? row.created_at.toISOString() : ''
  };
}

// Ensure the user is authenticated via Clerk and exists in the DB.
// The function now tries to extract the primary email robustly.
async function ensureUser(req, res, next) {
  if (!req.auth) {
    return res.status(401).json({ error: 'Unauthorized - No auth data' });
  }

  const { userId } = req.auth;
  if (!userId) {
    console.error('No userId in auth object');
    return res.status(401).json({ error: 'Unauthorized - No user ID' });
  }

  try {
    const clerkUser = req.auth.user;
    if (!clerkUser) {
      return res
        .status(401)
        .json({ error: 'Unable to retrieve user data from Clerk' });
    }

    // Extract primary email with fallback to clerkUser.email if available
    const primaryEmail =
      (clerkUser.emailAddresses &&
        clerkUser.emailAddresses.find(
          (email) => email.id === clerkUser.primaryEmailAddressId
        )?.emailAddress) ||
      clerkUser.email;
    if (!primaryEmail) {
      return res
        .status(400)
        .json({ error: 'User does not have a primary email address' });
    }

    // Extract full name from Clerk data
    const fullName =
      `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
      null;

    const result = await pool.query(
      'INSERT INTO users (id, email, name) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET email = $2, name = $3 RETURNING *',
      [userId, primaryEmail, fullName]
    );

    console.log('User saved/updated:', result.rows[0]);
    req.user = result.rows[0];
    next();
  } catch (err) {
    console.error('User DB error:', err.stack);
    res.status(500).json({ error: 'Database error saving user' });
  }
}

// Route to get current user info
app.get('/user', ensureUser, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name
  });
});

// Get all todos for the authenticated user
app.get('/todos', ensureUser, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY completed ASC, created_at DESC',
      [req.user.id]
    );
    console.log('Fetched todos:', result.rows);
    res.json(result.rows.map(formatTodoResponse));
  } catch (err) {
    console.error('Failed to fetch todos:', err.stack);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Create a new todo
app.post('/todos', ensureUser, async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  console.log('POST /todos request body:', req.body);
  if (!title)
    return res.status(400).json({ error: 'Title is required' });

  try {
    const result = await pool.query(
      'INSERT INTO todos (user_id, title, description, due_date, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, title, description || '', dueDate || null, completed || false]
    );
    console.log('Todo created:', result.rows[0]);
    res.status(201).json(formatTodoResponse(result.rows[0]));
  } catch (err) {
    console.error('Failed to create todo:', err.stack);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update an existing todo
app.put('/todos/:id', ensureUser, async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;
  console.log('PUT /todos/:id request body:', req.body);

  try {
    const checkResult = await pool.query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    if (checkResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: 'Todo not found or unauthorized' });
    }
    const currentTodo = checkResult.rows[0];
    const updatedTitle = title !== undefined ? title : currentTodo.title;
    const updatedDescription =
      description !== undefined ? description : currentTodo.description;
    const updatedDueDate =
      dueDate !== undefined ? dueDate : currentTodo.due_date;
    const updatedCompleted =
      completed !== undefined ? completed : currentTodo.completed;

    const result = await pool.query(
      'UPDATE todos SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [
        updatedTitle,
        updatedDescription,
        updatedDueDate,
        updatedCompleted,
        id,
        req.user.id
      ]
    );
    console.log('Todo updated:', result.rows[0]);
    res.json(formatTodoResponse(result.rows[0]));
  } catch (err) {
    console.error('Failed to update todo:', err.stack);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/todos/:id', ensureUser, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );
    console.log('Todo deleted:', result.rows[0]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: 'Todo not found or unauthorized' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Failed to delete todo:', err.stack);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await initializeDatabase();
  const isConnected = await verifyDatabaseConnection();
  if (!isConnected) {
    console.error('Initial database connection failed');
  }
});

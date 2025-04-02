import express from 'express';
const router = express.Router();

// Get all tasks for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const result = await req.db.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY completed ASC, created_at DESC',
      [userId]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { title, description, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const result = await req.db.query(
      'INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, description || '', dueDate || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const taskId = req.params.id;
    const { title, description, dueDate, completed } = req.body;
    
    // Make sure the task belongs to the user
    const checkResult = await req.db.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [taskId, userId]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const result = await req.db.query(
      `UPDATE tasks 
       SET title = $1, description = $2, due_date = $3, completed = $4
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [title, description, dueDate || null, completed, taskId, userId]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const taskId = req.params.id;
    
    // First get the current state
    const checkResult = await req.db.query(
      'SELECT completed FROM tasks WHERE id = $1 AND user_id = $2',
      [taskId, userId]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    // Toggle the completed state
    const currentState = checkResult.rows[0].completed;
    
    const result = await req.db.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [!currentState, taskId, userId]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error toggling task completion:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const taskId = req.params.id;
    
    const result = await req.db.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [taskId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted', task: result.rows[0] });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
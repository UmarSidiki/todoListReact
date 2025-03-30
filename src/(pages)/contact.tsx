import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

const Contact = () => {


  const { userId } = useAuth();

  return (
    <>
      <ClerkLoading>
        <div>Clerk is loading</div>
      </ClerkLoading>
      <ClerkLoaded>
        <h2>Loaded</h2>
        <div>User ID: {userId}</div>
      </ClerkLoaded>
      <div>This div is always visible</div>
    </>
  );
};

export default Contact;

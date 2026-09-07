"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const HomeView = () => {
const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <p>Not signed in</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <p>Current user: {session?.user?.name}</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

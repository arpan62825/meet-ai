"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-dvw">
        <p>Not signed in</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");
        },
      },
    });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>Current user: {session?.user?.name}</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

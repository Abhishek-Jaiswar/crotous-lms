'use client'

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  async function signOutHandler() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          toast.success("Logged out successfully.")
        }
      }
    })
  }

  return (
    <div className="text-2xl text-amber-500">
      <ThemeToggle />
      {session ? (
        <div>
          <p>{session.user.name}</p>
          <Button
            onClick={signOutHandler}
          >Logout</Button>
        </div>
      ) : (
        <Button onClick={() => router.push("/sign-in")}>Login</Button>
      )}
    </div>
  );
}

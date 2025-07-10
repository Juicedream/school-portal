"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
// import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  // Placeholder for the login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent automatic redirection
      });

      if (result?.error) {
        setError("Invalid Credentials");
        toast.error("Invalid Credentials");
      } else {
        // If login is successful, you can access the user data
        setSuccess("Login successful!");
        // Redirect logic below
        console.log(result);
        router.push("/dashboard");

        // You can also use the session data to determine the user's role
        // setTimeout(() => {
        //   switch (session?.user.role) {
        //     case "ADMIN":
        //       router.push("/dashboard/admin");
        //       break;
        //     case "TEACHER":
        //       router.push("/dashboard/teacher");
        //       break;
        //     case "STUDENT":
        //       router.push("/dashboard/student");
        //       break;
        //     default:
        //       router.push("/");
        //   }
        // }, 1000); // slight delay so user sees the message
        setTimeout(() => {
          toast.success("Login successful!");
        }, 3000);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const res = await fetch("/api/auth/login", {
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     setError([]);
  //     setSuccess("Login successful!");
  //     // setIsLoading(false);
  //     // redirect logic below
  //     setTimeout(() => {
  //       switch (data.role) {
  //         case "ADMIN":
  //           router.push("/dashboard/admin");
  //           break;
  //           case "TEACHER":
  //             router.push("/dashboard/teacher");
  //             break;
  //             case "STUDENT":
  //               router.push("/dashboard/student");
  //               break;
  //             }
  //           }, 1000); // slight delay so user sees the message
  //           setTimeout(() => {
  //             toast.success("Login successful!");
  //           }, 3000)
  //   } else {
  //     setIsLoading(false);
  //     toast.error("Login failed. Please try again.");
  //     setError(Array.isArray(data.error) ? data.error : [data.error]);
  //     // alert(data.error);
  //   }
  // };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        {/* {success && (
          <Alert
            variant="default"
            className="bg-green-100 border-green-500 text-green-800"
          >
            <AlertCircleIcon className="text-green-700" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )} */}

        <CardHeader className="text-center">
          <CardTitle className="text-xl">School Portal Login</CardTitle>
          <CardDescription>Kindly Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="*********"
                  />
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

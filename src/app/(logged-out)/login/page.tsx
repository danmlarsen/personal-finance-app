import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="justify-center gap-2">
        <span>Need to create an account?</span>
        <Link href="/signup" className="text-grey-900 font-bold underline">
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}

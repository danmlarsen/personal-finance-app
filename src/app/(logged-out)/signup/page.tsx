import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        Already have an account? <Link href="/login">Login</Link>
      </CardFooter>
    </Card>
  );
}

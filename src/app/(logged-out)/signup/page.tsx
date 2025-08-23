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
      <CardFooter className="justify-center gap-2">
        <span>Already have an account?</span>
        <Link href="/login" className="text-grey-900 font-bold underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}

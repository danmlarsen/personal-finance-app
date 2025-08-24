import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import z from "zod";
import { authConfig } from "./auth.config";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const DUMMY_HASH =
  "$2b$12$wtnECMo1eIx0OflRDunSNeN6zOFiM3Zzz0UkNYV7bjMePzKYYw8pa";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(rawCredentials) {
        const validation = credentialsSchema.safeParse(rawCredentials);
        if (!validation.success) return null;

        const { email, password } = validation.data;

        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        if (!user) {
          await compare(password, DUMMY_HASH);
          return null;
        }

        const passwordCorrect = await compare(password, user.password);
        if (!passwordCorrect) return null;

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],
});

import { connectDB } from "@/libs/connectDB";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";

export const authOptions = {
    providers: [
        CredentialsProvider(
            {
                name: "credentials",
                credentials: {},
                async authorize(credentials) {
                    const { email, password } = credentials;
                    try {
                        await connectDB();
                        const user = await User.findOne({ email });
                        if(!user) {
                            return null;
                        }
                        // const passwordMatch = await bcrypt.compare(password, user.password);
                        // if(!passwordMatch) {
                        //     return null;
                        // }
                        if(password != user.password) {
                            return null;
                        }
                        return user;
                    } catch (error) {
                        console.log("Error", error);
                    }
                }
            }
        )
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if(user) {
                token.role = user.role;
            }
            if(trigger === 'update' && session?.name) {
                token.name = session.name;
            }
            return token
        },
        async session({ session, token }) {
            session.user.role = token.role
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    page: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

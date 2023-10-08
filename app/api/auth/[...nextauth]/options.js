import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import { getToken } from "next-auth/jwt";
async function refreshToken(token) {
    const url = new URL(`${env.NEXT_REFRESH_TOKEN_API}/v1/token?key=${env.NEXT_PUBLIC_FIREBASE_API_KEY}`)
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "grant_type": "refresh_token",
            "refresh_token": token.refreshToken,
        })
    });
    console.log("------------------REFRESHED TOKEN FROM AUTHOPTIONS----------------");
    const response = await res.json();
    const newExpireTime = new Date().getTime() + 2990000;
    return {
        ...token,
        accessToken: response.id_token,
        refreshToken: response.refresh_token,
        expireIn: newExpireTime,
    };
}

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Email'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials')
                }

                try {
                    const response = await signInWithEmailAndPassword(auth, credentials?.email, credentials?.password)
                    const accessToken = await response.user.getIdToken((token) => { return token })
                    if (response?.user?.emailVerified && accessToken) {
                        const user = {
                            exp: response?.user?.toJSON().stsTokenManager.expirationTime,
                            refreshToken: response.user.refreshToken,
                            accessToken,
                            email: response?.user?.email,
                            image: response?.user?.photoURL,
                            name: response?.user?.displayName,
                            emailVerified: response?.user?.emailVerified,
                            id: response?.user?.uid
                        }
                        return user;
                    } else {
                        throw new Error(`Please verify your email!`)
                    }
                } catch (err) {
                    if (err.code === "auth/network-request-failed") {
                        throw new Error(`Error: Invalid credentials!`)
                    } else if (err.code) {
                        throw new Error(`Error: ${err.code}`)
                    } else {
                        throw new Error(`${err}`)
                    }
                }

            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        jwt: async ({ user, token }) => {
            console.log("--------------------JWT RUNNING AUTHOPTION----------------")
            if (user) {
                token.uid = user.id;
                token.expireIn = user.exp;
                token.refreshToken = user.refreshToken;
                token.accessToken = user.accessToken;
                token.emailVerified = user.emailVerified;
                user.emailVerified = user.emailVerified;
                user.id = user.id;
                return token
            }
            if (new Date().getTime() < token.expireIn) return token;

            return await refreshToken(token);
        },
        session: async ({ session, token }) => {
            console.log("--------------------SESSION RUNNING AUTHOPTION----------------")
            if (session?.user && token) {
                session.user.id = token?.uid;
                session.user.emailVerified = token?.emailVerified;
                session.accessToken = token?.accessToken;
                session.refreshToken = token?.refreshToken;
                session.expireIn = token?.expireIn;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60,
    },
    jwt: {
        maxAge: 60 * 60,
    },
    secret: env.NEXTAUTH_SECRET
}
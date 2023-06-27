import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // This is were you can put your own external API call to validate Email and Password
      authorize: async (credentials) => {
        console.log(credentials);
        if (
          credentials.email === "admin@example.com" &&
          credentials.password === "123"
        ) {
          return { id: 11, name: "Auth Demo", email: "admin@example.com" };
        }

        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "dark",
  },
  pages: {
    signIn: "/login",
    //    signOut: '/signout',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(credentials);
      return true;
    },

    async jwt({ token }) {
      token.userRole = "regusr";
      return token;
    },
  },
});

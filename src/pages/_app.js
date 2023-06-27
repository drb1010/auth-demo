import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { signIn, getSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardLayout from "./component/layout";
import { useEffect, useState } from "react";
import Login from "./login";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setIsLoggedIn(true);
      } else if (session === null || session === false) {
        <h1>Loading .....</h1>;
      } else {
        router.push("/login");
      }
    })();
  }, [isLoggedIn]);
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      {isLoggedIn ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Login />
      )}
    </SessionProvider>
  );
}

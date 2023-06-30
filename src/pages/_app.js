import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { signIn, getSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardLayout from "./component/layout";
import { useEffect, useState } from "react";
import Login from "./login";
import { Spin } from "antd";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setIsLoggedIn(true);
      } else if (session === false) {
        <Spin />;
      } else {
       // router.push("/login");
      }
    })();
  }, []);
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

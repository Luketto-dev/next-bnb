import Layout from "../components/layouts/Layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps, session }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;

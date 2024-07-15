import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

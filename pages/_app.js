import { useEffect } from "react";
import { appWithTranslation } from 'next-i18next';
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/container/Home/Contact";
import { useRouter } from "next/router";
import { ProductProvider } from "@/components/context/ProductContext";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  NProgress.configure({
    minimum: 0.08,
    showSpinner: false,
    color: "#000",
  });

  return (
    <>
      <ProductProvider>
        <Header />
        <Component {...pageProps} />
        <Contact />
        <Footer />
      </ProductProvider>
    </>
  );
}

export default appWithTranslation(App);
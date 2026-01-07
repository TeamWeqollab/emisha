import "bootstrap/dist/css/bootstrap.min.css";
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";


import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-body",
});



export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "pageview",
          page: url,
        });
      }
    };

    // Track initial page load
    handleRouteChange(router.asPath);

    // Track route changes
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // return <Component {...pageProps} />;
  return (
    <main className={outfit.variable}>
      <Component {...pageProps} />
    </main>
  );
}

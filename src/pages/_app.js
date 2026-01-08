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


import NextNProgress from "nextjs-progressbar";


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
      <NextNProgress
        color='linear-gradient(to right, #FBB32B 0%, #E54D8B 27%, #AE3D8F 53%, #5452A2 77%, #1364AB 100%)' /*color="#FF671F"*/
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </main>
  );
}

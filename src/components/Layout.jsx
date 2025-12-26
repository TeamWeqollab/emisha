import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import BootstrapClient from "./BootstrapClient.jsx";
import ContactModal from "./ContactModal.jsx";

export default function Layout({ 
  children, 
  pageTitle,
  metaTitle,
  metaDescription,
  metaKeywords,
  socialTitle,
  socialDescription,
  socialImage,
  socialUrl 
}) {
  const router = useRouter();
  const baseUrl = process.env.SOCIAL_CARD_URL || "https://emisha.com"; 
  
  // Default metadata (fallback values)
  const defaults = {
    pageTitle: "Emisha",
    metaTitle: "Future-proofing businesses with intelligent data solutions.",
    metaDescription: "Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution.",
    metaKeywords: "Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting",
    socialTitle: "Future-proofing businesses with intelligent data solutions.",
    socialDescription: "Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution.",
    socialImage: "/images/Emisha-Social-card.png",
    socialUrl: ""
  }; 

  // Use provided values or fall back to defaults
  const title = pageTitle || defaults.pageTitle;
  const metaTitleFinal = metaTitle || defaults.metaTitle;
  const metaDescriptionFinal = metaDescription || defaults.metaDescription;
  const metaKeywordsFinal = metaKeywords || defaults.metaKeywords;
  const ogTitle = socialTitle || defaults.socialTitle;
  const ogDescription = socialDescription || defaults.socialDescription;
  const ogImage = socialImage || defaults.socialImage;
  const ogUrl = socialUrl || router.asPath || defaults.socialUrl;

  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const fullUrl = ogUrl.startsWith('http') ? ogUrl : `${baseUrl}${ogUrl}`;
  const secureImageUrl = fullImageUrl.replace(/^http:/, 'https:');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      
        <link rel="icon" href="/favicon.png" />

        <meta name="title" content={metaTitleFinal} />
        <meta name="description" content={metaDescriptionFinal} />
        <meta name="keywords" content={metaKeywordsFinal} />

        {/* <!-- Facebook and Linkedin--> */}
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:image:secure_url" content={secureImageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@emisha" />
        <meta property="twitter:url" content={fullUrl} />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={fullImageUrl} />
        <meta name="twitter:image:src" content={fullImageUrl} />

      </Head>

      <Header />
      <main className="page-content">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <ContactModal />
      <BootstrapClient />
    </>
  );
}

import Layout from "@/components/Layout.jsx";
import Link from "next/link";
import InnerBanner from "@/components/InnerBanner.jsx";


export default function Custom404() {
  return (
    <Layout
      pageTitle="Emisha Interactive - Custom & Enterprise Software Development Solutions"
      metaTitle="Emisha Interactive - Custom & Enterprise Software Development Solutions"
      metaDescription="Emisha Interactive builds scalable, secure, and intelligent enterprise software. We specialize in custom software development, system integration, and digital transformation for businesses that demand performance and precision."
      metaKeywords="enterprise software development, custom software development, business software, enterprise applications, digital transformation, technology partner, enterprise solutions, software engineering, IT consulting"
      socialTitle="Emisha Interactive - Custom & Enterprise Software Development Solutions"
      socialDescription="Emisha Interactive builds scalable, secure, and intelligent enterprise software. We specialize in custom software development, system integration, and digital transformation for businesses that demand performance and precision."
      socialImage="/images/Emisha-Social-card.png"
      socialUrl="/404"
    >

      {/* banner inner Section */}
      <InnerBanner
        imageSrc="/images/banner-notFound.jpg"
        imageAlt="404"
      //title="404 - not found"
      />


      <section className="sectionWrapper" style={{ minHeight: '450px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="sectionHeading">404 - Page Not Found</h2>
              <p className="sectionLead">Sorry, the page you&apos;re looking for could not be found. It may have been moved, deleted, or the URL might be incorrect.</p>
              <p>Please return to the <Link href='/'>HOME PAGE</Link> or use the navigation menu to find what you&apos;re looking for.</p>
            </div>
          </div>
        </div>
      </section>


    </Layout>
  );
}

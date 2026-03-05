import Layout from "../components/Layout.jsx";
import Image from "next/image";
import InnerBanner from "@/components/InnerBanner.jsx";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <Layout
      pageTitle="Emisha"
      metaTitle="Future-proofing businesses with intelligent data solutions."
      metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
      socialTitle="Future-proofing businesses with intelligent data solutions."
      socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      socialImage="/images/Emisha-Social-card.png"
      socialUrl="/privacy-policy"
    >

      {/* Banner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-privacy.jpg"
        imageAlt="Privacy Policy"
        title="Privacy Policy"
      /> */}


      <div className="bg-terms">

      <div className="innerBanner2">
        <div className="d-none d-md-block text-center">
          <Image src="/images/banner-news.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="d-md-none text-center">
          <Image src="/images/banner-news-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xl-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">Privacy Policy</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Privacy Policy Content */}
      <section className="sectionWrapper pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="privacy-content">
                <p className="text-muted mb-4">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <div className="mb-5">
                  <h2 className="h4 mb-3">1. Introduction</h2>
                  <p>
                    Emisha Interactive (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you visit our website or use our services.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">2. Information We Collect</h2>

                  <h3 className="h5 mb-3">2.1 Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us, including:</p>
                  <ul>
                    <li>Name and contact information (email address, phone number, mailing address)</li>
                    <li>Company information and job title</li>
                    <li>Communication preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>

                  <h3 className="h5 mb-3">2.2 Automatically Collected Information</h3>
                  <p>We may automatically collect certain information about your device and usage, including:</p>
                  <ul>
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website information</li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">3. How We Use Your Information</h2>
                  <p>We use the information we collect for various purposes, including:</p>
                  <ul>
                    <li>Providing and improving our services</li>
                    <li>Communicating with you about our services</li>
                    <li>Responding to your inquiries and requests</li>
                    <li>Analyzing website usage and trends</li>
                    <li>Complying with legal obligations</li>
                    <li>Protecting our rights and interests</li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">4. Information Sharing and Disclosure</h2>
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                  <ul>
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and interests</li>
                    <li>With trusted service providers who assist us in operating our website</li>
                    <li>In connection with a business transfer or acquisition</li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">5. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                    over the internet or electronic storage is 100% secure.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">6. Cookies and Tracking Technologies</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our website.
                    For detailed information about our use of cookies, please refer to our
                    <Link href="/cookie-policy" className="text-decoration-none"> Cookie Policy</Link>.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">7. Your Rights</h2>
                  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                  <ul>
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate information</li>
                    <li>The right to delete your personal information</li>
                    <li>The right to restrict processing of your information</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing</li>
                  </ul>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">8. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy
                    practices or content of these external sites. We encourage you to review the privacy policies
                    of any third-party sites you visit.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">9. Children&apos;s Privacy</h2>
                  <p>
                    Our services are not directed to children under 13 years of age. We do not knowingly collect
                    personal information from children under 13. If you are a parent or guardian and believe your
                    child has provided us with personal information, please contact us.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">10. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by
                    posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. Your continued
                    use of our services after any modifications constitutes acceptance of the updated Privacy Policy.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h4 mb-3">11. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                  </p>
                  <div className="contact-info">
                    <p><strong>Emisha Interactive</strong></p>
                    <p>Email: <a href="mailto:career@emisha.com" className="text-decoration-none">career@emisha.com</a></p>
                    {/* <p>Phone: <a href="tel:+1234567890" className="text-decoration-none">+1 (234) 567-890</a></p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      </div>
      
    </Layout>
  );
}

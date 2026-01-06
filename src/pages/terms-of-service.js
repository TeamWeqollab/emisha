import Layout from "../components/Layout.jsx";
import Image from "next/image";
import InnerBanner from "@/components/InnerBanner.jsx";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <Layout
      pageTitle="Emisha"
      metaTitle="Future-proofing businesses with intelligent data solutions."
      metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
      socialTitle="Future-proofing businesses with intelligent data solutions."
      socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      socialImage="/images/Emisha-Social-card.png"
      socialUrl="/terms-of-service"
    >

      {/* Banner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-terms.jpg"
        imageAlt="Terms of Service"
        title="Terms of Service"
      /> */}

      <div className="bg-terms">

      <div className="innerBanner2">
        <div className="d-none d-md-block">
          <Image src="/images/banner-news.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="d-md-none">
          <Image src="/images/banner-news-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xl-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">Terms of Service</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Terms of Service Content */}
      <section className="sectionWrapper pb-0">
        <div className="container">
          <div className="col-lg-8 mx-auto">
            <div className="terms-content">
              <p className="text-muted mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="mb-5">
                <h2 className="h4 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Emisha Interactive website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">2. Description of Service</h2>
                <p>
                  Emisha Interactive provides enterprise intelligence solutions, custom software development, and technology consulting services. Our services include but are not limited to:
                </p>
                <ul>
                  <li>Custom enterprise application development</li>
                  <li>Business intelligence and data analytics solutions</li>
                  <li>Microsoft technology consulting and implementation</li>
                  <li>Cloud infrastructure and migration services</li>
                  <li>System integration and modernization</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">3. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on Emisha Interactive&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">4. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">5. Prohibited Uses</h2>
                <p>You may not use our service:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">6. Intellectual Property Rights</h2>
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive property of Emisha Interactive and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">7. Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices. By using our service, you agree to the collection and use of information in accordance with our
                  <Link href="/privacy-policy" className="text-decoration-none"> Privacy Policy</Link>.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">8. Service Availability</h2>
                <p>
                  We strive to provide continuous service availability, but we do not guarantee that our service will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to our service, resulting in interruptions, delays, or errors.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">9. Limitation of Liability</h2>
                <p>
                  In no event shall Emisha Interactive, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">10. Disclaimer</h2>
                <p>
                  The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, Emisha Interactive excludes all representations, warranties, conditions and terms relating to our website and the use of this website.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">11. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Emisha Interactive and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&apos;s fees).
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">12. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">13. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which Emisha Interactive operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">14. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">15. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us:
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
      </section>
      

      </div>

    </Layout>
  );
}

import Layout from "../components/Layout.jsx";
import Image from "next/image";

import InnerBanner from "@/components/InnerBanner.jsx";

export default function CookiePolicy() {
  return (
    <Layout
      pageTitle="Emisha"
      metaTitle="Future-proofing businesses with intelligent data solutions."
      metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
      socialTitle="Future-proofing businesses with intelligent data solutions."
      socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      socialImage="/images/Emisha-Social-card.png"
      socialUrl="/cookie-policy"
    >

      {/* Banner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-cookies.jpg"
        imageAlt="Cookie Policy"
        title="Cookie Policy"
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
                <h2 className="banner-title">Cookie Settings</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Cookie Policy Content */}
      <section className="sectionWrapper pb-0">
        <div className="container">
          <div className="col-lg-8 mx-auto">
            <div className="cookie-content">
              <p className="text-muted mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <div className="mb-5">
                <h2 className="h4 mb-3">1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                  They are widely used to make websites work more efficiently and to provide information to website owners.
                </p>
                <p>
                  Cookies allow a website to recognize a user&apos;s device and remember information about their visit, such as
                  their preferred language and other settings. This can make your next visit easier and the site more useful to you.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">2. How We Use Cookies</h2>
                <p>Emisha Interactive uses cookies for several purposes:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website</li>
                  <li><strong>Functional Cookies:</strong> These enable enhanced functionality and personalization</li>
                  <li><strong>Marketing Cookies:</strong> These are used to track visitors across websites for advertising purposes</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">3. Types of Cookies We Use</h2>

                <div className="mb-4">
                  <h3 className="h5 mb-3">3.1 Strictly Necessary Cookies</h3>
                  <p>
                    These cookies are essential for you to browse the website and use its features. Without these cookies,
                    services you have asked for cannot be provided. These cookies do not store any personally identifiable information.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Cookie Name</th>
                          <th>Purpose</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>session_id</td>
                          <td>Maintains user session</td>
                          <td>Session</td>
                        </tr>
                        <tr>
                          <td>csrf_token</td>
                          <td>Security protection</td>
                          <td>Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="h5 mb-3">3.2 Analytics Cookies</h3>
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously. This helps us improve our website&apos;s performance and user experience.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Cookie Name</th>
                          <th>Purpose</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>_ga</td>
                          <td>Google Analytics - distinguishes users</td>
                          <td>2 years</td>
                        </tr>
                        <tr>
                          <td>_gid</td>
                          <td>Google Analytics - distinguishes users</td>
                          <td>24 hours</td>
                        </tr>
                        <tr>
                          <td>_gat</td>
                          <td>Google Analytics - throttles request rate</td>
                          <td>1 minute</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="h5 mb-3">3.3 Functional Cookies</h3>
                  <p>
                    These cookies enable the website to provide enhanced functionality and personalization.
                    They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Cookie Name</th>
                          <th>Purpose</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>user_preferences</td>
                          <td>Stores user preferences</td>
                          <td>1 year</td>
                        </tr>
                        <tr>
                          <td>language</td>
                          <td>Remembers language selection</td>
                          <td>1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="h5 mb-3">3.4 Marketing Cookies</h3>
                  <p>
                    These cookies are used to track visitors across websites. The intention is to display ads that
                    are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Cookie Name</th>
                          <th>Purpose</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>_fbp</td>
                          <td>Facebook Pixel - tracks conversions</td>
                          <td>3 months</td>
                        </tr>
                        <tr>
                          <td>ads_preferences</td>
                          <td>Stores ad preferences</td>
                          <td>1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">4. Third-Party Cookies</h2>
                <p>
                  Some cookies on our website are set by third-party services. We have no control over these cookies.
                  These third parties may include:
                </p>
                <ul>
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Google Maps:</strong> For interactive maps and location services</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and integration features</li>
                  <li><strong>Advertising Networks:</strong> For targeted advertising and remarketing</li>
                </ul>
                <p>
                  We recommend that you check the respective privacy policies of these third parties for more information about their cookies.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">5. Managing Your Cookie Preferences</h2>

                <h3 className="h5 mb-3">5.1 Browser Settings</h3>
                <p>You can control and manage cookies through your browser settings. Most browsers allow you to:</p>
                <ul>
                  <li>View what cookies are stored on your device</li>
                  <li>Delete cookies individually or all at once</li>
                  <li>Block cookies from specific websites</li>
                  <li>Block third-party cookies</li>
                  <li>Clear all cookies when you close your browser</li>
                </ul>

                <h3 className="h5 mb-3">5.2 Browser-Specific Instructions</h3>
                <div className="row">
                  <div className="col-md-6">
                    <h6>Chrome</h6>
                    <p>Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Firefox</h6>
                    <p>Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Safari</h6>
                    <p>Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Edge</h6>
                    <p>Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>

                <h3 className="h5 mb-3">5.3 Cookie Consent</h3>
                <p>
                  When you first visit our website, you will see a cookie consent banner. You can choose to accept or decline
                  non-essential cookies. You can change your preferences at any time by clicking the &quot;Cookie Settings&quot; link
                  in our website footer.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">6. Impact of Disabling Cookies</h2>
                <p>
                  If you choose to disable cookies, some features of our website may not function properly. This may include:
                </p>
                <ul>
                  <li>Inability to remember your preferences</li>
                  <li>Reduced website functionality</li>
                  <li>Loss of personalized content</li>
                  <li>Difficulty accessing certain features</li>
                </ul>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">7. Updates to This Cookie Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. We will notify you of any material changes by posting the
                  updated policy on our website.
                </p>
              </div>

              <div className="mb-5">
                <h2 className="h4 mb-3">8. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

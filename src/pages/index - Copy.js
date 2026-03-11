// import Head from "next/head";
import Layout from "@/components/Layout.jsx";
import Image from "next/image";
import Link from "next/link";
import Partners from "@/components/Partners.jsx";

import LatestInsights from "@/components/LatestInsights.jsx";
import ClientSuccessCarousel from "@/components/ClientSuccessCarousel.jsx";
import LeadInfo from "@/components/LeadInfo.jsx";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';







export default function Home() {
  return (
    <>
      
      <Layout
        pageTitle="Emisha"
        metaTitle="Future-proofing businesses with intelligent data solutions."
        metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
        metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
        socialTitle="Future-proofing businesses with intelligent data solutions."
        socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
        socialImage="/images/Emisha-Social-card.png"
        socialUrl="/"
      >

        

      <section className="sectionWrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <Image src="/images/banner-video.png" alt="Emisha" width={1920} height={1055} className="img-fluid" />
            </div>
          </div>

          <div className="row justify-content-center align-items-center">
            <div className="col-md-3 col-lg-2">
              <Image src="/images/logo-footer.svg" alt="Emisha" width={206} height={120} className="img-fluid p-4" />
            </div>
            <div className="col-md-9 col-lg-6">
              <p className="banner-leadInfo">Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution.</p>
            </div>
          </div>
        </div>
      </section>



       <section className="sectionWrapper pt-0 pt-lg-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-3">
              <h2 className="hd-ourServices">OUR SERVICES</h2>
              <p>Optimizing data quality, governance, and strategy.</p>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card commonCard h-100">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services1.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Data Trust & Transformation Services</h5>
                  <p className="card-text">Turning data into a unified, strategic asset through governance, integration, and quality.</p>
                  <Link href="/services/data-trust-transformation-services" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
           <div className="col-md-6 col-lg-4">
              <div className="card commonCard h-100">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services2.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Foundation<br />Services</h5>
                  <p className="card-text">Building a strong data foundation with strategy, analysis, and management solutions.</p>
                  <Link href="/services/foundation-services" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col-md-6 col-lg-4">
              <div className="card commonCard h-100">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services3.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Data and <br />Cyber Security</h5>
                  <p className="card-text">Seamless implementation and continuous optimization of data solutions.</p>
                  <Link href="/services/data-and-cyber-security" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
           <div className="col-md-6 col-lg-4">
              <div className="card commonCard lastCommonCard h-100">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services4.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Cloud and <br />Data Engineering</h5>
                  <p className="card-text">Seamless design and continuous optimization of cloud-based data platforms.</p>
                  <Link href="/services/cloud-and-data-engineering" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* partners Section */}
      <Partners />



       {/* Latest News section */}
       <div className="container">
          <div className="latestNews homeLatestNews">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="newsHeading">Get The Latest From Emisha</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card latestNewsCard">
                  <div className="imageContainer-latestNews position-relative">
                    <Image src="/images/img-news-1.jpg" alt="Emisha" width={480} height={360} className="img-fluid" />
                    <div className="news-btn">
                      <span className="cardIcon">
                        <span className="arrow"></span>
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Emisha Expands with New Partnerships</h5>
                    <p className="card-date">Company Updates   -    March 2025</p>
                    <p className="card-text">Strengthening our global network to enhance data solutions and drive innovation.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card latestNewsCard">
                  <div className="imageContainer-latestNews position-relative">
                    <Image src="/images/img-news-2.jpg" alt="Emisha" width={480} height={360} className="img-fluid" />
                    <div className="news-btn">
                      <span className="cardIcon">
                        <span className="arrow"></span>
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">AI-Powered Data Management</h5>
                    <p className="card-date">Innovation   -    February 2025</p>
                    <p className="card-text">Integrating AI and machine learning for smarter data governance and analytics.</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card latestNewsCard">
                  <div className="imageContainer-latestNews position-relative">
                    <Image src="/images/img-news-3.jpg" alt="Emisha" width={480} height={360} className="img-fluid" />
                    <div className="news-btn">
                      <span className="cardIcon">
                        <span className="arrow"></span>
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Seamless SAP MDG Migrations</h5>
                    <p className="card-date">Enterprise   -    January 2025</p>
                    <p className="card-text">Helping businesses transition from SAP MDM to MDG efficiently and risk-free.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

       </div>
        



        {/* Latest Insights Carousel*/}
        {/* <LatestInsights /> */}


      </Layout>
    </>
  );
}


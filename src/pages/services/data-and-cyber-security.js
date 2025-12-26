import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";
import Partners from "@/components/Partners.jsx";


export default function DataCyberSecurity() {
  const partnershipCarouselRef = useRef(null);

  return (
    <Layout
       pageTitle="Emisha"
        metaTitle="Future-proofing businesses with intelligent data solutions."
        metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
        metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
        socialTitle="Future-proofing businesses with intelligent data solutions."
        socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
        socialImage="/images/Emisha-Social-card.png"
        socialUrl="/services"
    >

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

        <div className="innerBanner">
          <div>
            <Image src="/images/banner-dataCyberSecurity.png" alt="Emisha" layout="fill" className="img-fluid" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="banner-details">
                  <h2 className="banner-title">Enterprise Data Protection &  <br />Cyber Assurance</h2>
                  <p className="banner-desc">We provide board-level assurance with targeted, measurable security programmes, combining strategic assessment, fast incident response and robust operational controls to protect assets, ensure continuity and reduce risk.</p>
                  <Link href='#' className="btn btn-primary">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>




        <section className="sectionWrapper">
          <div className="container">
            
            <div className="row align-items-center justify-content-between mt-5">
              <div className="col-md-6">
                <Image src="/images/img-CybersecurityAssessment.png" alt="Emisha" width={446} height={565} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Cybersecurity Assessment & Awareness</h3>
                <h4 className="tag-title">Assess. Educate. Defend</h4>
                <p className="tag-desc">With our Cybersecurity Assessment & Awareness empower your teams and technology to stay one step ahead of cyber threats.</p>
              </div>
            </div>

            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Digital Forensics & Incident Response (DFIR) </h3>
                <h4 className="tag-title">Detect faster. Respond smarter. Recover stronger</h4>
                <p className="tag-desc">We deliver forensic insights and rapid incident response to minimise impact and strengthen future resilience.</p>
              </div>
                <div className="col-md-6">
                <Image src="/images/img-DigitalForensics.png" alt="Emisha" width={561} height={507} className="img-fluid" />
              </div>
            </div>

            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-6">
                <Image src="/images/img-RansomwareResilience.png" alt="Emisha" width={557} height={504} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Ransomware Resilience</h3>
                <h4 className="tag-title">Stop ransomware before it stops your business</h4>
                <p className="tag-desc">Harden defenses, protect critical data, and ensure business continuity against ransomware threats —so an attack never becomes a crisis.</p>
              </div>
            </div>


            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Data Sanitisation</h3>
                <h4 className="tag-title">Retire systems. Dispose assets. Transfer ownership—without leaving data behind</h4>
                <p className="tag-desc">Certified data sanitisation services that protect privacy, ensure compliance, and eliminate residual data risk.</p>
              </div>
                <div className="col-md-6">
                <Image src="/images/img-DataSanitisation.png" alt="Emisha" width={516} height={468} className="img-fluid" />
              </div>
            </div>


             <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-6">
                <Image src="/images/img-DataLossPrevention.png" alt="Emisha" width={479} height={433} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Data Loss Prevention (DLP)</h3>
                <h4 className="tag-title">Keep your data where it belongs</h4>
                <p className="tag-desc">End-to-end DLP strategy, tooling, and governance to safeguard sensitive data and meet regulatory obligations.</p>
              </div>
            </div>

            {/* <div className="commonCard2" style={{backgroundColor:'#fdfdfd'}}>
              <div className="card-body">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-5">
                      <h3 className="tag-Cat gradientText">Data Sanitisation </h3>
                      <h4 className="tag-title">Retire systems. Dispose assets. Transfer ownership—without leaving data behind</h4>
                      <p className="tag-desc">Certified data sanitisation services that protect privacy, ensure compliance, and eliminate residual data risk.</p>
                    </div>
                    <div className="col-md-6">
                      <Image src="/images/img-deploymentModel.png" alt="Emisha" width={704} height={662} className="img-fluid" />
                    </div>
                  </div>
              </div>
            </div> */}

          </div>
        </section>


        {/* partners Section */}
        <Partners />




    </Layout>
  );
}

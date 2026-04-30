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

      <div className="bg-service">

        <div className="innerBanner">
          <div className="d-none d-lg-block text-center">
            {/* <Image src="/images/banner-dataCyberSecurity.png" alt="Emisha" layout="fill" className="img-fluid" /> */}
            <div className="deskBanner">
              <Image src="/images/banner-dataCyberSecurity.png" alt="Emisha" layout="contain" width={1920} height={824} className="img-fluid" />
            </div>
          </div>
          <div className="d-lg-none text-center">
            <Image src="/images/banner-dataCyberSecurity-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-7 col-xl-7">
                <div className="banner-details">
                  <h2 className="banner-title">Enterprise Data Protection &  <br className="d-none d-xl-block" />Cyber Assurance</h2>
                  <p className="banner-desc">We provide board-level assurance with targeted, measurable security programmes, combining strategic assessment, fast incident response and robust operational controls to protect assets, ensure continuity and reduce risk.</p>
                  <Link href='/contact' className="btn btn-primary" aria-label="Get started by contacting us">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className="sectionWrapper">
          <div className="container">

            <div className="row align-items-center justify-content-between mt-0 mt-xl-5">
              <div className="col-md-6">
                <Image src="/images/img-CybersecurityAssessment.png" alt="Emisha" width={446} height={565} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat"><span className="gradientText">Cybersecurity Assessment & Awareness</span></h3>
                <p className="tag-title">Assess. Educate. Defend</p>
                <p className="tag-desc">With our Cybersecurity Assessment & Awareness empower your teams and technology to stay one step ahead of cyber threats.</p>
              </div>
            </div>

            <div className="row align-items-center justify-content-between mt-5 mt-lg-0 mb-5">
              <div className="col-md-5 col-lg-5 order-1 order-md-0">
                <h3 className="tag-Cat"><span className="gradientText">Digital Forensics & Incident Response (DFIR)</span></h3>
                <p className="tag-title">Detect faster. Respond smarter. Recover stronger</p>
                <p className="tag-desc">We deliver forensic insights and rapid incident response to minimise impact and strengthen future resilience.</p>
              </div>
              <div className="col-md-6 col-lg-6 order-0 order-md-1">
                <Image src="/images/img-DigitalForensics.png" alt="Emisha" width={561} height={507} className="img-fluid" />
              </div>
            </div>

            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-6">
                <Image src="/images/img-RansomwareResilience.png" alt="Emisha" width={557} height={504} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat"><span className="gradientText">Ransomware Resilience</span></h3>
                <p className="tag-title">Stop ransomware before it stops your business</p>
                <p className="tag-desc">Harden defenses, protect critical data, and ensure business continuity against ransomware threats —so an attack never becomes a crisis.</p>
              </div>
            </div>


            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-5 col-lg-5 order-1 order-md-0">
                <h3 className="tag-Cat"><span className="gradientText">Data Sanitisation</span></h3>
                <p className="tag-title">Retire systems. Dispose assets. Transfer ownership—without leaving data behind</p>
                <p className="tag-desc">Certified data sanitisation services that protect privacy, ensure compliance, and eliminate residual data risk.</p>
              </div>
              <div className="col-md-6 col-lg-6 order-0 order-md-1">
                <Image src="/images/img-DataSanitisation.png" alt="Emisha" width={516} height={468} className="img-fluid" />
              </div>
            </div>


            <div className="row align-items-center justify-content-between mb-0 mb-lg-5">
              <div className="col-md-6">
                <Image src="/images/img-DataLossPrevention.png" alt="Emisha" width={479} height={433} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat"><span className="gradientText">Data Loss Prevention (DLP)</span></h3>
                <p className="tag-title">Keep your data where it belongs</p>
                <p className="tag-desc">End-to-end DLP strategy, tooling, and governance to safeguard sensitive data and meet regulatory obligations.</p>
              </div>
            </div>

            {/* <div className="commonCard2" style={{backgroundColor:'#fdfdfd'}}>
              <div className="card-body">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-5">
                      <h3 className="tag-Cat gradientText">Data Sanitisation </h3>
                      <p className="tag-title">Retire systems. Dispose assets. Transfer ownership—without leaving data behind</p>
                      <p className="tag-desc">Certified data sanitisation services that protect privacy, ensure compliance, and eliminate residual data risk.</p>
                    </div>
                    <div className="col-md-6">
                      <Image src="/images/img-deploymentModel.png" alt="Emisha" width={704} height={662} className="img-fluid" />
                    </div>
                  </div>
              </div>
            </div> */}

          </div>
        </div>


        {/* partners Section */}
        <Partners />


      </div>


    </Layout>
  );
}

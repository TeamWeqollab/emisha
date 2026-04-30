import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';
import InnerBanner from "@/components/InnerBanner.jsx";
import Partners from "@/components/Partners.jsx";

export default function FoundationServices() {
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
            {/* <Image src="/images/banner-services.png" alt="Emisha" layout="fill" className="img-fluid" /> */}
            <div className="deskBanner">
              <Image src="/images/banner-services.png" alt="Emisha" layout="contain" width={1920} height={824} className="img-fluid" />
            </div>
          </div>
          <div className="d-lg-none text-center">
            <Image src="/images/banner-services-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
          </div>
          
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-7 col-xl-7">
                <div className="banner-details">
                  <h2 className="banner-title">Build a Solid Data Foundation. <br />Unlock Enterprise Growth.</h2>
                  <p className="banner-desc">For organizations seeking direction and clarity on the data maturity roadmap, our Foundation Services offer structured guidance across the complex landscape of technologies, methodologies, planning, implementation, and deployment strategies</p>
                  <Link href='/contact' className="btn btn-primary" aria-label="Get started by contacting us">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="sectionWrapper">
          <div className="container">
            
            <div className="commonCard2 bxFoundation" style={{background:'#fdfdfd'}}>
              <div className="card-body">
                   <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                      <Image src="/images/img-DataQuality.png" alt="Emisha" width={593} height={518} className="img-fluid" />
                    </div>
                    <div className="col-md-5">
                      <h3 className="tag-Cat gradientText">Data Quality Assessment</h3>
                      <p className="tag-title">Decisions You Can Trust. Data You Can Rely On</p>
                      <p className="tag-desc">Identify gaps, measure data integrity, and establish a foundation for trusted insights.</p>
                    </div>
                  </div>
                   <div className="row align-items-center justify-content-center mt-5 mt-md-0">
                    <div className="col-md-5 order-1 order-md-0">
                      <h3 className="tag-Cat gradientText">Data Management Strategy</h3>
                      <p className="tag-title">Lead with Data. Win with Strategy</p>
                      <p className="tag-desc">Empower your business with a data strategy that unites people, processes and technology to deliver measurable growth and compliance.</p>
                    </div>
                    <div className="col-md-6 order-0 order-md-1">
                      <Image src="/images/img-DataManagement.png" alt="Emisha" width={509} height={421} className="img-fluid" />
                    </div>
                  </div>
              </div>
            </div>

            <div className="row align-items-center justify-content-between mt-5">
              <div className="col-md-6">
                <Image src="/images/img-OrganisationMaturityAnalysis.png" alt="Emisha" width={657} height={585} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Organisation Maturity Analysis</h3>
                <p className="tag-title">Benchmark Today. Outperform Tomorrow</p>
                <p className="tag-desc">Assess your organization&apos;s data maturity against global frameworks to establish your data baseline and chart a path to organizational excellence.</p>
              </div>
            </div>

            <div className="row align-items-center justify-content-between mt-5 mt-md-0 mb-5">
              <div className="col-md-5 order-1 order-md-0">
                <h3 className="tag-Cat gradientText">Proof of Concept</h3>
                <p className="tag-title">From Concept to Confidence</p>
                <p className="tag-desc">Experiment with innovative data solutions quickly, validate their impact, and move forward with clarity ensuring only the right solutions scale across your business.</p>
              </div>
               <div className="col-md-6 order-0 order-md-1">
                <Image src="/images/img-proofConcept.png" alt="Emisha" width={624} height={611} className="img-fluid" />
              </div>
            </div>

            <div className="commonCard2" style={{backgroundColor:'#fdfdfd'}}>
              <div className="card-body">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-6">
                      <Image src="/images/img-BusinessCase.png" alt="Emisha" width={635} height={517} className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                      <h3 className="tag-Cat gradientText">Business Case & ROI Analysis</h3>
                      <p className="tag-title">Invest in Data with Confidence</p>
                      <p className="tag-desc">Our ROI analysis enables you to quantify the impact of data initiatives, minimize uncertainty, and secure the resources required for confident scaling.</p>
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>


        {/* partners Section */}
        <Partners />


    </div>


    </Layout>
  );
}

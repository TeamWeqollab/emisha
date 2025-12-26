import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import Partners from "@/components/Partners.jsx";

import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function EnterpriseInformationManagement() {
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
            <Image src="/images/banner-enterpriseInformation.png" alt="Emisha" layout="fill" className="img-fluid" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="banner-details">
                  <h2 className="banner-title">Data Trust &amp; <br />Transformation Services</h2>
                  <p className="banner-desc">We enable enterprises to build robust governance frameworks, ensure the integrity of information assets, and harness data as a strategic driver of sustainable business transformation.</p>
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
                <Image src="/images/img-dataProfiling.png" alt="Emisha" width={697} height={450} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Data Profiling and Catalogue</h3>
                <h4 className="tag-title">Turn Data Visibility into Business Advantage</h4>
                <p className="tag-desc">Our Data Cataloguing and Profiling services provide a comprehensive view of enterprise data assets, enabling organizations to identify, classify, and assess data quality.</p>
              </div>
            </div>

            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Master & Reference Data Management</h3>
                <h4 className="tag-title">Unified Data. Consistent Decisions</h4>
                <p className="tag-desc">Our Master and Reference Data Management services ensure that critical enterprise data is accurate, consistent, and governed across all systems.</p>
              </div>
                <div className="col-md-6">
                <Image src="/images/img-masterRefrence.png" alt="Emisha" width={762} height={524} className="img-fluid" />
              </div>
            </div>

             <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-6">
                <Image src="/images/img-dataManagementService.png" alt="Emisha" width={553} height={529} className="img-fluid" />
              </div>
              <div className="col-md-5">
                <h3 className="tag-Cat gradientText">Data Management as a Service</h3>
                <h4 className="tag-title">Reliable Data, Delivered</h4>
                <p className="tag-desc">Scalable data management delivered as a service—ensuring quality, compliance, and accessibility without the overhead</p>
              </div>
            </div>

            <div className="commonCard2" style={{backgroundColor:'#fdfdfd'}}>
              <div className="card-body">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-5">
                      <h3 className="tag-Cat gradientText">Next-Level Data Management for SAP</h3>
                      <h4 className="tag-title">SAP MDG Implementation, Done Right.</h4>
                      <p className="tag-desc">We help you choose the right deployment model, streamline processes, and embed change management to maximize business impact and reduce implementation risk.</p>
                    </div>
                    <div className="col-md-6">
                      <Image src="/images/img-deploymentModel.png" alt="Emisha" width={704} height={662} className="img-fluid" />
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </section>


        {/* partners Section */}
        <Partners />




    </Layout>
  );
}

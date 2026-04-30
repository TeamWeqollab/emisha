import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import Partners from "@/components/Partners.jsx";

import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function DataTrustTransformationServices() {
  const partnershipCarouselRef = useRef(null);

  return (
    <Layout
      pageTitle="Data Trust & Transformation Services | Emisha"
      metaTitle="Data Trust & Transformation Services | Emisha"
      metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
      socialTitle="Data Trust & Transformation Services | Emisha"
      socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
      socialImage="/images/Emisha-Social-card.png"
      socialUrl="/services/data-trust-transformation-services"
    >

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

      <div className="bg-service">


        <div className="innerBanner">
          <div className="d-none d-lg-block">
            {/* <Image src="/images/banner-enterpriseInformation.png" alt="Emisha" layout="fill" className="img-fluid" /> */}
            <div className="deskBanner text-center">
              <Image src="/images/banner-enterpriseInformation.png" alt="Emisha" layout="contain" width={1920} height={824} className="img-fluid" />
            </div>
          </div>
          <div className="d-lg-none text-center">
            <Image src="/images/banner-enterpriseInformation-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-7 col-xl-7">
                <div className="banner-details">
                  <h2 className="banner-title">Data Trust &amp; <br />Transformation Services</h2>
                  <p className="banner-desc">We enable enterprises to build robust governance frameworks, ensure the integrity of information assets, and harness data as a strategic driver of sustainable business transformation.</p>
                  <Link href='/contact' className="btn btn-primary" aria-label="Get started by contacting us">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="sectionWrapper pt-5 pt-xl-0">
          <div className="container">

            <div className="row align-items-center justify-content-between mt-0 mt-xl-5">
              <div className="col-md-6 col-lg-6">
                <Image src="/images/img-dataProfiling.png" alt="Emisha" width={697} height={450} className="img-fluid" />
              </div>
              <div className="col-md-5 col-lg-5">
                <h3 className="tag-Cat"><span className="gradientText">Data Profiling and Catalogue</span></h3>
                <p className="tag-title">Turn Data Visibility into Business Advantage</p>
                <p className="tag-desc">Our Data Cataloguing and Profiling services provide a comprehensive view of enterprise data assets, enabling organizations to identify, classify, and assess data quality.</p>
              </div>
            </div>

            <div className="row align-items-center justify-content-between mt-5 mt-lg-0 mb-5">
              <div className="col-md-5 col-lg-5 order-1 order-md-0">
                <h3 className="tag-Cat"><span className="gradientText">Master & Reference Data Management</span></h3>
                <p className="tag-title">Unified Data. Consistent Decisions</p>
                <p className="tag-desc">Our Master and Reference Data Management services ensure that critical enterprise data is accurate, consistent, and governed across all systems.</p>
              </div>
              <div className="col-md-6 col-lg-6 order-0 order-md-1">
                <Image src="/images/img-masterRefrence.png" alt="Emisha" width={762} height={524} className="img-fluid" />
              </div>
            </div>

            <div className="row align-items-center justify-content-between mb-5">
              <div className="col-md-6 col-lg-6">
                <Image src="/images/img-dataManagementService.png" alt="Emisha" width={553} height={529} className="img-fluid" />
              </div>
              <div className="col-md-5 col-lg-5">
                <h3 className="tag-Cat"><span className="gradientText">Data Management as a Service</span></h3>
                <p className="tag-title">Reliable Data, Delivered</p>
                <p className="tag-desc">Scalable data management delivered as a service—ensuring quality, compliance, and accessibility without the overhead</p>
              </div>
            </div>

            <div className="commonCard2" style={{ backgroundColor: '#fdfdfd' }}>
              <div className="card-body">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-5 col-lg-5 order-1 order-md-0">
                    <h3 className="tag-Cat"><span className="gradientText">Next-Level Data Management for SAP</span></h3>
                    <p className="tag-title">SAP MDG Implementation, Done Right.</p>
                    <p className="tag-desc">We help you choose the right deployment model, streamline processes, and embed change management to maximize business impact and reduce implementation risk.</p>
                  </div>
                  <div className="col-md-6 col-lg-6 order-0 order-md-1">
                    <Image src="/images/img-deploymentModel.png" alt="Emisha" width={704} height={662} className="img-fluid" />
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

import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import LatestInsights from "@/components/LatestInsights.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LeadInfo from "@/components/LeadInfo.jsx";
import InnerBanner from "@/components/InnerBanner.jsx";

export default function CloudDataEngineering() {
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
          <div className="d-none d-lg-block">
            <Image src="/images/banner-services.png" alt="Emisha" layout="fill" className="img-fluid" />
          </div>
          <div className="d-lg-none">
            <Image src="/images/banner-services-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8 col-xl-8">
                <div className="banner-details">
                  <h2 className="banner-title">Build a Solid Data Foundation. <br />Unlock Enterprise Growth.</h2>
                  <p className="banner-desc">For organizations seeking direction and clarity on the data maturity roadmap, our Foundation Services offer structured guidance across the complex landscape of technologies, methodologies, planning, implementation, and deployment strategies</p>
                  <Link href='#' className="btn btn-primary">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </Layout>
  );
}

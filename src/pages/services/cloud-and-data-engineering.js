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
  const partnershipCarouselData = [
    {
      id: 1,
      icon: '/images/icon-philosopy1.svg',
      // title: 'Why our partnerships endure:',
      subtitle: 'Business Evolution Focus',
      text: 'We invest in understanding your business evolution, not just current requirements'
    },
    {
      id: 2,
      icon: '/images/icon-philosopy2.svg',
      // title: 'Why our partnerships endure:',
      subtitle: 'Adaptive Systems',
      text: 'Our systems grow with your organization, adapting to new challenges and opportunities'
    },
    {
      id: 3,
      icon: '/images/icon-philosopy3.svg',
      // title: 'Why our partnerships endure:',
      subtitle: 'Strategic Guidance',
      text: 'We provide strategic technology guidance that aligns with your competitive positioning'
    },
    {
      id: 4,
      icon: '/images/icon-philosopy4.svg',
      // title: 'Why our partnerships endure:',
      subtitle: 'Priority Access',
      text: 'You get priority access to our expertise as your organization scales and evolves'
    }
  ];

  const partnershipCarouselResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1400, min: 992 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1
    }
  };
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
            <Image src="/images/banner-services.png" alt="Emisha" layout="fill" className="img-fluid" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="banner-details">
                  <h2 className="banner-title">Build a Solid Data Foundation. <br />Unlock Enterprise Growth.</h2>
                  <p className="banner-desc">For organizations seeking direction and clarity on the data maturity roadmap, our Foundation Services offer structured guidance across the complex landscape of technologies, methodologies, planning, implementation, and deployment strategies</p>
                  <Link href='#' className="btn btn-primary">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>




    </Layout>
  );
}

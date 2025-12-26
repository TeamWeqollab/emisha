import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function Resources() {
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
      socialUrl="/resources"
    >

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

      <div className="innerBanner2">
        <div className="d-none d-md-block">
          <Image src="/images/banner-resources.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="d-md-none">
          <Image src="/images/banner-resources-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">Resources</h2>
                <p className="banner-desc">Expert insights and best practices to help you maximize your data&apos;s value.</p>
              </div>
            </div>
          </div>
        </div>
      </div>




      <section className="sectionWrapper" id="resourcesPage">
        <div className="container">

          <div className="row justify-content-center row-cols-2 row-cols-md-7 g-1 g-lg-3" id="catResources">
            {/* <div className="col">
                  <Link href='#' className="btn btn-secondary">All</Link>
                </div> */}
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary active">Whitepaper</Link>
            </div>
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary">Case Studies</Link>
            </div>
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary">E-books</Link>
            </div>
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary">Video Tutorials</Link>
            </div>
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary">Toolkits</Link>
            </div>
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary">Blog</Link>
            </div>
            <div className="col-auto">
              <Link href='#' className="btn btn-secondary">Customer Stories</Link>
            </div>
          </div>


          <div className="row">
            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-1.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">The Value of High-Quality Data</h2>
                <Link href='resources-detail' className="link-primary">Read More</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-2.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Future-Ready Data Strategy</h2>
                <Link href='resources-detail' className="link-primary">Read More</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-3.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Master Data Management</h2>
                <Link href='resources-detail' className="link-primary">Read More</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-4.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Migrating from SAP MDM to MDG</h2>
                <Link href='resources-detail' className="link-primary">Read More</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-5.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Data Governance Frameworks</h2>
                <Link href='resources-detail' className="link-primary">Download</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-6.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Measure ROI in Data Management</h2>
                <Link href='resources-detail' className="link-primary">View</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-7.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Data Processes with Automation</h2>
                <Link href='resources-detail' className="link-primary">Read More</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-8.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Challenges in BFSI and Retail</h2>
                <Link href='resources-detail' className="link-primary">Download</Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="resourceCard">
                <div className="imageContainer">
                  <Image src="/images/img-whitePaper-9.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                </div>
                <h2 className="card-title">Data Management as a Service</h2>
                <Link href='resources-detail' className="link-primary">View</Link>
              </div>
            </div>

          </div>

        </div>
      </section>




    </Layout>
  );
}

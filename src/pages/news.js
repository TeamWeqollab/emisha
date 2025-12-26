import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function News() {
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
      socialUrl="/news"
    >

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

      <div className="innerBanner2">
        <div>
          <Image src="/images/banner-news.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">News</h2>
              </div>
            </div>
          </div>
        </div>
      </div>




      <section className="newsSection">
        <div className="container">

        {/* Search section */}
          <div className="row justify-content-center" id="searchNews">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"> <i className="fa fa-search searchIcon"></i> </span>
                <input type="text" className="form-control" placeholder="search news here..." aria-label="Username" aria-describedby="basic-addon1" />
              </div>
            </div>
          </div>


          {/* Latest News section */}
          <div className="latestNews">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="newsHeading">LATEST</h2>
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


          {/* Filters */}
          <div className="row justify-content-end mt-4">
            <div className="col-auto">
              <span className="filters">Filters</span>
            </div>
            <div className="col-auto">
              <span className="sortBy">SORT BY: <span className="sortByValue">POPULAR</span></span>
            </div>
          </div>


          {/* News Grid */}
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card newsCard">
                <div className="row align-items-center g-0">
                  <div className="col-lg-6">
                    <div className="imageContainer-news">
                      <Image src="/images/img-news-1.jpg" alt="Emisha" width={1480} height={568} className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h3 className="card-title">Emisha Launches DMaaS</h3>
                      <p className="card-date">Product Launches   -    April 2025</p>
                      <p className="card-text">A scalable, cost-effective solution for data quality and governance.</p>
                      <Link href='#' className="link-primary">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card newsCard">
                <div className="row align-items-center g-0">
                  <div className="col-lg-6">
                    <div className="imageContainer-news">
                      <Image src="/images/img-news-2.jpg" alt="Emisha" width={1480} height={568} className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">Boosting ROI with Data Strategy</h5>
                      <p className="card-date">Business Insights   -    May 2025</p>
                      <p className="card-text">Helping businesses maximize returns through tailored data management.</p>
                      <Link href='#' className="link-primary">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card newsCard">
                <div className="row align-items-center g-0">
                  <div className="col-lg-6">
                    <div className="imageContainer-news">
                      <Image src="/images/img-news-3.jpg" alt="Emisha" width={1480} height={568} className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">Future-Ready Data Solutions</h5>
                      <p className="card-date">Thought Leadership   -    June 2025</p>
                      <p className="card-text">Evolving with new tools to help businesses unlock data potential.</p>
                      <Link href='#' className="link-primary">Learn More</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="row mt-5 mb-5">
            <div className="col-md-12">
              <div className="text-center">
                <Link href='#' className="btn btn-primary">LOAD MORE</Link>
              </div>
            </div>
          </div>

        </div>
      </section>




    </Layout>
  );
}

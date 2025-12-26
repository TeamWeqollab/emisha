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






      <section className="sectionWrapper" id="resourcesPage" style={{paddingBottom:'0px'}}>
        <div className="container">

          <div className="blogPageContent">
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <h2 className="post-title">Emisha expands with new partnerships</h2>
                <p className="post-desc">By John Doe, [Description here], Emisha </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="post-banner">
                  <Image src="/images/img-news-1.jpg" alt="Emisha" width={1422} height={680} className="img-fluid" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h2 className="post-heading">LOREM IPSUM DOLOR SIT.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sed dapibus varius, justo lorem ultricies sapien, vitae lacinia risus lorem vel augue. Praesent vehicula, lacus in dictum fermentum, justo arcu tincidunt ipsum, in porta risus lorem non nisl. Nullam interdum, augue sed pharetra facilisis, lacus est facilisis turpis, sed aliquet urna purus eget urna. Integer non sapien vel nibh tristique sollicitudin. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>


                <figure className="blockFigure">
                  <blockquote className="blockquote">
                    <h3 className="blockTitle">At Emisha, we transform the existing into something exceptional, by reimagining, reassembling, or redefining it to unlock greater purpose and performance.</h3>
                  </blockquote>
                </figure>


                <h2 className="post-heading">CONSECTETUR ADIPISCING ELIT.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sed dapibus varius, justo lorem ultricies sapien, vitae lacinia risus lorem vel augue. Praesent vehicula, lacus in dictum fermentum, justo arcu tincidunt ipsum, in porta risus lorem non nisl. Nullam interdum, augue sed pharetra facilisis, lacus est facilisis turpis, sed aliquet urna purus eget urna. Integer non sapien vel nibh tristique sollicitudin. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet. </p>

                <p>consectetur adipiscing elit. Sed euismod, nunc sed dapibus varius, justo lorem ultricies sapien, vitae lacinia risus lorem vel augue. Praesent vehicula, lacus in dictum fermentum, justo arcu tincidunt ipsum, in porta risus lorem non nisl. Nullam interdum, augue sed pharetra facilisis, lacus est facilisis turpis, sed aliquet urna purus eget urna. Integer non sapien vel nibh tristique sollicitudin. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>

              </div>
            </div>

          </div>


          {/* Related Posts */}
          <div className="relatedSection">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="gradientText">MORE FROM EMISHA</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="resourceCard">
                  <div className="imageContainer">
                    <Image src="/images/img-whitePaper-1.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                  </div>
                  <h2 className="card-title">The Value of High-Quality Data</h2>
                  <Link href='#' className="link-primary">Read More</Link>
                </div>
              </div>

              <div className="col-md-4">
                <div className="resourceCard">
                  <div className="imageContainer">
                    <Image src="/images/img-whitePaper-2.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                  </div>
                  <h2 className="card-title">Future-Ready Data Strategy</h2>
                  <Link href='#' className="link-primary">Read More</Link>
                </div>
              </div>

              <div className="col-md-4">
                <div className="resourceCard">
                  <div className="imageContainer">
                    <Image src="/images/img-whitePaper-3.jpg" alt="Emisha" width={960} height={720} className="img-fluid" />
                  </div>
                  <h2 className="card-title">Master Data Management</h2>
                  <Link href='#' className="link-primary">Read More</Link>
                </div>
              </div>



            </div>
          </div>

        </div>
      </section>




    </Layout>
  );
}

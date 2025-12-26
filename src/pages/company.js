import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";
import Partners from "@/components/Partners.jsx";


export default function Company() {
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
            <Image src="/images/banner-company.png" alt="Emisha" layout="fill" className="img-fluid" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="banner-details">
                  <h2 className="banner-title">Enabling Enterprises to Unlock the Full Value of Their Data Through Trusted Governance and Transformation</h2>
                  <p className="banner-desc">Guided by our mission to be the most trusted partner for enterprises seeking to transform data into a strategic asset that drives innovation, resilience, and sustainable growth.</p>
                  <Link href='#' className="btn btn-primary">GET STARTED</Link>
                </div>
              </div>
            </div>
          </div>
        </div>




        <section className="sectionWrapper">
          <div className="container">
            
            <div className="row justify-content-center">
              <div className="col-md-11 text-center">
                <h2 className="aboutHeading">About us</h2>
                <p className="aboutDesc">Emisha is a global data consulting and technology services firm specialising in unlocking business value through trusted, high-quality, and intelligently governed data. We partner with enterprises to design, implement, and scale modern data capabilities across the full data value chain — including data strategy, data governance, master data management, data quality, analytics, AI-readiness, and cloud data platforms.</p>

                <p className="aboutDesc">With a proven track record across industries such as manufacturing, retail, energy, financial services, and consumer goods, Emisha enables organisations to move from fragmented data landscapes to connected, governed, insight-driven ecosystems that power business outcomes, regulatory confidence, and digital transformation.</p>

                <p className="aboutDesc mb-0">Our engagements span advisory, implementation, managed services, and product enablement for leading data platforms — delivering measurable impact through accelerated time-to-value, reduced risk, and enhanced decision intelligence.</p>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-11 text-center">
                <h2 className="aboutLeatTitle gradientText">Innovation is more than just an idea. It&apos;s action</h2>
              </div>
            </div>


            <div className="commonCard2" style={{backgroundColor:'#fdfdfd', padding: '40px 40px'}}>
              <div className="card-body">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-12 text-center">
                      <div>
                        <Image src="/images/img-innovation.svg" alt="Emisha" width={309} height={179} className="img-fluid" />
                      </div>
                      <p className="aboutDesc mb-0" style={{fontWeight:'400'}}>At Emisha, we reimagine what exists to unlock greater purpose and performance.</p>
                    </div>
                  </div>
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


        <section className="sectionWrapper pt-3">
          <div className="container">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <h2 className="hd-ourServices">Our <br />Foundation</h2>
                </div>
                <div className="col-md-3">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-people.svg" alt="Emisha" width={60} height={60} />
                      </div>
                      <h5 className="card-title">Our People</h5>
                      <p className="card-text">A passionate team with decades of global experience, committed to excellence.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-products.svg" alt="Emisha" width={60} height={60} />
                      </div>
                      <h5 className="card-title">Our Products</h5>
                      <p className="card-text">Strong collaborations built on shared vision, action, and results.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-partners.svg" alt="Emisha" width={60} height={60} />
                      </div>
                      <h5 className="card-title">Our Partners</h5>
                      <p className="card-text">Innovative, market-leading solutions designed to deliver real value.</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>





        <section className="bringAction">
          <div className="container">
              <div className="row row-cols-4 align-items-center">
               
                <div className="col">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-action1.svg" alt="Emisha" width={90} height={90} />
                      </div>
                      <h5 className="card-title">BRING ACTION TO <br /> INNOVATION</h5>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-action2.svg" alt="Emisha" width={90} height={90} />
                      </div>
                      <h5 className="card-title">LEVERAGE <br />  Partnerships</h5>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-action3.svg" alt="Emisha" width={90} height={90} />
                      </div>
                      <h5 className="card-title">Redefine <br />  Excellence</h5>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card commonCard bg-lightGray">
                    <div className="card-body">
                      <div className="cardIcon">
                        <Image src="/images/icon-action4.svg" alt="Emisha" width={90} height={90} />
                      </div>
                      <h5 className="card-title">Lead with <br />  Accountability</h5>
                    </div>
                  </div>
                </div>


              </div>
          </div>
        </section>




        {/* partners Section */}
        <Partners />




        <section>
          <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="careerEmishaBx">
                    <h2 className="title">CAREERS AT EMISHA</h2>
                    <h3 className="sub-Title">Want to Join Our Team?</h3>
                    <p className="card-Text">At Emisha, you&apos;ll do work that matters. We bring together curious minds and experienced practitioners to solve complex data challenges for leading enterprises. If you&apos;re passionate about building trusted data foundations and shaping meaning full transformation, Emisha offers a place to grow, lead, and make an impact.</p>

                    <p className="card-Text2">Ready to Deliver Value?</p>
                    <p className="card-Text2">Email us to inquire about open roles.</p>

                    <Link href='#' className="btn btn-primary mt-4">JOIN THE TEAM</Link>
                  </div>
                </div>
              </div>
          </div>
        </section>




    </Layout>
  );
}

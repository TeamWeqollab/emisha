import Layout from "@/components/Layout.jsx";
import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function ContactUs() {
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
        socialUrl="/contact"
    >

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

        <div className="innerBanner2">
          <div>
            <Image src="/images/banner-contact.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="banner-details2">
                  <h2 className="banner-title">Your business <br />deserves better data.</h2>
                  <p className="banner-desc">Reach out to Emisha and take control of your data strategy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>




        <section className="sectionWrapper pt-0">
          <div className="container">
            <div className="contactEmishaBx">
              <div className="row align-items-start justify-content-between">
                <div className="col-md-4">
                  <h3 className="title">Contact Information</h3>
                  <p className="card-Text">Talk to Emisha and let&apos;s innovate together.</p>
                  <p className="card-Text">+65-XXXX-YYYY</p>
                  <p className="card-Text">info@emishaglobal.com</p>
                  <p className="card-Text mb-0">An Emisha expert will reach out soon with tailored solutions to meet your needs.</p>
                </div>

                <div className="col-md-7">
                  <div className="contactForm">
                      <div className="mb-3">
                        <label class="form-label">Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" className="form-control" />
                      </div>
                       <div className="mb-3">
                        <label class="form-label">Phone (Optional)</label>
                        <input type="tel" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label class="form-label">Message</label>
                        <textarea className="form-control" rows="4" style={{resize:'none'}}></textarea>
                      </div>
                      <div className="text-end">
                       <button type="submit" className="btn btn-primary">SUBMIT</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>




    </Layout>
  );
}

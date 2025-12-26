import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1400 },
    items: 1,
    partialVisibilityGutter: 686
  },
  desktop: {
    breakpoint: { max: 1399.99, min: 1200 },
    items: 1,
    partialVisibilityGutter: 686
  },
  ipadPro: {
    breakpoint: { max: 1199.99, min: 992 },
    items: 1,
    //partialVisibilityGutter: 120
  },
  tablet: {
    breakpoint: { max: 991.99, min: 768 },
    items: 1,
    //partialVisibilityGutter: 120
  },
  Phablet: {
    breakpoint: { max: 767.99, min: 575 },
    items: 1,
    //partialVisibilityGutter: 120
  },
  mobile: {
    breakpoint: { max: 574.99, min: 0 },
    items: 1,
    //partialVisibilityGutter: 80
  },

};

const clientSuccessData = [
  {
    id: 1,
    title: "Healthcare: Unified Operations Intelligence",
    image: "/images/img-clientSucces1.svg",
    mobimage: "/images/img-clientSucces1-xs.svg",
    alt: "Healthcare",
    stats: [
      { number: "450+", label: "Locations Managed" },
      { number: "15K", label: "Daily Samples" },
      { number: "100%", label: "System Integration" }
    ],
    features: [
      "Single operational dashboard managing 450+ pathology and radiology locations.",
      "Real-time processing of 18,000+ daily samples across B2B, B2C, and corporate channels.",
      "Integrated billing, CRM, and finance reporting, eliminating multiple system complexity.",
      "Complete business chain visibility, from customer acquisition to partner management."
    ],
    linkText: "Explore →",
    linkHref: "/customer-stories"
  },
  {
    id: 2,
    title: "BFSI: Value Chain Financing Platform",
    image: "/images/img-clientSucces2.svg",
    mobimage: "/images/img-clientSucces2-xs.svg",
    alt: "BFSI",
    stats: [
      { number: "$300M+", label: "Transaction Volume" },
      { number: "100%", label: "Compliance Rate" },
      { number: "24/7", label: "System Availability" }
    ],
    features: [
      "Custom loan origination for customers worth $300 million in agriculture.",
      "Field data collection integrated with board-level approval workflows.",
      "Multi-jurisdiction regulatory compliance with full audit trail capabilities.",
      "End-to-end loan lifecycle management from assessment to disbursement."
    ],
    linkText: "Explore →",
    linkHref: "/customer-stories"
  },
  {
    id: 3,
    title: "Government: Citizen-Scale Insurance Management",
    image: "/images/img-clientSucces3.svg",
    mobimage: "/images/img-clientSucces3-xs.svg",
    alt: "Government: Citizen-Scale Insurance Management",
    stats: [
      { number: "35M+", label: "Beneficiaries" },
      { number: "20+", label: "States" },
      { number: "100%", label: "Paperless" }
    ],
    features: [
      "Comprehensive MIS supporting 35+ million beneficiaries across 20+ states.",
      "Biometric enrollment integration with hospital networks and claims processing.",
      "Real-time policy administration with paperless claims and audit-ready reporting.",
      "Multi-year operational support transitioning from world bank to ministry direct partnership."
    ],
    linkText: "Explore →",
    linkHref: "/customer-stories"
  }
];

export default function ClientSuccessCarousel({
  className = ""
}) {
  const carouselRef = useRef(null);
  return (
    <>
      <div className="clientSuccess-carousel">

        <div className="container-fluid">
          <div className="d-flex justify-content-end mb-4">
            <div className="prev me-2" onClick={() => carouselRef.current?.previous()}>
              <i className="fas fa-arrow-left"></i>
            </div>
            <div className="next" onClick={() => carouselRef.current?.next()}>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>


        <div className={`row justify-content-end ${className}`} id="clientSuccessCarouselRow">
          <div className="col-xl-10">
            <Carousel
              ref={carouselRef}
              responsive={responsive}
              arrows={false}
              infinite
              partialVisible
              removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
              renderDotsOutside={true}
              itemClass="carousel-item-padding"
            >
              {clientSuccessData.map((item) => (
                <div key={item.id}>
                  <div className="card h-100 clientSuccessCard">
                    <div className="card-body p-0">
                      <h5 className="card-title">{item.title}</h5>
                      <div className="clientSuccessImage">
                        <Image
                          src={item.image}
                          width={1508}
                          height={840}
                          alt={item.alt}
                          className="img-fluid d-none d-md-block"
                        />

                        <Image
                          src={item.mobimage}
                          width={1508}
                          height={840}
                          alt={item.alt}
                          className="img-fluid d-md-none"
                        />

                        <div className="clientSuccessImageOverlay d-none d-md-block">
                          <div className="row">
                            {item.stats.map((stat, index) => (
                              <div key={index} className="col-4">
                                <div className="numbers">{stat.number}</div>
                                <div className="details">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <ul className="list-unstyled listType1">
                          {item.features.map((feature, index) => (
                            <li key={index} className={index > 0 ? "mb-2" : ""}>
                              {index > 0 && " "}
                              {feature.includes('<strong>') ? (
                                <span dangerouslySetInnerHTML={{ __html: feature }} />
                              ) : (
                                feature
                              )}
                            </li>
                          ))}
                        </ul>
                        <Link href={item.linkHref} className="card-link">
                          {item.linkText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

      </div>
    </>
  );
}

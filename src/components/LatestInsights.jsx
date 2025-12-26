import Image from "next/image";
import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsiveInsights = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1023, min: 768 },
    items: 2,
  },
  Phablet: {
    breakpoint: { max: 767, min: 481 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};

const insightsData = [
  {
    id: 1,
    image: "/images/img-insight1.jpg",
    title: "AP Automation 101: Streamlining your Accounts Payable process",
    category: "Articles",
    alt: "AP Automation insights"
  },
  {
    id: 2,
    image: "/images/img-insight2.jpg",
    title: "Everything you need to know about international B2B payments",
    category: "Guides & Research Reports",
    alt: "International B2B payments insights"
  },
  {
    id: 3,
    image: "/images/img-insight3.jpg",
    title: "The benefits of a real-time, two-way sync",
    category: "Articles",
    alt: "Real-time sync insights"
  },
  {
    id: 4,
    image: "/images/img-insight4.jpg",
    title: "The importance of invoice approval workflows",
    category: "Articles",
    alt: "Invoice approval workflows insights"
  }
];

export default function LatestInsights({
  sectionId = "latestInsights",
  title = "Latest Insights",
  showTitle = true,
  className = ""
}) {

  const carouselRef = useRef(null);

  return (
    <section id={sectionId} className={className}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            {showTitle && <h2 className="sectionHeading mb-0 mb-lg-4">{title}</h2>}
          </div>
        </div>

        <div className="row mt-2" id="insightsCarouselRw">
          <div className="col-lg-12 d-lg-none">
            <div className="d-flex justify-content-end">
              <div className="prev me-2" onClick={() => carouselRef.current?.previous()}>
                <i className="fas fa-arrow-left"></i>
              </div>
              <div className="next" onClick={() => carouselRef.current?.next()}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Carousel
              ref={carouselRef}
              responsive={responsiveInsights}
              showDots={false}
              draggable={true}
              removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
              renderDotsOutside={true}
              itemClass="carousel-item-padding"
            >
              {insightsData.map((insight) => (
                <div key={insight.id}>
                  <div className="card h-100 insightsCard">
                    <div className="card-body p-0">
                      <div className="insightImage">
                        <Image
                          src={insight.image}
                          width={542}
                          height={306}
                          alt={insight.alt}
                          className="img-fluid"
                        />
                      </div>
                      <h3 className="card-title">{insight.title}</h3>
                    </div>
                    <div className="card-footer">
                      <span className="badge badge-primary">{insight.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

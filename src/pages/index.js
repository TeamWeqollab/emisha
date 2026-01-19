// import Head from "next/head";
import Layout from "@/components/Layout.jsx";
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Partners from "@/components/Partners.jsx";

// import LatestInsights from "@/components/LatestInsights.jsx";
// import ClientSuccessCarousel from "@/components/ClientSuccessCarousel.jsx";
// import LeadInfo from "@/components/LeadInfo.jsx";

// import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import axios from "axios";





export default function Home({ homepageNews = [], homepageResources = [] }) {
  // Dev-only logs
  if (process.env.NODE_ENV === 'development') {
    try { console.log('Client: homepageNews ->', homepageNews); } catch (e) {}
    try { console.log('Client: homepageResources ->', homepageResources); } catch (e) {}
  }
  const [activeResourceIndex, setActiveResourceIndex] = useState(0);

  // Keep active index valid when resources change
  useEffect(() => {
    const max = Math.min(3, (homepageResources && homepageResources.length) || 0);
    if (max === 0 && activeResourceIndex !== 0) {
      setActiveResourceIndex(0);
    } else if (activeResourceIndex >= max) {
      setActiveResourceIndex(0);
    }
  }, [homepageResources, activeResourceIndex]);

  // Simplified helper: handle common image shapes only
  const getImageUrl = (item) => {
    const image = item?.Banner || item?.Image || item?.Thumbnail || (item?.attributes && (item.attributes.Banner || item.attributes.Image || item.attributes.Thumbnail));
    if (!image) return null;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    if (typeof image === 'string') return image.startsWith('http') ? image : `${baseUrl}${image}`;
    if (image?.data?.attributes?.url) return `${baseUrl}${image.data.attributes.url}`;
    if (image?.attributes?.url) return `${baseUrl}${image.attributes.url}`;
    if (image?.url) return image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
    return null;
  };

  // Date formatter used in Latest News
  // const formatDate = (dateString) => {
  //   if (!dateString) return '';
  //   try {
  //     const d = new Date(dateString);
  //     return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  //   } catch (e) { return '' }
  // };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  

  return (
    <>
      
      <Layout
        pageTitle="Emisha"
        metaTitle="Future-proofing businesses with intelligent data solutions."
        metaDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
        metaKeywords="Data-driven business solutions, End-to-end data solutions, Business data transformation, Data integration services, Enterprise data solutions, Data strategy and execution, Business integration expertise, Tailored data strategies, Data consulting services, Data-driven decision making, Digital transformation solutions, Strategic data consulting"
        socialTitle="Future-proofing businesses with intelligent data solutions."
        socialDescription="Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution."
        socialImage="/images/Emisha-Social-card.png"
        socialUrl="/"
      >


    <div className="bg-home">

    <section id="homeBanner">
          <div className="video-container">
            <div className="overlay"></div>
            <video autoPlay loop muted playsInline preload="none" className="background-video" poster="/images/video-poster.jpg">
              <source src="/videos/video-video.webm" type="video/webm" />
              <source src="/videos/video-emisha.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
      </section>


      <section className="sectionWrapper">
      
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 text-center">
              <Image src="/images/banner-video.png" alt="Emisha" width={1920} height={1055} className="img-fluid" />
            </div>
          </div>

          <div className="row justify-content-center align-items-center">
            <div className="col-md-3 col-lg-2">
              <Image src="/images/logo-footer.svg" alt="Emisha" width={206} height={120} className="img-fluid p-4" />
            </div>
            <div className="col-md-9 col-lg-8">
              <p className="banner-leadInfo">Emisha empowers businesses by unlocking the full potential of their data through end-to-end solutions. With expertise in business integration, tailored strategies, and consulting, we bridge data complexity with precision, ensuring seamless transformation from strategy to execution.</p>
            </div>
          </div>
        </div>
      </section>



       <section className="sectionWrapper pt-0 pt-lg-5" id="homeOurServices">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 col-lg-3">
              <h2 className="hd-ourServices">OUR SERVICES</h2>
              <p>Optimizing data quality, governance, and strategy.</p>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card commonCard">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services1.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Enterprise Information & Management</h5>
                  <p className="card-text">Turning data into a unified, strategic asset through governance, integration, and quality.</p>
                  <Link href="/services/enterprise-information-and-management" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
           <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card commonCard">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services2.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Foundation<br />Services</h5>
                  <p className="card-text">Building a strong data foundation with strategy, analysis, and management solutions.</p>
                  <Link href="/services/foundation-services" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-end">
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card commonCard">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services3.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Data and <br />Cyber Security</h5>
                  <p className="card-text">Seamless implementation and continuous optimization of data solutions.</p>
                  <Link href="/services/data-and-cyber-security" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
           <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card commonCard lastCommonCard">
                <div className="card-body">
                  <div className="cardIcon">
                     <Image src="/images/icon-services4.svg" alt="Emisha" width={60} height={60} />
                  </div>
                  <h5 className="card-title">Cloud and <br />Data Engineering</h5>
                  <p className="card-text">Seamless design and continuous optimization of cloud-based data platforms.</p>
                  <Link href="/services/cloud-and-data-engineering" className="link-primary">Learn More</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* partners Section */}
      <Partners />



      {/* Latest Resources section */}
       <div className="container">
          <div id="homeResourceSec">
            <div className="row">
              <div className="col-md-12 text-center">
                <p className="mb-2">EXPLORE OUR</p>
                <h2><sapn className="resHeading gradientText">RESOURCES</sapn></h2>
              </div>
            </div>

            <div className="row mb-0 mb-xl-5">
              <div className="col-md-12">
                <ul className="list-inline" id="homeResourceList">
                  {homepageResources && homepageResources.length > 0 ? homepageResources.slice(0,3).map((item, idx) => (
                    <li
                      key={item.id || idx}
                      className={`list-inline-item ${activeResourceIndex === idx ? 'active' : ''}`}
                      onMouseEnter={() => setActiveResourceIndex(idx)}
                      onClick={() => setActiveResourceIndex(idx)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveResourceIndex(idx)}
                      role="button"
                      tabIndex={0}
                    >
                       <Link href={`/resources/${item.Slug || item.slug || ''}`}>
                        <div className="resource-home">
                          <div className="imageContainer-latesResourece position-relative">
                            <Image src={getImageUrl(item) || '/images/img-whitePaper-2.jpg'} alt={item.Title || item.name || 'Resource'} width={480} height={360} className="img-fluid mask2" />
                            <div className="news-btn">
                              <span className="cardIcon">
                                <span className="arrow"></span>
                              </span>
                            </div>
                          </div>
                          <div className="resource-homeDetail">
                            <span className="badge resourceTag">{(item.ResourceType) || 'Resource'}</span>
                            <h3 className="resourceTitle">{item.Title || item.name || 'Untitled'}</h3>
                          </div>
                        </div>
                      </Link>

                    </li>
                  )) : (
                    <li className="list-inline-item">
                      <div className="resource-home">
                        <div className="resource-homeDetail">
                          <h3 className="resourceTitle">No resources defined</h3>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>


          </div>

       </div>




       {/* Latest News section */}
       <div className="container">
          <div className="latestNews homeLatestNews">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2 className="newsHeading">Get The Latest From Emisha</h2>
              </div>
            </div>
            

             <div className="row">
                {homepageNews && homepageNews.length > 0 ? homepageNews.slice(0,3).map((item, idx) => (
                  <div key={item.id || idx} className="col-md-4">
                    <Link href={`/news/${item.Slug || item.slug || ''}`}>
                      <div className="card latestNewsCard">
                        <div className="imageContainer-latestNews position-relative">
                          <Image src={getImageUrl(item) || '/images/img-news-1.jpg'} alt={item.Title || 'Emisha'} width={480} height={360} className="img-fluid mask1" />
                          <div className="news-btn">
                            <span className="cardIcon">
                              <span className="arrow"></span>
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{item.Title || item.name || 'Untitled'}</h5>
                          <p className="card-date">{(item.Category) || 'News'}   -    {formatDate(item.PublishDate)}</p>
                          <p className="card-text">{item.Summary || ''}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )) : (
                  <div className="col-12 text-center py-4">
                    <p>No homepage news defined. Please check the homepage settings in the CMS.</p>
                  </div>
                )}
              </div>


          </div>

       </div>
       

      </div>

      </Layout>
    </>
  );
}




export async function getStaticProps() {
  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL || 
    "http://localhost:1337";

  try {
    const { data } = await axios.get(
      `${base}/api/homepage-setting?populate[homepage_news][populate]=*&populate[homepage_resources][populate]=*`
    );

    const root = data?.data || {};

    const homepageNews = (root.homepage_news || []).map(n => ({
      id: n.id,
      Title: n.Title,
      Slug: n.Slug,
      Summary: n.Summary,
      PublishDate: n.PublishDate,
      Banner: n?.Banner?.url || null,
      Category: n?.news_categorie?.Name || null,
    }));

    const homepageResources = (root.homepage_resources || []).map(r => ({
      id: r.id,
      Title: r.Title,
      Slug: r.Slug,
      Summary: r.Summary,
      Image: r?.Image?.url || r?.Banner?.url || null,
      ResourceType: r?.resource_type?.Name || null,
    }));

    return {
      props: {
        homepageNews,
        homepageResources,
      },
      revalidate: 10, // 🔁 refresh every 60 seconds
    };

  } catch (err) {
    console.error("Homepage fetch failed:", err);

    return {
      props: { homepageNews: [], homepageResources: [] },
      revalidate: 10,
    };
  }
}







// export async function getServerSideProps() {

//   const base =
//     process.env.NEXT_PUBLIC_API_URL ||
//     process.env.NEXT_PUBLIC_STRAPI_URL ||
//     "http://localhost:1337";

//   try {

//     const res = await fetch(
//       `${base}/api/homepage-setting?populate[homepage_news][populate]=*&populate[homepage_resources][populate]=*`
//     );

//     const json = await res.json();

//     // ⭐ THIS IS YOUR REAL ROOT — NO ".attributes"
//     const root = json?.data || {};

//     // ⭐ DIRECT ARRAYS — NO ".data"
//     const rawNews = root?.homepage_news || [];
//     const rawResources = root?.homepage_resources || [];

//     // ⭐ DEBUG LOG (shows in TERMINAL, not browser)
//     console.log("RAW NEWS LENGTH =", rawNews.length);
//     console.log("RAW NEWS SAMPLE =", rawNews[0]);
//     console.log("RAW RESOURCES LENGTH =", rawResources.length);
//     console.log("RAW RESOURCES SAMPLE =", rawResources[0]);

//     // ⭐ MAP NEWS
//     const homepageNews = rawNews.map(item => ({
//       id: item.id,
//       Title: item.Title,
//       Slug: item.Slug,
//       Summary: item.Summary,
//       PublishDate: item.PublishDate,
//       Banner: item?.Banner?.url ?? null,
//       Category: item?.news_categorie?.Name ?? null,
//     }));

//     // ⭐ MAP RESOURCES
//     const homepageResources = rawResources.map(item => ({
//       id: item.id,
//       Title: item.Title,
//       Slug: item.Slug,
//       Summary: item.Summary,
//       Image: item?.Image?.url ?? item?.Banner?.url ?? null,
//       ResourceType: item?.resource_type?.Name ?? null,
//     }));

//     return {
//       props: { homepageNews, homepageResources },
//     };

//   } catch (err) {

//     console.error("Homepage fetch failed:", err);

//     return {
//       props: { homepageNews: [], homepageResources: [] },
//     };
//   }
// }

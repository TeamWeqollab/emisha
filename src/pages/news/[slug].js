import Layout from "@/components/Layout.jsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NewsDetail({ article, relatedArticles }) {
  const router = useRouter();

  if (!article) {
    return (
      <Layout
        pageTitle="Article Not Found"
        metaTitle="Article Not Found"
        metaDescription="The requested article could not be found."
      >
        <section className="sectionWrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center py-5">
                <h1>Article Not Found</h1>
                <p>The article you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/news" className="btn btn-primary">Back to News</Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get category name
  const getCategoryName = (article) => {
    if (article?.Category?.Name) {
      return article.Category.Name;
    }
    if (article?.Category?.name) {
      return article.Category.name;
    }
    return 'News';
  };

  // Get banner image URL
  const getBannerImageUrl = (article) => {
    // Handle Strapi v4 format
    if (article.Banner?.data?.attributes?.url) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${article.Banner.data.attributes.url}`;
    }
    // Handle Strapi v3 format or direct URL
    if (article.Banner?.url) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${article.Banner.url}`;
    }
    // Handle direct URL string
    if (typeof article.Banner === 'string' && article.Banner.startsWith('http')) {
      return article.Banner;
    }
    if (typeof article.Banner === 'string' && article.Banner.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${article.Banner}`;
    }
    // Fallback to default image
    return '/images/img-news-1.jpg';
  };

  // Helpers to detect content type and format content
  const isHtmlContent = (str) => {
    if (!str) return false;
    // crude check for HTML tags
    return /<\/?[a-z][\s\S]*>/i.test(str);
  };

  const isMarkdownContent = (str) => {
    if (!str) return false;
    // check for common markdown constructs: headings, code fences, lists, blockquote, tables
    return /(^#{1,6}\s)|(^-{3,}\s)|(^\*{3}\s)|(^`{3}\s)|(\n\* )|(^> )|(\|.+\|)/m.test(str);
  };

  // Convert/sanitize for meta description
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  const stripMarkdown = (md) => {
    if (!md) return '';
    return md
      .replace(/```[\s\S]*?```/g, '') // remove fenced code blocks
      .replace(/`([^`]*)`/g, '$1') // inline code
      .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
      .replace(/(\*|_)(.*?)\1/g, '$2') // emphasis
      .replace(/#+\s?/g, '') // headings
      .replace(/>\s?/g, '') // blockquote
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
      .replace(/\n{2,}/g, '\n')
      .trim();
  };

  const metaDescription = article.Summary || (isHtmlContent(article.Content) ? stripHtml(article.Content) : stripMarkdown(article.Content))?.substring(0, 160) || 'Read the latest news from Emisha';


  return (
    <>
      <Head>

      </Head>
      <Layout
        pageTitle={article.Title || 'News Article'}
        metaTitle={article.Title || 'News Article'}
        metaDescription={metaDescription}
        metaKeywords={`${article.Title}, Emisha news, ${getCategoryName(article)}`}
        socialTitle={article.Title || 'News Article'}
        socialDescription={metaDescription}
        socialImage={getBannerImageUrl(article)}
        socialUrl={`/news/${article.Slug}`}
      >
      <section className="sectionWrapper dynamicPage" id="resourcesPage" style={{ paddingBottom: '0px' }}>
        <div className="container">
          <div className="blogPageContent">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-11 text-center">
                <h1 className="post-title">{article.Title || 'Untitled'}</h1>
                <p className="post-desc">
                  {/* {getCategoryName(article)} -  */}
                  {formatDate(article.PublishDate)}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="post-banner">
                  <Image
                    src={getBannerImageUrl(article)}
                    alt={article.Title || 'News article'}
                    width={1920}
                    height={1440}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {/* {article.Summary && (
                  <p className="lead" style={{ fontSize: '1.1rem', marginBottom: '2rem', fontStyle: 'italic' }}>
                    {article.Summary}
                  </p>
                )} */}
                
                {article.Content && (
                  isHtmlContent(article.Content) ? (
                    <div
                      className="post-content ckeditor-content"
                      dangerouslySetInnerHTML={{ __html: article.Content }}
                    />
                  ) : (
                    <div className="post-content ckeditor-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.Content}</ReactMarkdown>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="relatedSection">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2 className="gradientText">MORE FROM EMISHA</h2>
                </div>
              </div>
              <div className="row">
                {relatedArticles.slice(0, 3).map((relatedArticle, index) => (
                  <div key={relatedArticle.id || index} className="col-md-4">
                    <Link href={`/news/${relatedArticle.Slug}`} className="resourceLink">
                      <div className="resourceCard">
                        <div className="imageContainer-related">
                          <Image
                            src={getBannerImageUrl(relatedArticle)}
                            alt={relatedArticle.Title || 'Related article'}
                            width={960}
                            height={720}
                            className="img-fluid"
                          />
                        </div>
                        <h3 className="card-title">{relatedArticle.Title || 'Untitled'}</h3>
                        {/* <Link href={`/news/${relatedArticle.Slug}`} className="link-primary">
                          Read More
                        </Link> */}
                        <span className="link-primary">Read More</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      </Layout>
    </>
  );
}

// Generate all possible paths at build time
export async function getStaticPaths() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    // Fetch all news articles to get their slugs
    const articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate=*`);
    
    if (!articlesRes.ok) {
      console.error('Failed to fetch articles for paths:', articlesRes.status);
      return {
        paths: [],
        fallback: 'blocking' // Generate pages on-demand if not found at build time
      };
    }

    const articlesData = await articlesRes.json();
    
    // Extract slugs from articles
    let paths = [];
    
    if (articlesData.data && Array.isArray(articlesData.data)) {
      paths = articlesData.data
        .map((item) => {
          const attributes = item.attributes || item;
          const slug = attributes.Slug || attributes.slug;
          return slug ? { params: { slug } } : null;
        })
        .filter(Boolean);
    } else if (Array.isArray(articlesData)) {
      paths = articlesData
        .map((item) => {
          const slug = item.Slug || item.slug;
          return slug ? { params: { slug } } : null;
        })
        .filter(Boolean);
    }

    return {
      paths,
      fallback: 'blocking' // Generate pages on-demand if not found at build time
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

// Fetch article data for a specific slug
export async function getStaticProps({ params }) {

  const base =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const { slug } = params;

  //
  // 1️⃣ Fetch the current article
  //
  const res = await fetch(
    `${base}/api/news-articles?filters[Slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*`
  );

  const json = await res.json();
  const item = json?.data?.[0];

  if (!item) return { notFound: true };

  const a = item.attributes || item || {};   // 👈 THIS is the FIX

  const article = {
    id: item.id,
    Title: a.Title || a.title || a.Name || a.name || "Untitled",
    Slug: a.Slug || a.slug || "",
    Summary: a.Summary || a.summary || "",
    Content: a.Content || "",
    PublishDate: a.PublishDate || a.publishedAt || "",
    Banner: a.Banner || null,
  };

  //
  // 2️⃣ Related articles
  //
  let relatedArticles = [];

  const relRes = await fetch(
    `${base}/api/news-articles?filters[Slug][$ne]=${encodeURIComponent(
      slug
    )}&sort=PublishDate:desc&pagination[limit]=3&populate=*`
  );

  if (relRes.ok) {
    const relJson = await relRes.json();

    relatedArticles = (relJson?.data || []).map((item) => {
      const a = item.attributes || item || {};

      return {
        id: item.id,
        Title: a.Title || a.title || a.Name || a.name || "Untitled",
        Slug: a.Slug || a.slug || "",
        Summary: a.Summary || a.summary || "",
        Banner: a.Banner || null,
      };
    });
  }

  return {
    props: { article, relatedArticles },
    revalidate: 10,
  };
}


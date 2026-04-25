import Layout from "@/components/Layout.jsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DownloadModalSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
});

export default function ResourceDetail({ resource, relatedResources }) {
  const router = useRouter();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [pendingPdfUrl, setPendingPdfUrl] = useState(null);
  const [downloadError, setDownloadError] = useState("");
  const [emailJsInit, setEmailJsInit] = useState(false);

  useEffect(() => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (publicKey && !emailJsInit) {
        emailjs.init({ publicKey });
        setEmailJsInit(true);
      }
    } catch {}
  }, [emailJsInit]);

  // DEV: log the resource and relatedResources in the browser console for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      try {
        console.log('Resource detail (client):', resource);
        console.log('Related resources (client):', relatedResources);
      } catch (e) {
        console.warn('Error logging resource detail:', e);
      }
    }
  }, [resource, relatedResources]);

  // Lock body scroll when download modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (showDownloadModal) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [showDownloadModal]);

  if (!resource) {
    return (
      <Layout
        pageTitle="Resource Not Found"
        metaTitle="Resource Not Found"
        metaDescription="The requested resource could not be found."
      >
        <section className="sectionWrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center py-5">
                <h1>Resource Not Found</h1>
                <p>The resource you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/resources" className="btn btn-primary">Back to Resources</Link>
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
  const getResourceTypeName = (resource) => {
    if (resource?.ResourceType?.Name) return resource.ResourceType.Name;
    if (resource?.ResourceType?.name) return resource.ResourceType.name;
    if (resource?.Category?.Name) return resource.Category.Name;
    if (resource?.Category?.name) return resource.Category.name;
    return 'Resources';
  };

  // Check if resource type is Video or Videos (for embedded player)
  const isVideoResource = (r) => {
    const name = (r?.ResourceType?.Name || r?.ResourceType?.name || '').toString().trim().toLowerCase();
    return name === 'video' || name === 'videos';
  };

  // Resolve video URL to full URL (handles Strapi relative paths)
  const getFullVideoUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    const u = url.trim();
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    return u.startsWith('/') ? `${baseUrl}${u}` : `${baseUrl}/${u}`;
  };

  // Parse VideoURL: returns { type: 'embed', url } for iframe, { type: 'video', url } for <video>, or null
  const getVideoSource = (url) => {
    if (!url || typeof url !== 'string') return null;
    const u = url.trim();
    if (!u) return null;

    // YouTube
    const watchMatch = u.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return { type: 'embed', url: `https://www.youtube.com/embed/${watchMatch[1]}` };
    if (u.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)) return { type: 'embed', url: u };
    const shortsMatch = u.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) return { type: 'embed', url: `https://www.youtube.com/embed/${shortsMatch[1]}` };
    const beMatch = u.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (beMatch) return { type: 'embed', url: `https://www.youtube.com/embed/${beMatch[1]}` };

    // Vimeo
    const vimeoMatch = u.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (vimeoMatch) return { type: 'embed', url: `https://player.vimeo.com/video/${vimeoMatch[1]}` };

    // Direct video files (Strapi uploads, CDN, etc.)
    const videoExt = /\.(mp4|webm|ogg|mov)(\?|$)/i;
    if (videoExt.test(u)) return { type: 'video', url: getFullVideoUrl(u) };
    // Relative path like /uploads/video.mp4
    if (u.startsWith('/') && /\.(mp4|webm|ogg|mov)(\?|$)/i.test(u)) return { type: 'video', url: getFullVideoUrl(u) };

    // Already an embed URL (e.g. Wistia, other providers)
    if (/\/embed\//.test(u) || /player\./.test(u)) return { type: 'embed', url: getFullVideoUrl(u) };

    return null;
  };

  // Get banner/image URL for resource
  const getBannerImageUrl = (resource) => {
    const image = resource?.Image || resource?.Banner || resource?.image || resource?.banner || resource?.BannerImage || resource?.ImageResource;
    // Handle Strapi v4 format
    if (image?.data?.attributes?.url) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${image.data.attributes.url}`;
    }
    // Direct URL
    if (image?.url) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${image.url}`;
    }
    if (typeof image === 'string' && image.startsWith('http')) return image;
    if (typeof image === 'string' && image.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${image}`;
    }
    // Fallback to defaults
    return '/images/img-whitePaper-1.jpg';
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

  const summaryText = resource?.SummaryLong || resource?.Summary || '';
  const metaSummary = summaryText ? (isHtmlContent(summaryText) ? stripHtml(summaryText) : stripMarkdown(summaryText)) : '';
  const metaDescription = metaSummary || (isHtmlContent(resource.Content) ? stripHtml(resource.Content) : stripMarkdown(resource.Content))?.substring(0, 160) || 'Read our resources from Emisha';

  const renderSummaryContent = (value) => {
    if (!value) return null;
    if (isHtmlContent(value)) {
      return (
        <div
          className="post-content ckeditor-content"
          style={{ marginBottom: '1.5rem' }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }
    return (
      <div className="post-content ckeditor-content" style={{ marginBottom: '1.5rem' }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </div>
    );
  };

  // Render a section specific to the resource type (white paper, case study, ebook, etc.)
  const renderResourceTypeSection = () => {
    const type = (resource?.ResourceType?.Slug || resource?.ResourceType?.Name || '')
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    const summary = resource?.SummaryLong || resource?.Summary || '';

    if (/white/.test(type)) {
      const ctaLabel = resource?.CTALabel || 'Download White Paper';
      const pdfUrl = resource?.PDF;
      return (
        <>
          <div className="row">
            <div className="col-md-12">
              {/* <h2><span>White Paper</span></h2>
              {summary && renderSummaryContent(summary)} */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {pdfUrl ? (
                <button type="button" className="btn btn-primary" onClick={() => { setPendingPdfUrl(pdfUrl); setDownloadError(""); setShowDownloadModal(true); }}>{ctaLabel}</button>
              ) : (
                <Link href="/contact" className="btn btn-primary">DOWNLOAD White Paper</Link>
              )}
            </div>
          </div>
        </>
      );
    }

    if (/case/.test(type) || /case-study/.test(type)) {
      return (
        <div className="row">
          <div className="col-md-12">
            {/* <h2><span>Case Study</span></h2>
            {summary && renderSummaryContent(summary)} */}
          </div>
        </div>
      );
    }

    if (/ebook/.test(type)) {
      const ctaLabel = resource?.CTALabel || 'Download Ebook';
      const pdfUrl = resource?.PDF;
      return (
        <>
          <div className="row">
            <div className="col-md-12">
              {/* <h2><span>Ebook</span></h2>
              {summary && renderSummaryContent(summary)} */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {pdfUrl ? (
                <button type="button" className="btn btn-primary" onClick={() => { setPendingPdfUrl(pdfUrl); setDownloadError(""); setShowDownloadModal(true); }}>{ctaLabel}</button>
              ) : (
                <Link href="/contact" className="btn btn-primary">DOWNLOAD EBOOK</Link>
              )}
            </div>
          </div>
        </>
      );
    }

    if (/video/.test(type) || /tutorial/.test(type)) {
      return (
        <div className="row">
          <div className="col-md-12">
            {/* <h2><span>Video Tutorial</span></h2>
            {summary && renderSummaryContent(summary)} */}
          </div>
        </div>
      );
    }

    if (/toolkit/.test(type)) {
      return (
        <div className="row">
          <div className="col-md-12">
            {/* <h2><span>Toolkit</span></h2>
            {summary && renderSummaryContent(summary)} */}
          </div>
        </div>
      );
    }

    if (/blog/.test(type)) {
      return (
        <div className="row">
          <div className="col-md-12">
            {/* <h2><span>Blog</span></h2>
            {summary && renderSummaryContent(summary)} */}
          </div>
        </div>
      );
    }

    if (/customer/.test(type) || /customer-story/.test(type)) {
      return (
        <div className="row">
          <div className="col-md-12">
            {/* <h2><span>Customer Story</span></h2>
            {summary && renderSummaryContent(summary)} */}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Head>

      </Head>

      <Layout
        pageTitle={resource.Title || 'Resource'}
        metaTitle={resource.Title || 'Resource'}
        metaDescription={metaDescription}
        metaKeywords={`${resource.Title}, Emisha resources, ${getResourceTypeName(resource)}`}
        socialTitle={resource.Title || 'Resource'}
        socialDescription={metaDescription}
        socialImage={getBannerImageUrl(resource)}
        socialUrl={`/resources/${resource.Slug}`}
      >
        <section className="sectionWrapper dynamicPage" id="resourcesPage" style={{ paddingBottom: '0px' }}>
          <div className="container">
            <div className="blogPageContent">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-11 text-center">
                  <h1 className="post-title">{resource.Title || 'Untitled'}</h1>
                  {/* <p className="post-desc">
                    {getResourceTypeName(resource)} {resource.PublishDate ? ' - ' + formatDate(resource.PublishDate) : ''}
                  </p> */}
                   <p className="post-desc">
                    {resource.PublishDate ? '  ' + formatDate(resource.PublishDate) : ''}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  {isVideoResource(resource) && (() => {
                    const src = getVideoSource(resource.VideoURL);
                    if (!src) return null;
                    return (
                      <div className="resource-video-wrapper mb-4">
                        <div className="ratio ratio-16x9">
                          {src.type === 'embed' ? (
                            <iframe
                              src={src.url}
                              title={resource.Title || 'Video'}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="border-0"
                            />
                          ) : (
                            <video
                              src={src.url}
                              controls
                              playsInline
                              className="border-0 w-100 h-100"
                              style={{ objectFit: 'contain' }}
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  {(!isVideoResource(resource) || !getVideoSource(resource.VideoURL)) && (
                    <div className="post-bannerNew imageContainer-framed">
                      <Image
                        src={getBannerImageUrl(resource)}
                        alt={resource.Title || 'Resource'}
                        width={1920}
                        height={1440}
                        className="img-fluid"
                      />
                      <span className="resource-categoryNewDetail">{getResourceTypeName(resource)}</span>
                    </div>
                  )}
                </div>
              </div>

              {summaryText && (
                <div className="row" id="summaryPara">
                  <div className="col-md-12">
                    {renderSummaryContent(summaryText)}
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-12">
                  {resource.Content && (
                    isHtmlContent(resource.Content) ? (
                      <div
                        className="post-content ckeditor-content"
                        dangerouslySetInnerHTML={{ __html: resource.Content }}
                      />
                    ) : (
                      <div className="post-content ckeditor-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{resource.Content}</ReactMarkdown>
                      </div>
                    )
                  )}
                </div>
              </div>


              {renderResourceTypeSection()}


            </div>



            {/* Related Articles */}
            {relatedResources && relatedResources.length > 0 && (
              <div className="relatedSection">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h2 className="gradientText">MORE FROM EMISHA</h2>
                  </div>
                </div>
                <div className="row">
                  {relatedResources.slice(0, 3).map((related, index) => (
                    <div key={related.id || index} className="col-md-4">
                      <Link href={`/resources/${related.Slug}`} className="resourceLink">
                        <div className="resourceCard">
                          <div className="imageContainer-related">
                            <Image
                              src={getBannerImageUrl(related)}
                              alt={related.Title || 'Related resource'}
                              width={960}
                              height={720}
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="card-title">{related.Title || 'Untitled'}</h3>
                          {/* <Link href={`/resources/${related.Slug}`} className="link-primary">
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

        {/* PDF download modal: name & email then download (same pattern as contact form) */}
        {showDownloadModal && (
          <>
            <div className="modal-backdrop fade show" aria-hidden="true" />
            <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} id="resourceDownloadModal" aria-modal="true" aria-labelledby="resourceDownloadModalLabel">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="resourceDownloadModalLabel">Download Resource</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => { setShowDownloadModal(false); setPendingPdfUrl(null); setDownloadError(""); }} />
                  </div>
                  <div className="modal-body">
                    <p className="card-Text mb-3">Please enter your details to download.</p>
                    {downloadError && <p className="text-danger small mb-2">{downloadError}</p>}
                    <Formik
                      initialValues={{ name: "", email: "" }}
                      validationSchema={DownloadModalSchema}
                      onSubmit={async (values, { resetForm, setSubmitting }) => {
                        setDownloadError("");
                        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_RESOURCE_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
                        const templateId = process.env.NEXT_PUBLIC_EMAILJS_RESOURCE_TEMPLATE_ID;
                        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_RESOURCE_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
                        if (!serviceId || !templateId || !publicKey) {
                          setDownloadError("Email service not configured. Please try again later.");
                          setSubmitting(false);
                          return;
                        }
                        const payload = {
                          user_name: values.name,
                          user_email: values.email,
                          resource_title: resource?.Title ?? "",
                          resource_type: resource?.ResourceType?.Name ?? "",
                          download_url: pendingPdfUrl ?? "",
                          page_url: typeof window !== "undefined" ? window.location.href : "",
                        };
                        try {
                          await emailjs.send(serviceId, templateId, payload, publicKey);
                        } catch (err) {
                          setDownloadError("Failed to send. Please try again.");
                          setSubmitting(false);
                          return;
                        }
                        if (pendingPdfUrl) {
                          try {
                            const res = await fetch(pendingPdfUrl, { mode: "cors" });
                            if (!res.ok) throw new Error("Fetch failed");
                            const blob = await res.blob();
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = (resource?.Title ? `${resource.Title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}.pdf` : "resource.pdf") || "resource.pdf";
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            URL.revokeObjectURL(url);
                          } catch (_) {
                            setDownloadError("Download failed. Please try again.");
                            setSubmitting(false);
                            return;
                          }
                        }
                        setShowDownloadModal(false);
                        setPendingPdfUrl(null);
                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className="row g-3">
                          <div className="col-12">
                            <label className="form-label">Name <span className="text-danger">*</span></label>
                            <Field name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                          </div>
                          <div className="col-12">
                            <label className="form-label">Email <span className="text-danger">*</span></label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                          </div>
                          <div className="col-12 text-end mt-2">
                            <button type="button" className="btn btn-secondary me-2" onClick={() => { setShowDownloadModal(false); setPendingPdfUrl(null); setDownloadError(""); }}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Download"}</button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}

// Generate all possible paths at build time
export async function getStaticPaths() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

    // Fetch all resources to get their slugs
    const resourcesRes = await fetch(`${strapiUrl}/api/resources?populate=*`);

    if (!resourcesRes.ok) {
      console.error('Failed to fetch resources for paths:', resourcesRes.status);
      return {
        paths: [],
        fallback: 'blocking' // Generate pages on-demand if not found at build time
      };
    }

    const resourcesData = await resourcesRes.json();

    // Extract slugs from resources
    let paths = [];

    if (resourcesData.data && Array.isArray(resourcesData.data)) {
      paths = resourcesData.data
        .map((item) => {
          const attributes = item.attributes || item;
          const slug = attributes.Slug || attributes.slug || attributes.Title || attributes.title || attributes.Name || attributes.name;
          return slug ? { params: { slug: slug.toString().trim() } } : null;
        })
        .filter(Boolean);
    } else if (Array.isArray(resourcesData)) {
      paths = resourcesData
        .map((item) => {
          const slug = item.Slug || item.slug || item.Title || item.title || item.Name || item.name;
          return slug ? { params: { slug: slug.toString().trim() } } : null;
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

// Fetch resource data for a specific slug
export async function getStaticProps({ params }) {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const { slug } = params;
    const slugEnc = encodeURIComponent(slug);

    // Fetch the specific resource by slug (no populate[PDF] here to avoid 404 if field missing in schema)
    const resourceRes = await fetch(
      `${strapiUrl}/api/resources?filters[Slug][$eq]=${slugEnc}&populate[ResourceType]=*&populate[Image]=*&populate[Banner]=*&populate[VideoURL]=*`
    );

    // If that doesn't work, try lowercase slug filter
    let resourceData = await resourceRes.json();

    if (!resourceRes.ok || !resourceData.data || resourceData.data.length === 0) {
      const altRes = await fetch(
        `${strapiUrl}/api/resources?filters[slug][$eq]=${slugEnc}&populate=*&populate[ResourceType]=*&populate[Image]=*`
      );
      if (altRes.ok) {
        resourceData = await altRes.json();
      }
    }

    // If still no data, try populate=*
    if (!resourceData.data || resourceData.data.length === 0) {
      const altRes = await fetch(
        `${strapiUrl}/api/resources?filters[Slug][$eq]=${slugEnc}&populate=*`
      );
      if (altRes.ok) {
        resourceData = await altRes.json();
      }
    }

    if (!resourceData.data || resourceData.data.length === 0) {
      return {
        notFound: true
      };
    }

    // Transform resource data
    const item = resourceData.data[0];
    const attributes = item.attributes || item;

    // Helper function to get nested value
    const getValue = (obj, ...keys) => {
      for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) {
          return obj[key];
        }
      }
      return null;
    };

    // Handle image/banner
    let bannerData = null;
    const banner = getValue(attributes, 'Image', 'image', 'Banner', 'banner', 'BannerImage', 'bannerImage');
    if (banner) {
      if (banner.data) {
        bannerData = banner.data;
      } else if (Array.isArray(banner) && banner.length > 0) {
        bannerData = banner[0];
      } else {
        bannerData = banner;
      }
    }

    // Handle PDF (media) and CTALabel for whitepaper/ebook download — same pattern as Image/Banner
    let pdfUrl = null;
    const pdfField = getValue(attributes, 'PDF', 'pdf');
    if (pdfField) {
      const data = pdfField?.data ?? pdfField;
      const attrs = data?.attributes ?? data;
      const url = attrs?.url ?? pdfField?.attributes?.url ?? pdfField?.url;
      if (url) {
        pdfUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
      }
    }
    const ctaLabel = getValue(attributes, 'CTALabel', 'ctaLabel', 'CTA_Label', 'cta_label') || 'Read More';

    // Handle VideoURL: string (YouTube, Vimeo, etc.) or Strapi media (uploaded file)
    let videoUrl = '';
    const videoField = getValue(attributes, 'VideoURL', 'videoUrl', 'VideoUrl', 'video_url');
    if (videoField) {
      if (typeof videoField === 'string') {
        videoUrl = videoField.trim();
        if (videoUrl && !videoUrl.startsWith('http') && videoUrl.startsWith('/')) {
          videoUrl = `${strapiUrl}${videoUrl}`;
        }
      } else {
        const data = videoField?.data ?? videoField;
        const attrs = data?.attributes ?? data;
        const url = attrs?.url ?? videoField?.attributes?.url ?? videoField?.url;
        if (url) {
          videoUrl = url.startsWith('http') ? url : `${strapiUrl}${url}`;
        }
      }
    }

    // Handle Resource Type
    let resourceTypeData = null;
    const typeField = getValue(attributes, 'ResourceType', 'resourceType', 'Type', 'type', 'Category', 'category');
    if (typeField) {
      if (typeField.data) {
        const td = Array.isArray(typeField.data) ? typeField.data[0] : typeField.data;
        const tAttrs = td?.attributes || td;
        if (tAttrs) {
          resourceTypeData = {
            Slug: tAttrs?.Slug || tAttrs?.slug || '',
            Name: tAttrs?.Name || tAttrs?.name || '',
            id: td?.id || tAttrs?.id || null
          };
        }
      } else if (typeField.attributes) {
        resourceTypeData = {
          Slug: typeField.attributes.Slug || typeField.attributes.slug || '',
          Name: typeField.attributes.Name || typeField.attributes.name || '',
          id: typeField.id || typeField.attributes.id || null
        };
      } else if (typeof typeField === 'object') {
        resourceTypeData = {
          Slug: typeField.Slug || typeField.slug || '',
          Name: typeField.Name || typeField.name || '',
          id: typeField.id || null
        };
      }
    }

    const resource = {
      id: item.id,
      Title: getValue(attributes, 'Title', 'title', 'Name', 'name') || '',
      Slug: getValue(attributes, 'Slug', 'slug') || getValue(attributes, 'Title', 'title', 'Name', 'name') || '',
      Summary: getValue(attributes, 'Summary', 'summary', 'Description', 'description') || '',
      SummaryLong: getValue(attributes, 'SummaryLong', 'summaryLong', 'Summary_Long', 'summary_long') || '',
      Content: getValue(attributes, 'Content', 'content', 'Body', 'body') || '',
      PublishDate: getValue(attributes, 'PublishDate', 'publishDate', 'PublishedAt', 'publishedAt', 'createdAt') || new Date().toISOString(),
      Banner: bannerData,
      Image: bannerData,
      ResourceType: resourceTypeData,
      PDF: pdfUrl,
      CTALabel: ctaLabel,
      VideoURL: videoUrl
    };

    // For whitepaper/ebook only: fetch PDF in a separate request so main fetches never 404
    const typeSlug = (resourceTypeData?.Slug || resourceTypeData?.Name || '').toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    if ((/white/.test(typeSlug) || /ebook/.test(typeSlug)) && item.id) {
      try {
        const pdfRes = await fetch(`${strapiUrl}/api/resources/${item.id}?populate[PDF]=*`);
        if (pdfRes.ok) {
          const pdfJson = await pdfRes.json();
          const pdfItem = pdfJson.data != null ? pdfJson.data : pdfJson;
          const pdfAttrs = pdfItem?.attributes || pdfItem;
          const pdfField = getValue(pdfAttrs, 'PDF', 'pdf');
          if (pdfField) {
            const data = pdfField?.data ?? pdfField;
            const attrs = data?.attributes ?? data;
            const url = attrs?.url ?? pdfField?.attributes?.url ?? pdfField?.url;
            if (url) {
              resource.PDF = url.startsWith('http') ? url : `${strapiUrl}${url}`;
            }
          }
        }
      } catch (_) {
        // leave resource.PDF as null
      }
    }

    // Try to resolve ResourceType details by fetching resource-types if missing
    try {
      const slugify = (s) => s ? s.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : '';
      const typesRes = await fetch(`${strapiUrl}/api/resource-types?populate=*`);
      if (typesRes.ok) {
        const typesData = await typesRes.json();
        if (process.env.NODE_ENV === 'development') {
          try { console.log('Resource Types API (detail page truncated):', JSON.stringify(typesData, null, 2).substring(0, 2000)); } catch (e) { }
        }

        const typesArray = Array.isArray(typesData.data) ? typesData.data : (Array.isArray(typesData) ? typesData : []);
        const resourceTypes = typesArray.map(t => {
          const ta = t.attributes || t;
          const name = ta?.Name || ta?.name || '';
          const rawSlug = ta?.Slug || ta?.slug || '';
          return {
            id: t.id || ta?.id || null,
            Name: name,
            Slug: slugify(rawSlug || name)
          };
        });

        // If ResourceType missing name/slug, try to find by id or by slug
        if (!resource.ResourceType || !resource.ResourceType.Name) {
          let found = null;

          // Try match by id first (if relation provided only as id)
          const rtId = resource.ResourceType?.id || null;
          if (rtId) {
            found = resourceTypes.find(r => String(r.id) === String(rtId));
          }

          // If not found, examine raw attributes for possible id or slug
          if (!found) {
            const rawType = getValue(attributes, 'ResourceType', 'resourceType', 'resource_type', 'Resource_Type', 'ResourceTypeId', 'resourceTypeId', 'resource_type_id');
            if (rawType) {
              // If rawType is object with data/attributes
              if (typeof rawType === 'object') {
                const td = rawType.data ? (Array.isArray(rawType.data) ? rawType.data[0] : rawType.data) : (rawType.attributes ? rawType.attributes : rawType);
                const rawId = td?.id || td?.attributes?.id || null;
                const rawSlug = td?.Slug || td?.slug || td?.Name || td?.name || '';
                if (rawId) found = resourceTypes.find(r => String(r.id) === String(rawId));
                if (!found && rawSlug) {
                  const norm = slugify(rawSlug);
                  found = resourceTypes.find(r => r.Slug === norm || slugify(r.Name) === norm);
                }
              } else if (typeof rawType === 'string' || typeof rawType === 'number') {
                const n = Number(rawType);
                if (!isNaN(n)) {
                  found = resourceTypes.find(r => String(r.id) === String(n));
                } else {
                  const norm = slugify(String(rawType));
                  found = resourceTypes.find(r => r.Slug === norm || slugify(r.Name) === norm);
                }
              }
            }

            // As extra measure, scan other attribute keys that might hold the type
            if (!found) {
              for (const key of Object.keys(attributes)) {
                if (/resource.*type/i.test(key)) {
                  const v = attributes[key];
                  if (v) {
                    if (typeof v === 'object') {
                      const td = v.data ? (Array.isArray(v.data) ? v.data[0] : v.data) : (v.attributes ? v.attributes : v);
                      const rawId = td?.id || null;
                      const rawSlug = td?.Slug || td?.slug || td?.Name || td?.name || '';
                      if (rawId) { found = resourceTypes.find(r => String(r.id) === String(rawId)); }
                      if (!found && rawSlug) { const norm = slugify(rawSlug); found = resourceTypes.find(r => r.Slug === norm || slugify(r.Name) === norm); }
                    } else if (typeof v === 'string' || typeof v === 'number') {
                      const n = Number(v);
                      if (!isNaN(n)) { found = resourceTypes.find(r => String(r.id) === String(n)); }
                      if (!found) { const norm = slugify(String(v)); found = resourceTypes.find(r => r.Slug === norm || slugify(r.Name) === norm); }
                    }
                  }
                }
                if (found) break;
              }
            }
          }

          if (found) {
            resource.ResourceType = { id: found.id, Name: found.Name, Slug: found.Slug };
          }
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('Resolved resource type for:', resource.Slug, '->', resource.ResourceType);
        }
      }
    } catch (e) {
      console.error('Error resolving resource types in detail page:', e);
    }

    // Fetch related resources (exclude current resource, get 3 most recent)
    let relatedResources = [];
    try {
      const relatedRes = await fetch(
        `${strapiUrl}/api/resources?filters[Slug][$ne]=${slug}&populate=*&sort=createdAt:desc&pagination[limit]=3`
      );

      if (relatedRes.ok) {
        const relatedData = await relatedRes.json();
        if (relatedData.data && Array.isArray(relatedData.data)) {
          relatedResources = relatedData.data.map((relItem) => {
            const relAttrs = relItem.attributes || relItem;
            const relBanner = getValue(relAttrs, 'Image', 'image', 'Banner', 'banner');
            let relBannerData = null;
            if (relBanner?.data) {
              relBannerData = relBanner.data;
            } else if (relBanner) {
              relBannerData = relBanner;
            }

            return {
              id: relItem.id,
              Title: getValue(relAttrs, 'Title', 'title', 'Name', 'name') || '',
              Slug: getValue(relAttrs, 'Slug', 'slug') || getValue(relAttrs, 'Title', 'title', 'Name', 'name') || '',
              Summary: getValue(relAttrs, 'Summary', 'summary') || '',
              SummaryLong: getValue(relAttrs, 'SummaryLong', 'summaryLong', 'Summary_Long', 'summary_long') || '',
              Banner: relBannerData
            };
          });
        }
      }
    } catch (error) {
      console.error('Error fetching related resources:', error);
    }

    return {
      props: {
        resource,
        relatedResources
      },
      revalidate: 10 // Revalidate every 60 seconds (ISR)
    };
  } catch (error) {
    console.error('Error fetching resource:', error);
    return {
      notFound: true
    };
  }
}

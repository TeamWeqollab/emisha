import Layout from "@/components/Layout.jsx";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ResourceDetail({ resource, relatedResources }) {
  const router = useRouter();

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

  const metaDescription = resource.Summary || (isHtmlContent(resource.Content) ? stripHtml(resource.Content) : stripMarkdown(resource.Content))?.substring(0, 160) || 'Read our resources from Emisha';


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
              <div className="col-md-12 col-lg-10 text-center">
                <h1 className="post-title">{resource.Title || 'Untitled'}</h1>
                <p className="post-desc">
                  {getResourceTypeName(resource)} {resource.PublishDate ? ' - ' + formatDate(resource.PublishDate) : ''}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="post-banner">
                  <Image
                    src={getBannerImageUrl(resource)}
                    alt={resource.Title || 'Resource'}
                    width={1422}
                    height={680}
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
                      <h2 className="card-title">{related.Title || 'Untitled'}</h2>
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

    // Fetch the specific resource by slug
    const resourceRes = await fetch(
      `${strapiUrl}/api/resources?filters[Slug][$eq]=${slug}&populate[ResourceType]=*&populate[Image]=*&populate[Banner]=*`
    );

    // If that doesn't work, try lowercase slug filter
    let resourceData = await resourceRes.json();
    
    if (!resourceRes.ok || !resourceData.data || resourceData.data.length === 0) {
      const altRes = await fetch(
        `${strapiUrl}/api/resources?filters[slug][$eq]=${slug}&populate=*&populate[ResourceType]=*&populate[Image]=*`
      );
      if (altRes.ok) {
        resourceData = await altRes.json();
      }
    }

    // If still no data, try populate=*
    if (!resourceData.data || resourceData.data.length === 0) {
      const altRes = await fetch(
        `${strapiUrl}/api/resources?filters[Slug][$eq]=${slug}&populate=*`
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
      Content: getValue(attributes, 'Content', 'content', 'Body', 'body') || '',
      PublishDate: getValue(attributes, 'PublishDate', 'publishDate', 'PublishedAt', 'publishedAt', 'createdAt') || new Date().toISOString(),
      Banner: bannerData,
      Image: bannerData,
      ResourceType: resourceTypeData
    };

    // Try to resolve ResourceType details by fetching resource-types if missing
    try {
      const slugify = (s) => s ? s.toString().toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\w-]+/g,'') : '';
      const typesRes = await fetch(`${strapiUrl}/api/resource-types?populate=*`);
      if (typesRes.ok) {
        const typesData = await typesRes.json();
        if (process.env.NODE_ENV === 'development') {
          try { console.log('Resource Types API (detail page truncated):', JSON.stringify(typesData, null, 2).substring(0,2000)); } catch(e){}
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

import Layout from "@/components/Layout.jsx";
import { useRef, useState, useMemo, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function Resources({ resources = [], resourceTypes = [] }) {
  const partnershipCarouselRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);

  const slugify = (s) => s ? s.toString().toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\w-]+/g,'') : '';

  // DEV: log fetched props in the browser console so you can inspect API payloads
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      try {
        console.log('Resources List Data:', resources);
        console.log('Resource Types category:', resourceTypes);
      } catch (e) {
        console.warn('Error logging resources props:', e);
      }
    }
  }, [resources, resourceTypes]);

  const filteredResources = useMemo(() => {
    if (!resources || resources.length === 0) return [];
    if (!selectedType) return resources;

    const selectedSlug = (selectedType || '').toString().trim().toLowerCase();

    return resources.filter(item => {
      const typeField = item.ResourceType || item.resourceType || item.Type || item.Category || (item.attributes && (item.attributes.ResourceType || item.attributes.resourceType || item.attributes.Type || item.attributes.Category));
      if (!typeField) return false;

      // Extract slug
      let itemTypeSlug = '';
      if (typeField.Slug) itemTypeSlug = typeField.Slug;
      else if (typeField.slug) itemTypeSlug = typeField.slug;
      else if (typeField.data) {
        const td = Array.isArray(typeField.data) ? typeField.data[0] : typeField.data;
        const tattrs = td?.attributes || td;
        itemTypeSlug = tattrs?.Slug || tattrs?.slug || '';
      } else if (typeField.attributes) {
        itemTypeSlug = typeField.attributes.Slug || typeField.attributes.slug || '';
      } else if (typeof typeField === 'string') {
        itemTypeSlug = typeField;
      }

      itemTypeSlug = slugify(itemTypeSlug);

      // Extract id (if relation not populated, this may be an id string)
      let itemTypeId = null;
      if (typeField.id) itemTypeId = typeField.id;
      else if (typeField.data) {
        const td = Array.isArray(typeField.data) ? typeField.data[0] : typeField.data;
        itemTypeId = td?.id || td?.attributes?.id || null;
      } else if (typeField.attributes && typeField.attributes.id) itemTypeId = typeField.attributes.id;

      const matchesSlug = (itemTypeSlug || '') === selectedSlug;
      const matchesId = itemTypeId && String(itemTypeId) === String(selectedType);

      return matchesSlug || matchesId;
    });
  }, [resources, selectedType]);

  const getImageUrl = (item) => {
    const image = item.Image || item.Banner || item.ImageResource || item.image || (item.attributes && (item.attributes.Image || item.attributes.image || item.attributes.Banner));
    if (!image) return '/images/img-whitePaper-1.jpg';
    if (image?.data?.attributes?.url) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${image.data.attributes.url}`;
    }
    if (image?.url) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return `${baseUrl}${image.url}`;
    }
    if (typeof image === 'string') {
      if (image.startsWith('http')) return image;
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      return image.startsWith('/') ? `${baseUrl}${image}` : image;
    }
    if (Array.isArray(image) && image.length > 0) {
      const first = image[0];
      if (first?.url) return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${first.url}`;
      if (first?.data?.attributes?.url) return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${first.data.attributes.url}`;
    }
    return '/images/img-whitePaper-1.jpg';
  };

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

      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

      <div className="bg-resources">

      <div className="innerBanner2">
        <div className="d-none d-md-block">
          <Image src="/images/banner-resources.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="d-md-none">
          <Image src="/images/banner-resources-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">Resources</h2>
                <p className="banner-desc">Expert insights and best practices to help you maximize your data&apos;s value.</p>
              </div>
            </div>
          </div>
        </div>
      </div>




      <section className="sectionWrapper" id="resourcesPage">
        <div className="container">


          {/* Resource Types */}
          <div className="row justify-content-center row-cols-2 row-cols-md-8 g-1 g-lg-3" id="catResources">
            <div className="col-auto">
              <button
                className={`btn btn-secondary btn-all ${!selectedType ? 'active' : ''}`}
                onClick={() => setSelectedType(null)}
              >
                All
              </button>
            </div>
            {resourceTypes && resourceTypes.length > 0 ? resourceTypes.map((type) => {
              const name = type.Name || type.name || '';
              const slugRaw = type.Slug || type.slug || '';
              const slug = slugify(slugRaw || name);
              return (
                <div className="col-auto" key={slug || type.id || name}>
                  <button
                    className={`btn btn-secondary ${(selectedType === slug || selectedType === String(type.id)) ? 'active' : ''}`}
                    onClick={() => setSelectedType(slug || String(type.id))}
                  >
                    {name || 'Unnamed'}
                  </button>
                </div>
              );
            }) : (
              <>
                {/* no resource types from API */}
              </>
            )}
          </div>




          {/* Resource List Grid */}
          <div className="row">
            {filteredResources && filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => {
                const slug = resource.Slug || resource.slug || slugify(resource.Title || resource.Name || '');
                return (
                  <div key={resource.id || index} className="col-md-4">
                    <Link href={slug ? `/resources/${slug}` : '/resources'} className="resourceLink">
                      <div className="resourceCard">
                        <div className="imageContainer">
                          <Image src={getImageUrl(resource)} alt={resource.Title || resource.Name || 'Resource'} width={960} height={720} className="img-fluid" />
                        </div>
                        <span className="badge bg-resoureceCat mb-2">{(() => {
                          const typeField = resource.ResourceType || resource.resourceType || resource.Type || resource.Category || (resource.attributes && (resource.attributes.ResourceType || resource.attributes.resourceType || resource.attributes.Type || resource.attributes.Category));
                          if (!typeField) return 'Resource Type';
                          if (typeof typeField === 'string') return typeField;
                          if (typeField.Name || typeField.name) return typeField.Name || typeField.name;
                          if (typeField.data) {
                            const td = Array.isArray(typeField.data) ? typeField.data[0] : typeField.data;
                            const tattrs = td?.attributes || td;
                            return tattrs?.Name || tattrs?.name || 'Resource Type';
                          }
                          if (typeField.attributes) return typeField.attributes.Name || typeField.attributes.name || 'Resource Type';
                          return 'Resource Type';
                        })()}</span>
                        <h2 className="card-title">{resource.Title || resource.Name || ''}</h2>
                        <span className="link-primary">Read More</span>
                        {/* <Link href={slug ? `/resources/${slug}` : '/resources'} className="link-primary">Read More</Link> */}
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p>No resources found for this selection.</p>
              </div>
            )}

          </div>


        </div>
      </section>


    </div>

    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

    // Fetch resources (explicitly populate relations first, fall back to populate=*)
    let resourcesRes = await fetch(`${strapiUrl}/api/resources?populate[ResourceType]=*&populate[Image]=*&populate[ImageResource]=*`);
    if (!resourcesRes.ok) {
      // fallback
      resourcesRes = await fetch(`${strapiUrl}/api/resources?populate=*`);
    }
    if (!resourcesRes.ok) {
      console.error('Failed to fetch resources:', resourcesRes.status, resourcesRes.statusText);
      throw new Error('Failed to fetch resources');
    }
    const resourcesData = await resourcesRes.json();

    if (process.env.NODE_ENV === 'development') {
      try {
        console.log('Resources API status:', resourcesRes?.status, resourcesRes?.statusText);
        console.log('Resources API response (truncated):', JSON.stringify(resourcesData, null, 2).substring(0, 2000));
      } catch (e) {
        console.log('Resources API log error:', e);
      }
    }

    // Fetch resource types (populate relations)
    let typesRes = await fetch(`${strapiUrl}/api/resource-types?populate=*`);
    let typesData = null;
    if (typesRes.ok) typesData = await typesRes.json();
    else {
      console.error('Failed to fetch resource types:', typesRes.status, typesRes.statusText);
      typesData = { data: [] };
    }

    if (process.env.NODE_ENV === 'development') {
      try {
        console.log('Resource Types API status:', typesRes?.status, typesRes?.statusText);
        console.log('Resource Types API response (truncated):', JSON.stringify(typesData, null, 2).substring(0, 2000));
      } catch (e) {
        console.log('Resource Types API log error:', e);
      }
    }

    // Helper to create a slug when Slug not provided
    const slugify = (s) => s ? s.toString().toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\w-]+/g,'') : '';

    const toArray = (payload) => {
      if (!payload) return [];
      if (Array.isArray(payload.data)) return payload.data;
      if (Array.isArray(payload)) return payload;
      if (payload.data && typeof payload.data === 'object') return [payload.data];
      if (payload.attributes) return [payload];
      // find first array
      for (const key in payload) {
        if (Array.isArray(payload[key])) return payload[key];
      }
      return [];
    };

    const resourcesArray = toArray(resourcesData);
    const resources = resourcesArray.map((item, index) => {
      const attributes = item.attributes || item;
      const getValue = (obj, ...keys) => {
        for (const key of keys) {
          if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
        }
        return null;
      };

      // Resource type relation (try many possible field names)
      const typeField = getValue(attributes, 'ResourceType', 'resourceType', 'resource_type', 'Resource_Type', 'Type', 'type', 'Category', 'category');
      let resourceType = null;
      if (typeField) {
        if (typeField.data) {
          const td = Array.isArray(typeField.data) ? typeField.data[0] : typeField.data;
          const tAttrs = td?.attributes || td;
          resourceType = {
            id: td?.id || tAttrs?.id || null,
            Slug: tAttrs?.Slug || tAttrs?.slug || '',
            Name: tAttrs?.Name || tAttrs?.name || ''
          };
        } else if (typeField.attributes) {
          resourceType = {
            id: typeField.id || typeField.attributes.id || null,
            Slug: typeField.attributes.Slug || typeField.attributes.slug || '',
            Name: typeField.attributes.Name || typeField.attributes.name || ''
          };
        } else if (typeof typeField === 'string' || typeof typeField === 'number') {
          resourceType = { id: typeField, Slug: typeField?.toString?.() || '', Name: '' };
        } else {
          resourceType = { Slug: typeField.Slug || typeField.slug || '', Name: typeField.Name || typeField.name || '' };
        }

        // Normalize / derive slug for robust matching
        if (resourceType) {
          if (!resourceType.Slug && resourceType.Name) resourceType.Slug = slugify(resourceType.Name);
          else resourceType.Slug = slugify(resourceType.Slug || '');
        }
      } else {
        // try to find an id in common fields when relation not populated
        const altId = getValue(attributes, 'resource_type_id', 'ResourceTypeId', 'resourceTypeId', 'resource_type', 'resourceType');
        if (altId && (typeof altId === 'number' || !isNaN(Number(altId)))) {
          resourceType = { id: Number(altId), Slug: '', Name: '' };
        }
      }

      const imageField = getValue(attributes, 'Image', 'image', 'Banner');
      let image = null;
      if (imageField) {
        if (imageField.data) image = imageField.data;
        else image = imageField;
      }

      const titleVal = getValue(attributes, 'Title', 'title', 'Name', 'name') || '';
      const rawSlug = getValue(attributes, 'Slug', 'slug') || '';
      return {
        id: item.id || index,
        Title: titleVal,
        Slug: rawSlug && rawSlug !== '' ? slugify(rawSlug) : slugify(titleVal),
        Summary: getValue(attributes, 'Summary', 'summary', 'Description', 'description') || '',
        Image: image,
        ResourceType: resourceType
      };
    });

    const typesArray = toArray(typesData);
    const resourceTypes = typesArray.map((item, index) => {
      const attributes = item.attributes || item;
      const name = attributes?.Name || attributes?.name || '';
      const rawSlug = attributes?.Slug || attributes?.slug || '';
      return {
        id: item.id || index,
        Name: name,
        Slug: rawSlug && rawSlug !== '' ? slugify(rawSlug) : slugify(name)
      };
    });

    // Try to resolve missing ResourceType details from resourceTypes list
    resources.forEach((res) => {
      if ((!res.ResourceType || (!res.ResourceType.Name && !res.ResourceType.Slug)) && res.ResourceType && res.ResourceType.id) {
        const match = resourceTypes.find(rt => String(rt.id) === String(res.ResourceType.id) || rt.Slug === slugify(res.ResourceType.Slug || res.ResourceType.Name || ''));
        if (match) {
          res.ResourceType = {
            id: match.id,
            Name: match.Name,
            Slug: match.Slug
          };
        }
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('Resources sample (post-resolve):', resources.slice(0,3).map(r => ({ id: r.id, Title: r.Title, ResourceType: r.ResourceType })));
      console.log('Resource types:', resourceTypes);

      const missingCount = resources.filter(r => !r.ResourceType || !r.ResourceType.Name).length;
      console.log('Resources missing ResourceType name:', missingCount);
    }

    return {
      props: {
        resources: resources || [],
        resourceTypes: resourceTypes || []
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching resources data:', error);
    return {
      props: {
        resources: [],
        resourceTypes: []
      },
      revalidate: 60
    };
  }
}

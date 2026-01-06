import Layout from "@/components/Layout.jsx";
import { useRef, useState, useMemo, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import 'react-multi-carousel/lib/styles.css';

import InnerBanner from "@/components/InnerBanner.jsx";

export default function News({ newsArticles, newsCategories }) {
  const partnershipCarouselRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('date-desc');

  // Development-only client logging for quick browser inspection
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Client: /api/news-articles ->', newsArticles || []);
      console.log('Client: /api/news-categories ->', newsCategories || []);
      if (newsArticles && newsArticles.length > 0) {
        console.log('Client sample article:', newsArticles[0]);
      }
      if (newsCategories && newsCategories.length > 0) {
        console.log('Client sample category:', newsCategories[0]);
      }
    }
  }, [newsArticles, newsCategories]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    if (!newsArticles || newsArticles.length === 0) {
      return [];
    }

    let filtered = [...newsArticles]; // Create a copy to avoid mutating original

    // Filter by search query (works in real-time as user types)
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(article => {
        const title = (article.Title || '').toLowerCase();
        const summary = (article.Summary || '').toLowerCase();
        const content = (article.Content || '').toLowerCase();
        return title.includes(query) || summary.includes(query) || content.includes(query);
      });
    }

    // Filter by category (works immediately on selection)
    if (selectedCategory && selectedCategory.trim() !== '') {
      const selectedSlug = selectedCategory.trim().toLowerCase();
      
      // Debug logging in development
      if (process.env.NODE_ENV === 'development' && filtered.length > 0) {
        console.log('Filtering by category:', selectedSlug);
        console.log('Sample article category structure:', filtered[0]?.Category);
      }
      
      filtered = filtered.filter(article => {
        if (!article.Category) {
          return false;
        }
        
        // Try multiple ways to get the category slug
        let articleCategorySlug = '';
        
        // Direct slug property (most common)
        if (article.Category.Slug) {
          articleCategorySlug = article.Category.Slug;
        } else if (article.Category.slug) {
          articleCategorySlug = article.Category.slug;
        }
        // If category is an object with nested data (Strapi v4 format)
        else if (article.Category.data) {
          const catData = article.Category.data;
          // Handle both single object and array
          const actualCatData = Array.isArray(catData) ? catData[0] : catData;
          articleCategorySlug = actualCatData?.attributes?.Slug || 
                               actualCatData?.attributes?.slug || 
                               actualCatData?.Slug || 
                               actualCatData?.slug || '';
        }
        // If category has attributes (Strapi v4 nested)
        else if (article.Category.attributes) {
          articleCategorySlug = article.Category.attributes.Slug || article.Category.attributes.slug || '';
        }
        // If category is just an ID, we can't filter by slug - skip this article
        else if (typeof article.Category === 'number' || typeof article.Category === 'string') {
          return false;
        }
        
        // Normalize and compare
        const normalizedSlug = (articleCategorySlug || '').toString().trim().toLowerCase();
        const matches = normalizedSlug === selectedSlug;
        
        // Debug logging in development
        if (process.env.NODE_ENV === 'development' && matches) {
          console.log('Category match found:', {
            articleTitle: article.Title,
            articleSlug: normalizedSlug,
            selectedSlug: selectedSlug
          });
        }
        
        return matches;
      });
    }

    // Sort articles (works immediately on selection)
    filtered.sort((a, b) => {
      switch (sortBy) {
        /*
        case 'popular':
          // (Temporarily disabled) Sort by PublishDate descending (newest first) as default popular
          const dateA = new Date(a.PublishDate || 0);
          const dateB = new Date(b.PublishDate || 0);
          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          return dateB.getTime() - dateA.getTime();
        */
        
        case 'date-desc':
          // Sort by date descending (newest first)
          const dateDescA = new Date(a.PublishDate || 0);
          const dateDescB = new Date(b.PublishDate || 0);
          if (isNaN(dateDescA.getTime()) && isNaN(dateDescB.getTime())) return 0;
          if (isNaN(dateDescA.getTime())) return 1;
          if (isNaN(dateDescB.getTime())) return -1;
          return dateDescB.getTime() - dateDescA.getTime();
        
        case 'date-asc':
          // Sort by date ascending (oldest first)
          const dateAscA = new Date(a.PublishDate || 0);
          const dateAscB = new Date(b.PublishDate || 0);
          if (isNaN(dateAscA.getTime()) && isNaN(dateAscB.getTime())) return 0;
          if (isNaN(dateAscA.getTime())) return 1;
          if (isNaN(dateAscB.getTime())) return -1;
          return dateAscA.getTime() - dateAscB.getTime();
        
        case 'title-asc':
          // Sort by title ascending (A-Z)
          const titleA = (a.Title || '').trim().toLowerCase();
          const titleB = (b.Title || '').trim().toLowerCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        
        case 'title-desc':
          // Sort by title descending (Z-A)
          const titleDescA = (a.Title || '').trim().toLowerCase();
          const titleDescB = (b.Title || '').trim().toLowerCase();
          if (titleDescA > titleDescB) return -1;
          if (titleDescA < titleDescB) return 1;
          return 0;
        
        default:
          // Default to popular (date descending)
          const defaultDateA = new Date(a.PublishDate || 0);
          const defaultDateB = new Date(b.PublishDate || 0);
          if (isNaN(defaultDateA.getTime()) && isNaN(defaultDateB.getTime())) return 0;
          if (isNaN(defaultDateA.getTime())) return 1;
          if (isNaN(defaultDateB.getTime())) return -1;
          return defaultDateB.getTime() - defaultDateA.getTime();
      }
    });

    return filtered;
  }, [newsArticles, searchQuery, selectedCategory, sortBy]);

  // Get featured articles (IsFeatured = true) - filtered by search and category, sorted by date descending
  const featuredArticles = useMemo(() => {
    if (!newsArticles || newsArticles.length === 0) {
      return [];
    }

    let featured = newsArticles.filter(article => article.IsFeatured);

    // Apply search filter to featured articles
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      featured = featured.filter(article => {
        const title = (article.Title || '').toLowerCase();
        const summary = (article.Summary || '').toLowerCase();
        const content = (article.Content || '').toLowerCase();
        return title.includes(query) || summary.includes(query) || content.includes(query);
      });
    }

    // Apply category filter to featured articles
    if (selectedCategory && selectedCategory.trim() !== '') {
      const selectedSlug = selectedCategory.trim().toLowerCase();
      featured = featured.filter(article => {
        if (!article.Category) {
          return false;
        }
        
        // Try multiple ways to get the category slug
        let articleCategorySlug = '';
        
        // Direct slug property (most common)
        if (article.Category.Slug) {
          articleCategorySlug = article.Category.Slug;
        } else if (article.Category.slug) {
          articleCategorySlug = article.Category.slug;
        }
        // If category is an object with nested data (Strapi v4 format)
        else if (article.Category.data) {
          const catData = article.Category.data;
          const actualCatData = Array.isArray(catData) ? catData[0] : catData;
          articleCategorySlug = actualCatData?.attributes?.Slug || 
                               actualCatData?.attributes?.slug || 
                               actualCatData?.Slug || 
                               actualCatData?.slug || '';
        }
        // If category has attributes (Strapi v4 nested)
        else if (article.Category.attributes) {
          articleCategorySlug = article.Category.attributes.Slug || article.Category.attributes.slug || '';
        }
        
        // Normalize and compare
        const normalizedSlug = (articleCategorySlug || '').toString().trim().toLowerCase();
        return normalizedSlug === selectedSlug;
      });
    }

    // Sort by date descending (newest first) for featured articles
    featured.sort((a, b) => {
      const dateA = new Date(a.PublishDate || 0);
      const dateB = new Date(b.PublishDate || 0);
      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      return dateB.getTime() - dateA.getTime();
    });

    // Return top 3 featured articles
    return featured.slice(0, 3);
  }, [newsArticles, searchQuery, selectedCategory]);

  // Get non-featured articles for the grid
  // If no featured articles exist, show all articles in grid
  // If all articles are featured, show them in grid too
  const gridArticles = useMemo(() => {
    if (!filteredArticles || filteredArticles.length === 0) {
      return [];
    }
    const nonFeatured = filteredArticles.filter(article => !article.IsFeatured);
    // If no non-featured articles but we have filtered articles, show all filtered articles
    if (nonFeatured.length === 0 && filteredArticles.length > 0) {
      return filteredArticles;
    }
    return nonFeatured;
  }, [filteredArticles]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get category name from article or by lookup
  const getCategoryName = (article) => {
    // First, try to get category name directly from article.Category (if populated)
    if (article?.Category?.Name) {
      return article.Category.Name;
    }
    if (article?.Category?.name) {
      return article.Category.name;
    }
    
    // If not available, try to find by slug
    const categorySlug = article?.Category?.Slug || article?.Category?.slug;
    if (categorySlug) {
      const category = newsCategories?.find(cat => 
        (cat.Slug || cat.slug)?.toLowerCase() === categorySlug.toLowerCase()
      );
      if (category) {
        return category.Name || category.name || '';
      }
    }
    
    // If we have a category ID but no name, try to find by ID
    const categoryId = article?.Category?.id;
    if (categoryId && newsCategories) {
      const category = newsCategories.find(cat => 
        (cat.id || cat.Id) == categoryId
      );
      if (category) {
        return category.Name || category.name || '';
      }
    }
    
    return '';
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
    // Fallback to default images
    const defaultImages = [
      '/images/img-news-1.jpg',
      '/images/img-news-2.jpg',
      '/images/img-news-3.jpg',
      '/images/img-news-4.jpg'
    ];
    // Use article index for consistent fallback
    const index = article.id ? parseInt(article.id) % defaultImages.length : 0;
    return defaultImages[index];
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
      socialUrl="/news"
    >




      {/* banner inner Section */}
      {/* <InnerBanner
        imageSrc="/images/banner-services.jpg"
        imageAlt="Services"
        title="Services"
      /> */}

      <div className="bg-news">

      <div className="innerBanner2">
      <div className="d-none d-md-block">
          <Image src="/images/banner-news.png" alt="Emisha" width={1920} height={465} className="img-fluid" />
        </div>
        <div className="d-md-none">
          <Image src="/images/banner-news-xs.png" alt="Emisha" width={800} height={600} className="img-fluid" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 col-xl-6 text-center">
              <div className="banner-details2">
                <h2 className="banner-title">News</h2>
              </div>
            </div>
          </div>
        </div>
      </div>



      




      <section className="newsSection">
        <div className="container">

        {/* Search section */}
          <div className="row justify-content-center" id="searchNews">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"> <i className="fa fa-search searchIcon"></i> </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="search news here..." 
                  aria-label="Search news" 
                  aria-describedby="basic-addon1"
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                  }}
                  onKeyDown={(e) => {
                    // Allow all keys including backspace, delete, etc.
                    e.stopPropagation();
                  }}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    style={{ borderLeft: 'none' }}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>


          {/* Latest News section */}
          {featuredArticles.length > 0 && (
            <div className="latestNews">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h2 className="newsHeading">LATEST</h2>
                </div>
              </div>
              <div className="row">
                {featuredArticles.map((article, index) => (
                  <div key={article.id || index} className="col-md-4">
                    <Link href={`/news/${article.Slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="card latestNewsCard">
                        <div className="imageContainer-latestNews position-relative">
                          <Image 
                            src={getBannerImageUrl(article)} 
                            alt={article.Title || 'News article'} 
                            width={480} 
                            height={360} 
                            className="img-fluid mask1" 
                          />
                          <div className="news-btn">
                            <span className="cardIcon">
                              <span className="arrow"></span>
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{article.Title || 'Untitled'}</h5>
                          <p className="card-date">
                            {getCategoryName(article) || 'News'}   -    {formatDate(article.PublishDate)}
                          </p>
                          <p className="card-text">{article.Summary || ''}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Filters */}
          <div className="row justify-content-between align-items-center mt-4">
            <div className="col-auto mb-3">
              {(searchQuery || selectedCategory) && (
                <span className="text-muted small">
                  Showing {filteredArticles.length} of {newsArticles?.length || 0} articles
                </span>
              )}
            </div>
            <div className="col-auto d-flex gap-lg-3">
              <span className="filters">
                <span>FILTER BY:{' '}</span>
                {newsCategories && newsCategories.length > 0 && (
                  <select 
                    className="form-select form-select-sm d-inline-block w-auto"
                    value={selectedCategory || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      const trimmedValue = value && value.trim() !== '' ? value.trim() : null;
                      setSelectedCategory(trimmedValue);
                      
                      // Debug logging in development
                      if (process.env.NODE_ENV === 'development') {
                        console.log('Category filter changed:', {
                          selectedValue: trimmedValue,
                          availableCategories: newsCategories.map(c => ({ slug: c.Slug, name: c.Name }))
                        });
                      }
                    }}
                    onClick={(e) => {
                      // Ensure click events work properly
                      e.stopPropagation();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">All Categories</option>
                    {newsCategories.map((category) => {
                      const categorySlug = category.Slug || category.slug || '';
                      return (
                        <option key={category.Slug || category.id || categorySlug} value={categorySlug}>
                          {category.Name || category.name || 'Unnamed Category'}
                        </option>
                      );
                    })}
                  </select>
                )}
              </span>
              <span className="sortBy">
                <span>SORT BY:{' '}</span>
                <select 
                  className="form-select form-select-sm d-inline-block w-auto"
                  value={sortBy}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSortBy(value || 'popular');
                  }}
                  onClick={(e) => {
                    // Ensure click events work properly
                    e.stopPropagation();
                  }}
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
                >
                  {/* <option value="popular">POPULAR</option> */}
                  <option value="date-desc">Date (Descending)</option>
                  <option value="date-asc">Date (Ascending)</option>
                  <option value="title-asc">Title (A-Z)</option>
                  <option value="title-desc">Title (Z-A)</option>
                </select>
              </span>
            </div>
          </div>


          {/* News Grid */}
          <div className="row mt-5">
            <div className="col-md-12">
              {gridArticles.length > 0 ? (
                gridArticles.map((article, index) => (
                  <div key={article.id || index} className="card newsCard">
                    <div className="row align-items-center g-0">
                      <div className="col-md-6 col-lg-6">
                        <div className="imageContainer-news">
                          <Image 
                            src={getBannerImageUrl(article)} 
                            alt={article.Title || 'News article'} 
                            width={1480} 
                            height={568} 
                            className="img-fluid" 
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="card-body">
                          <h3 className="card-title">{article.Title || 'Untitled'}</h3>
                          <p className="card-date">
                            {getCategoryName(article) || 'News'}   -    {formatDate(article.PublishDate)}
                          </p>
                          <p className="card-text">{article.Summary || ''}</p>
                          <Link href={`/news/${article.Slug}`} className="link-primary">Learn More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : newsArticles && newsArticles.length > 0 ? (
                <div className="text-center py-5">
                  <p>No articles match your filters. Try adjusting your search or category filter.</p>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p>No news articles found. Please check your API connection.</p>
                  <p className="text-muted small">Debug: Total articles received: {newsArticles?.length || 0}</p>
                </div>
              )}
            </div>
          </div>


          {/* Load More button - can be implemented with pagination later */}
          {/* <div className="row mt-5 mb-5">
            <div className="col-md-12">
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleLoadMore}>LOAD MORE</button>
              </div>
            </div>
          </div> */}

        </div>
      </section>


    </div>


    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    // Fetch news articles with Banner and Category populated
    // For Strapi v4, we need to explicitly populate relations
    // Try multiple populate formats to ensure Category is included
    
    // First, try with explicit Category populate (Strapi v4 format) and common variant field names
    let articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate[Category]=*&populate[news_category]=*&populate[news_categorie]=*&populate[Banner]=*`);

    // If initial attempt didn't succeed try other populate variants in order of likelihood
    if (!articlesRes.ok) {
      console.warn('populate[Category] request failed, trying populate[news_category]...');
      articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate[news_category]=*&populate[Banner]=*`);
    }

    if (!articlesRes.ok) {
      console.warn('populate[news_category] request failed, trying populate[NewsCategory]...');
      articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate[NewsCategory]=*&populate[Banner]=*`);
    }

    // Try lowercase 'category' next
    if (!articlesRes.ok) {
      console.warn('populate[NewsCategory] request failed, trying populate[category]...');
      articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate[category]=*&populate[Banner]=*`);
    }

    // Final fallback to wildcard
    if (!articlesRes.ok) {
      console.warn('populate[category] request failed, falling back to populate=*');
      articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate=*`);
    }

    if (!articlesRes.ok) {
      console.error('Failed to fetch articles:', articlesRes.status, articlesRes.statusText);
      throw new Error(`Failed to fetch articles: ${articlesRes.status}`);
    }

    let articlesData = await articlesRes.json();

    // Check if Category/news_category was populated - if not, try targeted populate for news_category specifically
    if (articlesData.data && articlesData.data.length > 0) {
      const firstArticle = articlesData.data[0];
      const attrs = firstArticle.attributes || {};
      const hasCategory = attrs.Category || attrs.category || attrs.news_category || attrs.news_categorie || attrs.newsCategory || attrs.newsCategorie || attrs.NewsCategory || attrs.News_Categorie;

      if (!hasCategory && process.env.NODE_ENV === 'development') {
        console.warn('Category not populated. Trying more targeted populate for news_category...');

        // Try several targeted populate queries to surface the relation
        const tries = [
          `${strapiUrl}/api/news-articles?populate[news_category]=*&populate[Banner]=*`,
          `${strapiUrl}/api/news-articles?populate[news_categorie]=*&populate[Banner]=*`,
          `${strapiUrl}/api/news-articles?populate[newsCategory]=*&populate[Banner]=*`,
          `${strapiUrl}/api/news-articles?populate[newsCategorie]=*&populate[Banner]=*`,
          `${strapiUrl}/api/news-articles?populate[NewsCategory]=*&populate[Banner]=*`,
          `${strapiUrl}/api/news-articles?populate[News_Categorie]=*&populate[Banner]=*`
        ];

        for (const url of tries) {
          try {
            const r = await fetch(url);
            if (r.ok) {
              const altData = await r.json();
              if (altData.data && altData.data.length > 0) {
                const altAttrs = altData.data[0].attributes || {};
                if (altAttrs.news_category || altAttrs.newsCategory || altAttrs.NewsCategory) {
                  articlesData = altData;
                  console.log('Found Category by targeted populate:', url);
                  break;
                }
              }
            }
          } catch (e) {
            // ignore and continue
          }
        }
      }
    }
    
    // Check for API errors
    if (articlesData.error) {
      console.error('Strapi API returned an error:', articlesData.error);
    }
    
    // Log the raw response for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Raw Articles API Response:', JSON.stringify(articlesData, null, 2).substring(0, 1000));
    }
    
    // Log for debugging (remove in production or use environment variable)
    if (process.env.NODE_ENV === 'development') {
      console.log('Articles API Response structure:', {
        hasData: !!articlesData.data,
        isArray: Array.isArray(articlesData.data),
        dataLength: articlesData.data?.length,
        keys: Object.keys(articlesData)
      });
      
      // Log first article to see Category structure
      if (articlesData.data && articlesData.data.length > 0) {
        const firstArticle = articlesData.data[0];
        const attrs = firstArticle.attributes || {};
        console.log('First article structure:', {
          id: firstArticle.id,
          hasAttributes: !!firstArticle.attributes,
          attributeKeys: Object.keys(attrs),
          categoryInAttributes: attrs.Category,
          categoryInAttributesLower: attrs.category,
          categoryInAttributesNews: attrs.news_category || attrs.newsCategory,
          fullAttributes: JSON.stringify(attrs, null, 2).substring(0, 500) // First 500 chars
        });
      }
    }

    // Fetch news categories
    const categoriesRes = await fetch(`${strapiUrl}/api/news-categories`);
    
    if (!categoriesRes.ok) {
      console.error('Failed to fetch categories:', categoriesRes.status, categoriesRes.statusText);
    }
    
    const categoriesData = await categoriesRes.json();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Categories API Response structure:', {
        hasData: !!categoriesData.data,
        isArray: Array.isArray(categoriesData.data),
        dataLength: categoriesData.data?.length,
        keys: Object.keys(categoriesData)
      });
    }

    // Transform articles data (handle Strapi response structure)
    let newsArticles = [];
    
    // Check if there's an error in the response
    if (articlesData.error) {
      console.error('Strapi API Error:', articlesData.error);
    }
    
    // Check if data exists in different possible locations
    let articlesArray = null;
    
    // Try multiple possible response structures
    if (articlesData.data !== undefined) {
      if (Array.isArray(articlesData.data)) {
        articlesArray = articlesData.data;
      } else if (articlesData.data && typeof articlesData.data === 'object') {
        articlesArray = [articlesData.data];
      }
    } else if (Array.isArray(articlesData)) {
      articlesArray = articlesData;
    } else if (articlesData.attributes) {
      // Single item response
      articlesArray = [articlesData];
    } else if (typeof articlesData === 'object' && articlesData !== null) {
      // Try to find any array in the response
      for (const key in articlesData) {
        if (Array.isArray(articlesData[key])) {
          articlesArray = articlesData[key];
          break;
        }
      }
    }
    
    if (!articlesArray || articlesArray.length === 0) {
      console.error('No articles array found in API response. Response structure:', {
        hasData: !!articlesData.data,
        isArray: Array.isArray(articlesData.data),
        topLevelKeys: Object.keys(articlesData),
        error: articlesData.error,
        message: articlesData.message,
        fullResponse: JSON.stringify(articlesData, null, 2).substring(0, 2000)
      });
    }
    
    if (articlesArray && articlesArray.length > 0) {
      newsArticles = articlesArray.map((item, index) => {
        // Handle different Strapi response structures
        const id = item.id || item.Id || index;
        const attributes = item.attributes || item;
        
        // Helper function to get nested value with multiple possible keys
        const getValue = (obj, ...keys) => {
          for (const key of keys) {
            if (obj && obj[key] !== undefined && obj[key] !== null) {
              return obj[key];
            }
          }
          return null;
        };
        
        // Handle Banner image - try multiple possible structures
        let bannerData = null;
        const banner = getValue(attributes, 'Banner', 'banner', 'BannerImage', 'bannerImage', 'Image', 'image');
        if (banner) {
          if (banner.data) {
            bannerData = banner.data;
          } else if (Array.isArray(banner) && banner.length > 0) {
            bannerData = banner[0];
          } else {
            bannerData = banner;
          }
        }
        
        // Handle Category - try multiple possible structures and field names
        let categoryData = null;
        
        // Try different possible field names for the category relation
        const category = getValue(
          attributes, 
          'Category', 
          'category', 
          'NewsCategory', 
          'newsCategory',
          'news_category',
          'news_categorie',
          'newsCategorie',
          'News_Category',
          'News_Categorie'
        );
        
        if (category) {
          // Strapi v4 format: category.data.attributes (populated relation)
          if (category.data) {
            const catData = Array.isArray(category.data) ? category.data[0] : category.data;
            const catAttrs = catData?.attributes || catData;
            if (catAttrs) {
              categoryData = {
                Slug: getValue(catAttrs, 'Slug', 'slug') || '',
                Name: getValue(catAttrs, 'Name', 'name') || '',
                id: catData?.id || catAttrs?.id || null
              };
            }
          } 
          // Strapi v4 nested: category.attributes (single populated relation)
          else if (category.attributes) {
            categoryData = {
              Slug: getValue(category.attributes, 'Slug', 'slug') || '',
              Name: getValue(category.attributes, 'Name', 'name') || '',
              id: category.id || category.attributes.id || null
            };
          } 
          // Direct object format (already populated)
          else if (typeof category === 'object' && category !== null) {
            categoryData = {
              Slug: getValue(category, 'Slug', 'slug') || '',
              Name: getValue(category, 'Name', 'name') || '',
              id: category.id || null
            };
          }
          // Category is just an ID (not populated) - we'll look it up later
          else if (typeof category === 'number' || (typeof category === 'string' && !isNaN(category))) {
            categoryData = {
              id: parseInt(category),
              Slug: '',
              Name: ''
            };
          }
        }

        // Fallback: try common alt id fields when relation not populated
        if (!categoryData) {
          const altId = getValue(attributes, 'category_id', 'CategoryId', 'categoryId', 'news_category_id', 'NewsCategoryId', 'category');
          if (altId && (typeof altId === 'number' || !isNaN(Number(altId)))) {
            categoryData = { id: Number(altId), Slug: '', Name: '' };
          }
        }
        
        // Log if category is missing (for debugging)
        if (process.env.NODE_ENV === 'development' && index === 0) {
          console.log('Category extraction result:', {
            articleId: id,
            articleTitle: getValue(attributes, 'Title', 'title'),
            categoryFound: !!category,
            categoryValue: category,
            categoryData: categoryData,
            availableKeys: Object.keys(attributes)
          });
        }
        
        return {
          id: id,
          Title: getValue(attributes, 'Title', 'title') || '',
          Slug: getValue(attributes, 'Slug', 'slug') || '',
          Summary: getValue(attributes, 'Summary', 'summary', 'Description', 'description') || '',
          Content: getValue(attributes, 'Content', 'content', 'Body', 'body') || '',
          PublishDate: getValue(attributes, 'PublishDate', 'publishDate', 'PublishedAt', 'publishedAt', 'createdAt', 'CreatedAt', 'updatedAt', 'UpdatedAt') || new Date().toISOString(),
          IsFeatured: getValue(attributes, 'IsFeatured', 'isFeatured', 'Featured', 'featured') !== undefined 
            ? (getValue(attributes, 'IsFeatured', 'isFeatured', 'Featured', 'featured') === true || getValue(attributes, 'IsFeatured', 'isFeatured', 'Featured', 'featured') === 'true')
            : false,
          Banner: bannerData,
          Category: categoryData
        };
      });
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Transformed Articles:', newsArticles.length, 'articles found');
    }

    // Transform categories data (handle Strapi response structure)
    let newsCategories = [];
    
    // Check if there's an error in the response
    if (categoriesData.error) {
      console.error('Strapi Categories API Error:', categoriesData.error);
    }
    
    let categoriesArray = null;
    
    // Try multiple possible response structures
    if (categoriesData.data !== undefined) {
      if (Array.isArray(categoriesData.data)) {
        categoriesArray = categoriesData.data;
      } else if (categoriesData.data && typeof categoriesData.data === 'object') {
        categoriesArray = [categoriesData.data];
      }
    } else if (Array.isArray(categoriesData)) {
      categoriesArray = categoriesData;
    } else if (categoriesData.attributes) {
      categoriesArray = [categoriesData];
    } else if (typeof categoriesData === 'object' && categoriesData !== null) {
      // Try to find any array in the response
      for (const key in categoriesData) {
        if (Array.isArray(categoriesData[key])) {
          categoriesArray = categoriesData[key];
          break;
        }
      }
    }
    
    if (categoriesArray && categoriesArray.length > 0) {
      newsCategories = categoriesArray.map((item, index) => {
        const attributes = item.attributes || item;
        
        // Helper function to get nested value with multiple possible keys
        const getValue = (obj, ...keys) => {
          for (const key of keys) {
            if (obj && obj[key] !== undefined && obj[key] !== null) {
              return obj[key];
            }
          }
          return null;
        };
        
        return {
          id: item.id || item.Id || index,
          Name: getValue(attributes, 'Name', 'name') || '',
          Slug: getValue(attributes, 'Slug', 'slug') || '',
          Description: getValue(attributes, 'Description', 'description') || ''
        };
      });
    } else {
      console.error('No categories array found in API response. Response structure:', Object.keys(categoriesData));
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Transformed Categories:', newsCategories.length, 'categories found');
    }

    // Resolve missing Category details on articles by looking up newsCategories and inspecting the raw API items
    const slugify = (s) => s ? s.toString().toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\w-]+/g,'') : '';
    if (newsArticles && newsArticles.length > 0 && newsCategories && newsCategories.length > 0) {
      const beforeMissing = newsArticles.filter(a => !a.Category || !a.Category.Name).length;

      const extractCategoryIdFromRaw = (rawItem) => {
        if (!rawItem) return null;
        const attrs = rawItem.attributes || rawItem;

        const tryFromObj = (obj) => {
          if (!obj) return null;
          // Strapi v4 populated relation: obj.data may be object or array
          if (obj.data) {
            const d = Array.isArray(obj.data) ? obj.data[0] : obj.data;
            if (d?.id) return d.id;
            if (d?.attributes?.id) return d.attributes.id;
          }
          if (obj.id) return obj.id;
          if (typeof obj === 'number') return obj;
          if (typeof obj === 'string' && !isNaN(obj)) return Number(obj);
          return null;
        };

        // Common fields to inspect
        const fields = ['Category', 'category', 'NewsCategory', 'newsCategory', 'news_category', 'news_categorie', 'newsCategorie', 'News_Category', 'News_Categorie'];
        for (const f of fields) {
          const v = attrs[f];
          const id = tryFromObj(v);
          if (id) return id;
        }

        // Alt id fields
        const altId = attrs.category_id || attrs.CategoryId || attrs.categoryId || attrs.news_category_id || attrs.NewsCategoryId || attrs.newsCategoryId;
        if (altId && (typeof altId === 'number' || !isNaN(Number(altId)))) return Number(altId);

        return null;
      };

      newsArticles.forEach((article) => {
        let resolved = false;

        // If category exists but only has an id, or has missing name/slug
        if (article.Category && (article.Category.id || article.Category.id === 0) && (!article.Category.Name || !article.Category.Slug)) {
          const match = newsCategories.find(cat => String(cat.id) === String(article.Category.id) || slugify(cat.Slug || cat.Name || '') === slugify(article.Category.Slug || article.Category.Name || ''));
          if (match) {
            article.Category = { id: match.id, Name: match.Name, Slug: match.Slug };
            resolved = true;
          }
        }

        // If category stored as a raw id value (e.g., Category: 3)
        if (!resolved && (article.Category && (typeof article.Category === 'number' || !isNaN(Number(article.Category))))) {
          const match = newsCategories.find(cat => String(cat.id) === String(article.Category));
          if (match) {
            article.Category = { id: match.id, Name: match.Name, Slug: match.Slug };
            resolved = true;
          }
        }

        // Try to resolve by inspecting the raw API response for this article
        if (!resolved) {
          const raw = typeof articlesArray !== 'undefined' ? articlesArray.find(it => String(it.id || it.Id) === String(article.id)) : null;
          const candidateId = extractCategoryIdFromRaw(raw);
          if (candidateId) {
            const match = newsCategories.find(cat => String(cat.id) === String(candidateId));
            if (match) {
              article.Category = { id: match.id, Name: match.Name, Slug: match.Slug };
              resolved = true;
            }
          }
        }

        // Fallback: try matching by slug/name if some slug-like value exists
        if (!resolved && article.Category && (article.Category.Slug || article.Category.slug || article.Category.Name)) {
          const slugVal = slugify(article.Category.Slug || article.Category.slug || article.Category.Name || '');
          if (slugVal) {
            const match = newsCategories.find(cat => slugify(cat.Slug || cat.Name || '') === slugVal);
            if (match) article.Category = { id: match.id, Name: match.Name, Slug: match.Slug };
          }
        }
      });

      const afterMissing = newsArticles.filter(a => !a.Category || !a.Category.Name).length;
      if (process.env.NODE_ENV === 'development') {
        console.log(`Resolved ${beforeMissing - afterMissing} article categories from categories list (including raw-item lookup).`);
      }
    }

    return {
      props: {
        newsArticles: newsArticles || [],
        newsCategories: newsCategories || []
      },
      revalidate: 60 // Revalidate every 60 seconds (ISR)
    };
  } catch (error) {
    console.error('Error fetching news data:', error);
    return {
      props: {
        newsArticles: [],
        newsCategories: []
      },
      revalidate: 60
    };
  }
}


// Quick test script to check API responses
// Run with: node test-api.js

const strapiUrl = 'http://localhost:1337';

async function testAPIs() {
  try {
    console.log('Testing News Articles API...');
    const articlesRes = await fetch(`${strapiUrl}/api/news-articles?populate=*`);
    const articlesData = await articlesRes.json();
    
    console.log('\n=== Articles API Response ===');
    console.log('Status:', articlesRes.status);
    console.log('Has data property:', !!articlesData.data);
    console.log('Data type:', Array.isArray(articlesData.data) ? 'Array' : typeof articlesData.data);
    console.log('Data length:', articlesData.data?.length || 'N/A');
    console.log('Top level keys:', Object.keys(articlesData));
    
    if (articlesData.data && articlesData.data.length > 0) {
      console.log('\nFirst article structure:');
      console.log('ID:', articlesData.data[0].id);
      console.log('Has attributes:', !!articlesData.data[0].attributes);
      if (articlesData.data[0].attributes) {
        console.log('Attribute keys:', Object.keys(articlesData.data[0].attributes));
        console.log('Title field:', articlesData.data[0].attributes.Title || articlesData.data[0].attributes.title || 'NOT FOUND');
        console.log('Slug field:', articlesData.data[0].attributes.Slug || articlesData.data[0].attributes.slug || 'NOT FOUND');
      }
    }
    
    console.log('\n\nTesting News Categories API...');
    const categoriesRes = await fetch(`${strapiUrl}/api/news-categories`);
    const categoriesData = await categoriesRes.json();
    
    console.log('\n=== Categories API Response ===');
    console.log('Status:', categoriesRes.status);
    console.log('Has data property:', !!categoriesData.data);
    console.log('Data type:', Array.isArray(categoriesData.data) ? 'Array' : typeof categoriesData.data);
    console.log('Data length:', categoriesData.data?.length || 'N/A');
    console.log('Top level keys:', Object.keys(categoriesData));
    
    if (categoriesData.data && categoriesData.data.length > 0) {
      console.log('\nFirst category structure:');
      console.log('ID:', categoriesData.data[0].id);
      console.log('Has attributes:', !!categoriesData.data[0].attributes);
      if (categoriesData.data[0].attributes) {
        console.log('Attribute keys:', Object.keys(categoriesData.data[0].attributes));
        console.log('Name field:', categoriesData.data[0].attributes.Name || categoriesData.data[0].attributes.name || 'NOT FOUND');
        console.log('Slug field:', categoriesData.data[0].attributes.Slug || categoriesData.data[0].attributes.slug || 'NOT FOUND');
      }
    }
    
  } catch (error) {
    console.error('Error testing APIs:', error.message);
  }
}

testAPIs();


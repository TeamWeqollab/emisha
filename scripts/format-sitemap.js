const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.log('[format-sitemap] sitemap.xml not found, skipping.');
  process.exit(0);
}

const raw = fs.readFileSync(sitemapPath, 'utf8');

function formatXml(xml) {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  // Split on tags while keeping them
  const tokens = xml.replace(/>\s*</g, '><').split(/(<[^>]+>)/g);

  for (const token of tokens) {
    if (!token.trim()) continue;

    if (token.startsWith('</')) {
      // Closing tag — dedent first
      indent--;
      formatted += tab.repeat(indent) + token + '\n';
    } else if (token.startsWith('<?') || token.startsWith('<!')) {
      // Declaration / doctype
      formatted += token + '\n';
    } else if (token.startsWith('<') && !token.endsWith('/>')) {
      // Opening tag
      formatted += tab.repeat(indent) + token + '\n';
      indent++;
    } else if (token.startsWith('<') && token.endsWith('/>')) {
      // Self-closing tag
      formatted += tab.repeat(indent) + token + '\n';
    } else {
      // Text content — attach to current indent level
      formatted += tab.repeat(indent) + token.trim() + '\n';
    }
  }

  return formatted.trim();
}

const pretty = formatXml(raw);
fs.writeFileSync(sitemapPath, pretty, 'utf8');
console.log('[format-sitemap] sitemap.xml formatted successfully.');

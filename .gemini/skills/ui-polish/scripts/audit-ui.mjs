#!/usr/bin/env node
/**
 * UI-Polish Fast Auditor CLI (All-in-One Production Engine)
 * Features:
 * - Semantic Heading Hierarchy & SEO/AEO/GEO Outline
 * - Page Speed & Core Web Vitals (TTFB, LCP Preload, Non-blocking JS, Lazy Loading)
 * - Hallmark Design & UI Craft Gates (Design Tokens, Hardcoded Colors, Emojis, Focus States)
 * - Multilingual AI Slop & AI Fingerprint Detection (English, Bengali, Hindi, Spanish, French, German)
 * - Cross-Page Duplicate Content, Matching Paragraphs & Cannibalization Detection
 * - Page-to-Page Internal Linking, Anchor Text Audit, Orphan Page & Broken Link Detection
 * - E-E-A-T Trust Signals (Outdated Copyright, Contact Pathways, Essential Trust Pages)
 * - Schema.org JSON-LD Structured Data Validation & Auto-Injection (--fix)
 * - Auto-Fix Mode (--fix) for patching common issues automatically
 * - CI/CD Export (--json, --markdown)
 */

import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

const args = process.argv.slice(2);
const isFix = args.includes('--fix');
const isJson = args.includes('--json');
const isMarkdown = args.includes('--markdown');
const nonFlagArgs = args.filter(a => !a.startsWith('--'));

if (nonFlagArgs.length === 0) {
  console.log(`
Usage:
  node audit-ui.mjs <file-path-or-dir-or-URL> [options]

Options:
  --fix        Automatically repair common HTML/CSS issues in local files
  --json       Output report as structured JSON
  --markdown   Output report formatted as GitHub Flavored Markdown

Examples:
  node audit-ui.mjs index.html
  node audit-ui.mjs index.html about.html --json
  node audit-ui.mjs src/components --fix
  node audit-ui.mjs https://example.com
  `);
  process.exit(1);
}

function auditHtmlContent(content, filename, networkStats = null) {
  const violations = [];
  const passes = [];
  const speedMetrics = [];
  let modifiedContent = content;
  let fixCount = 0;

  if (networkStats) {
    speedMetrics.push(`Server Response (TTFB): ${networkStats.ttfb.toFixed(1)}ms`);
    speedMetrics.push(`HTML Document Size: ${(networkStats.size / 1024).toFixed(1)} KB`);
  }

  // =========================================================================
  // 1. Semantic Headings & SEO/AEO/GEO Hierarchy
  // =========================================================================
  const headingRegex = /<h([1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      tag: `h${match[1]}`,
      text: match[2].replace(/<[^>]*>/g, '').trim(),
      index: match.index
    });
  }

  const h1List = headings.filter(h => h.level === 1);
  const h1Count = h1List.length;
  if (h1Count === 0) {
    violations.push({ type: 'SEO / Hierarchy', msg: 'Missing <h1> tag. Every page/template must have exactly one <h1>.' });
  } else if (h1Count > 1) {
    violations.push({ type: 'SEO / Hierarchy', msg: `Multiple <h1> tags detected (${h1Count} found). Exactly one <h1> is allowed.` });
  } else {
    passes.push(`Exactly one <h1> tag found: "${h1List[0].text.slice(0, 50)}"`);
  }

  for (let i = 0; i < headings.length - 1; i++) {
    const curr = headings[i].level;
    const next = headings[i + 1].level;
    if (next > curr + 1) {
      violations.push({
        type: 'Accessibility (WCAG)',
        msg: `Skipped heading level from <h${curr}> ("${headings[i].text.slice(0, 30)}...") directly to <h${next}> ("${headings[i+1].text.slice(0, 30)}...").`
      });
    }
  }

  headings.forEach(h => {
    if (!h.text) {
      violations.push({ type: 'Semantic HTML', msg: `Empty <${h.tag}> tag detected.` });
    }
  });

  // =========================================================================
  // 2. Page Speed, Media & Core Web Vitals
  // =========================================================================
  const imgRegex = /<img(?:\s+[^>]*)?>/gi;
  let imgMatch;
  let imgCount = 0;
  while ((imgMatch = imgRegex.exec(content)) !== null) {
    imgCount++;
    const tag = imgMatch[0];
    const hasWidth = /width\s*=/i.test(tag);
    const hasHeight = /height\s*=/i.test(tag);
    const hasAspect = /aspect-/i.test(tag);
    const hasLazy = /loading\s*=\s*["']lazy["']/i.test(tag);

    if (!hasAspect && (!hasWidth || !hasHeight)) {
      violations.push({
        type: 'Performance (CLS)',
        msg: `Image #${imgCount} missing width/height attributes or aspect-ratio class: ${tag.slice(0, 60)}...`
      });
    }

    if (imgCount === 1 && hasLazy) {
      violations.push({
        type: 'Page Speed (LCP Delay)',
        msg: `First image (likely hero/LCP) is lazy-loaded! Remove loading="lazy" and add fetchpriority="high".`
      });
      if (isFix) {
        modifiedContent = modifiedContent.replace(tag, tag.replace(/loading\s*=\s*["']lazy["']/i, 'fetchpriority="high"'));
        fixCount++;
      }
    }

    if (imgCount > 1 && !hasLazy) {
      violations.push({
        type: 'Page Speed (Lazy Load)',
        msg: `Image #${imgCount} below the fold is missing loading="lazy": ${tag.slice(0, 50)}...`
      });
      if (isFix) {
        const fixedTag = tag.replace(/<img\s+/i, '<img loading="lazy" decoding="async" ');
        modifiedContent = modifiedContent.replace(tag, fixedTag);
        fixCount++;
      }
    }

    if (/\.(png|jpe?g)\b/i.test(tag) && !/format=webp/i.test(tag)) {
      violations.push({
        type: 'Page Speed (Modern Formats)',
        msg: `Image #${imgCount} uses legacy PNG/JPG format. Consider WebP or AVIF for 30-50% smaller file size.`
      });
    }
  }

  const scriptRegex = /<script(?:\s+[^>]*)?>[\s\S]*?<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(content)) !== null) {
    const sTag = scriptMatch[0];
    const isExternal = /src\s*=/i.test(sTag);
    const hasDeferOrAsync = /defer|async|type\s*=\s*["']module["']/i.test(sTag);
    if (isExternal && !hasDeferOrAsync) {
      violations.push({
        type: 'Page Speed (Render Blocking JS)',
        msg: `Synchronous render-blocking script tag detected: ${sTag.slice(0, 60)}... Add defer, async, or type="module".`
      });
      if (isFix) {
        const fixedScript = sTag.replace(/<script\s+/i, '<script defer ');
        modifiedContent = modifiedContent.replace(sTag, fixedScript);
        fixCount++;
      }
    }
  }

  if (/fonts\.googleapis\.com/i.test(content) && !/display=swap/i.test(content)) {
    violations.push({
      type: 'Page Speed (Font FOIT)',
      msg: 'Google Font link missing &display=swap parameter. Fonts may block text rendering on initial load.'
    });
    if (isFix) {
      modifiedContent = modifiedContent.replace(/(fonts\.googleapis\.com\/css2\?[^"']+)/gi, '$1&display=swap');
      fixCount++;
    }
  }

  // =========================================================================
  // 3. Hallmark Design & UI Craft Gates
  // =========================================================================
  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}★☆🥇🥈🥉]/u;
  const linkOrBtnRegex = /<(a|button|h[1-6]|label)[^>]*>([\s\S]*?)<\/\1>/gi;
  let elMatch;
  let emojiFlaggedCount = 0;
  while ((elMatch = linkOrBtnRegex.exec(content)) !== null) {
    const elText = elMatch[2].replace(/<[^>]*>/g, '').trim();
    if (emojiRegex.test(elText) && emojiFlaggedCount < 3) {
      emojiFlaggedCount++;
      violations.push({
        type: 'Hallmark Craft (Emoji as Icon)',
        msg: `Raw emoji detected in <${elMatch[1]}>: "${elText.slice(0, 50)}". Replace with a professional SVG icon or icon library (Lucide/Heroicons).`
      });
    }
  }

  const inlineStyleRegex = /style\s*=\s*["'][^"']*(?:#[0-9a-f]{3,8}|rgba?\([^)]+\))[^"']*["']/gi;
  let inlineColorMatch;
  let inlineColorCount = 0;
  while ((inlineColorMatch = inlineStyleRegex.exec(content)) !== null) {
    inlineColorCount++;
  }
  if (inlineColorCount > 0) {
    violations.push({
      type: 'Hallmark Tokens (Hardcoded Colors)',
      msg: `${inlineColorCount} hardcoded color literal(s) found in inline style attributes. Lift them into CSS variables declared at :root.`
    });
  }

  if (/overflow-x\s*:\s*hidden/i.test(content)) {
    violations.push({
      type: 'Hallmark Layout (Sticky Bug)',
      msg: 'Detected `overflow-x: hidden` in CSS or inline style. This breaks `position: sticky`. Use `overflow-x: clip` instead.'
    });
    if (isFix) {
      modifiedContent = modifiedContent.replace(/overflow-x\s*:\s*hidden/gi, 'overflow-x: clip');
      fixCount++;
    }
  }

  if (/<a[^>]*>[^<]*?(?:→|➔|➜|&rarr;)[^<]*?<\/a>/iu.test(content)) {
    violations.push({
      type: 'Hallmark Typography (Glued Arrow)',
      msg: 'Arrow glued directly to link label text (e.g. "Text →"). Use a clean verb or separate icon container.'
    });
    if (isFix) {
      modifiedContent = modifiedContent.replace(/(<a[^>]*>[^<]*?)\s*(?:→|➔|➜|&rarr;)([^<]*?<\/a>)/gi, '$1$2');
      fixCount++;
    }
  }

  const hasInteractive = /<(button|input|select|textarea|a\s+[^>]*href)/i.test(content);
  const hasFocusVisible = /:focus-visible/i.test(content);
  if (hasInteractive && !hasFocusVisible && !/tailwindcss/i.test(content)) {
    violations.push({
      type: 'Hallmark Accessibility (Focus Ring)',
      msg: 'Interactive controls found but no `:focus-visible` styling detected. Keyboard navigation will lack visible focus rings.'
    });
  }

  // Weak / Lazy CTA Button Detection (Conversion Copywriting)
  const btnTagRegex = /<(button|a(?:\s+[^>]*class=["'][^"']*(?:btn|button)[^"']*["'])?)[^>]*>([\s\S]*?)<\/\1>/gi;
  let btnMatch;
  while ((btnMatch = btnTagRegex.exec(content)) !== null) {
    const rawBtnText = btnMatch[2].replace(/<[^>]*>/g, '').trim();
    if (/^(?:submit|click\s+here|click\s+me|send|go|continue|submit\s+form|ক্লিক\s*করুন|জমা\s*দিন)$/iu.test(rawBtnText)) {
      violations.push({
        type: 'Conversion Copy (Weak CTA)',
        msg: `Generic/lazy CTA label "${rawBtnText}" detected in <${btnMatch[1]}>. Replace with an Action + Value label (e.g. "Get Started Free", "Claim Free Account", "Download Playbook").`
      });
    }
  }

  // Negation List Ban Detection (e.g. "no setup fees, no waiting, no credit card, no hassle")
  const negationListRegex = /\b(?:no\s+[\w\s]{2,25},\s*){2,}(?:and\s+)?no\s+[\w\s]{2,25}\b/gi;
  let negMatch;
  while ((negMatch = negationListRegex.exec(content)) !== null) {
    violations.push({
      type: 'Conversion Copy (Negation List Ban)',
      msg: `Defensive negation list detected: "${negMatch[0].slice(0, 60)}...". Replace with positive capability copy stating what does happen.`
    });
  }

  // =========================================================================
  // 4. Dark & Light Mode Architecture & Accessibility Audit
  // =========================================================================
  const hasDarkMode = /prefers-color-scheme\s*:\s*dark|\.dark\b|dark:|data-theme\s*=\s*["']dark["']/i.test(content);

  if (hasDarkMode) {
    passes.push('Dual theme support detected (Dark & Light Mode architecture present).');

    const blackTextRegex = /style\s*=\s*["'][^"']*\bcolor\s*:\s*(?:#000000|#000|#111|#09090b|#18181b|black|rgb\(0,\s*0,\s*0\))[^"']*["']/gi;
    let blackMatch;
    let blackTextCount = 0;
    while ((blackMatch = blackTextRegex.exec(content)) !== null) {
      blackTextCount++;
    }
    if (blackTextCount > 0) {
      violations.push({
        type: 'Dark Mode (Invisible Text Risk)',
        msg: `${blackTextCount} instance(s) of hardcoded dark/black text in inline styles without dark tokens. This text will become completely invisible when dark mode is active!`
      });
    }

    const hasColorSchemeMeta = /<meta\s+[^>]*name\s*=\s*["']color-scheme["'][^>]*content\s*=\s*["'][^"']*dark[^"']*["']/i.test(content);
    if (!hasColorSchemeMeta && /<head>/i.test(content)) {
      violations.push({
        type: 'Dark Mode (FOUC Flash Risk)',
        msg: 'Missing `<meta name="color-scheme" content="light dark">` in <head>. The browser canvas may flash blinding white before dark mode stylesheets/JS render.'
      });
      if (isFix && /<head>/i.test(modifiedContent)) {
        modifiedContent = modifiedContent.replace(/<head>/i, '<head>\n  <meta name="color-scheme" content="light dark">');
        fixCount++;
      }
    }

    const themeToggleRegex = /<button\s+[^>]*(?:theme|dark-mode|light-mode|toggle-theme)[^>]*>/gi;
    let toggleMatch;
    while ((toggleMatch = themeToggleRegex.exec(content)) !== null) {
      const btnTag = toggleMatch[0];
      const hasAria = /aria-label\s*=/i.test(btnTag);
      if (!hasAria) {
        violations.push({
          type: 'Dark Mode (Toggle Accessibility)',
          msg: `Theme toggle button missing aria-label: ${btnTag.slice(0, 60)}... Add aria-label="Toggle dark mode".`
        });
        if (isFix) {
          const fixedBtn = btnTag.replace(/<button\s+/i, '<button aria-label="Toggle dark mode" ');
          modifiedContent = modifiedContent.replace(btnTag, fixedBtn);
          fixCount++;
        }
      }
    }
  }

  // =========================================================================
  // 5. Metadata, Canonical & Intra-Page Duplicate Content
  // =========================================================================
  const titleMatch = /<title(?:\s+[^>]*)?>([\s\S]*?)<\/title>/i.exec(content);
  const pageTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : null;

  const metaDescMatch = /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(content) ||
                        /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i.exec(content);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : null;

  const canonicalMatch = /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i.exec(content) ||
                         /<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i.exec(content);
  const canonicalUrl = canonicalMatch ? canonicalMatch[1].trim() : null;

  const isFullHtmlDoc = /<!DOCTYPE|<html\b|<head\b/i.test(content);
  if (isFullHtmlDoc) {
    if (!canonicalUrl) {
      violations.push({
        type: 'SEO (Missing Canonical)',
        msg: 'Missing `<link rel="canonical" href="...">`. Every public web page must declare an absolute canonical URL to avoid duplicate indexing.'
      });
      if (isFix && /<head>/i.test(modifiedContent)) {
        const cleanBase = path.basename(filename).replace(/\.[^.]+$/, '');
        modifiedContent = modifiedContent.replace(/<head>/i, `<head>\n  <link rel="canonical" href="https://example.com/${cleanBase}" />`);
        fixCount++;
      }
    } else {
      passes.push(`Self-referential canonical URL detected: "${canonicalUrl.slice(0, 50)}"`);
    }

    if (!pageTitle) {
      violations.push({ type: 'SEO (Missing Title)', msg: 'Document is missing a `<title>` tag.' });
    }
    if (!metaDescription) {
      violations.push({ type: 'SEO (Missing Meta Description)', msg: 'Document is missing a `<meta name="description">` tag.' });
    }
  }

  // Extract substantial paragraph / text blocks for duplicate checking
  const cleanForBlocks = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '');

  const blockRegex = /<(?:p|li|blockquote|article|section)(?:\s+[^>]*)?>([\s\S]*?)<\/(?:p|li|blockquote|article|section)>/gi;
  const textBlocks = [];
  const seenBlocks = new Map();
  let bMatch;
  while ((bMatch = blockRegex.exec(cleanForBlocks)) !== null) {
    const rawText = bMatch[1].replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const words = rawText.split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 10 || rawText.length >= 60) {
      const normalized = rawText.toLowerCase().replace(/[^\p{L}\p{M}\d\s]/gu, '');
      textBlocks.push({ raw: rawText, normalized, wordCount: words.length });
      seenBlocks.set(normalized, (seenBlocks.get(normalized) || 0) + 1);
    }
  }

  for (const [norm, count] of seenBlocks.entries()) {
    if (count > 1) {
      const orig = textBlocks.find(b => b.normalized === norm);
      violations.push({
        type: 'SEO (Intra-Page Duplicate Text)',
        msg: `Identical paragraph repeated ${count} times within this page: "${orig.raw.slice(0, 65)}...". Avoid verbatim copy repetition.`
      });
    }
  }

  const rawWords = cleanForBlocks.toLowerCase().match(/[\p{L}\p{M}\d]{3,}/gu) || [];
  const wordSet = new Set(rawWords);

  // =========================================================================
  // 6. Page-to-Page Internal Linking & Anchor Text Audit
  // =========================================================================
  const linkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const internalLinks = [];
  let lMatch;
  while ((lMatch = linkRegex.exec(content)) !== null) {
    const rawHref = lMatch[1].trim();
    const rawAnchor = lMatch[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const isInternal = !/^(?:https?:|\/\/|mailto:|tel:|javascript:|#$)/i.test(rawHref);

    if (isInternal) {
      internalLinks.push({ href: rawHref, anchor: rawAnchor, tag: lMatch[0] });

      if (/^(?:click\s+here|read\s+more|learn\s+more|here|more|link|this\s+page|details|view\s+more|এখানে\s*ক্লিক\s*করুন|আরো\s*জানুন|বিস্তারিত\s*দেখুন)$/iu.test(rawAnchor)) {
        violations.push({
          type: 'Internal Linking (Lazy Anchor Text)',
          msg: `Internal link to "${rawHref}" uses generic/lazy anchor text: "${rawAnchor}". Replace with descriptive topic text (e.g. "cloud hosting plans", "WCAG accessibility guide").`
        });
      }

      if (!rawAnchor && !/<img\b[^>]*alt=["'][^"']+["']/i.test(lMatch[2]) && !/aria-label=["'][^"']+["']/i.test(lMatch[0])) {
        violations.push({
          type: 'Internal Linking (Empty Anchor)',
          msg: `Internal link to "${rawHref}" has no readable anchor text, alt attribute, or aria-label.`
        });
      }
    }
  }

  // =========================================================================
  // 7. Structured Data & Schema.org JSON-LD Audit
  // =========================================================================
  const schemaRegex = /<script(?:\s+[^>]*)?type=["']application\/ld\+json["'](?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi;
  const schemas = [];
  let sMatch;
  while ((sMatch = schemaRegex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(sMatch[1]);
      schemas.push(parsed);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      items.forEach(item => {
        const typeName = item['@type'] || 'UnknownType';
        passes.push(`Valid Schema.org JSON-LD detected: @type "${typeName}"`);

        if (item['@context'] && !/schema\.org/i.test(item['@context'])) {
          violations.push({
            type: 'Schema Markup (Invalid @context)',
            msg: `Schema @context should be "https://schema.org", found "${item['@context']}".`
          });
        }
        if (item['@type'] === 'Organization' && (!item.name || !item.url)) {
          violations.push({
            type: 'Schema Markup (Incomplete Organization)',
            msg: 'Organization schema is missing required "name" or "url" property.'
          });
        }
      });
    } catch (err) {
      violations.push({
        type: 'Schema Markup (Invalid JSON Syntax)',
        msg: `Syntax error in Schema.org JSON-LD markup: ${err.message}. Google will ignore invalid structured data.`
      });
    }
  }

  if (isFullHtmlDoc && schemas.length === 0) {
    violations.push({
      type: 'Schema Markup (Missing JSON-LD)',
      msg: 'No Schema.org JSON-LD structured data detected. Add Organization, WebSite, or FAQPage schema for Google rich snippet visibility.'
    });
    if (isFix && /<head>/i.test(modifiedContent)) {
      const cleanBase = path.basename(filename).replace(/\.[^.]+$/, '');
      const autoSchema = `\n  <script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "WebSite",\n    "name": "${cleanBase.charAt(0).toUpperCase() + cleanBase.slice(1)}",\n    "url": "https://example.com/${cleanBase}"\n  }\n  </script>`;
      modifiedContent = modifiedContent.replace(/<\/head>/i, `${autoSchema}\n</head>`);
      fixCount++;
    }
  }

  const hasFaqElements = /<(?:details|div(?:\s+[^>]*(?:faq|accordion)))/i.test(content) && /\b(?:q:|question|faq|কীভাবে|কেন|প্রশ্ন)\b/i.test(content);
  const hasFaqSchema = schemas.some(s => s['@type'] === 'FAQPage' || (Array.isArray(s) && s.some(sub => sub['@type'] === 'FAQPage')));
  if (hasFaqElements && !hasFaqSchema) {
    violations.push({
      type: 'Schema Markup (Missing FAQPage)',
      msg: 'Page contains FAQ / accordion question elements but lacks Schema.org `FAQPage` JSON-LD markup. Add FAQPage schema to win collapsible Google search rich snippets.'
    });
  }

  // =========================================================================
  // 8. E-E-A-T & Trust Signals Audit (On-Page)
  // =========================================================================
  const copyrightRegex = /(?:©|&copy;|copyright)\s*(?:20\d\d)(?:\s*[-–—]\s*(20\d\d))?/gi;
  let crMatch;
  const currentYear = new Date().getFullYear();
  while ((crMatch = copyrightRegex.exec(content)) !== null) {
    const yearStr = crMatch[1] || crMatch[0].match(/20\d\d/)?.[0];
    if (yearStr) {
      const yearVal = parseInt(yearStr, 10);
      if (yearVal < currentYear - 1) {
        violations.push({
          type: 'Trust Signal (Outdated Copyright)',
          msg: `Outdated copyright year detected ("${crMatch[0]}"). Update to current year (${currentYear}) to signal an actively maintained and trustworthy website.`
        });
        if (isFix) {
          modifiedContent = modifiedContent.replace(crMatch[0], crMatch[0].replace(yearStr, String(currentYear)));
          fixCount++;
        }
      } else {
        passes.push(`Current copyright year detected: "${crMatch[0]}"`);
      }
    }
  }

  const hasCommercialCta = /\b(?:buy\s+now|checkout|pricing|subscribe|pricing-plan|order\s+now|start\s+free\s+trial)\b/i.test(content);
  const hasContactInfo = /mailto:|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\btel:\b|\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b(?:support|contact|help|terms|privacy)\b/i.test(content);
  if (hasCommercialCta && !hasContactInfo) {
    violations.push({
      type: 'Trust Signal (Missing Contact/Support Info)',
      msg: 'Commercial or conversion CTA found, but no visible contact email, phone, or support links detected on page. Google E-E-A-T and visitors require verifiable contact pathways.'
    });
  }

  // =========================================================================
  // 9. Multilingual AI Slop & AI Fingerprints
  // =========================================================================
  const multilingualSlop = [
    { lang: 'English', words: ['delve', 'streamline', 'streamlined', 'harness', 'leverage', 'utilize', 'empower', 'empowering', 'supercharge', 'robust', 'cutting-edge', 'seamless', 'seamlessly', 'elevate', 'transformative', 'tapestry', 'game-changer', 'game changer', 'unparalleled', 'beacon'] },
    { lang: 'Bengali', words: ['বিপ্লবী', 'যুগান্তকারী', 'উৎকর্ষ', 'উৎকর্ষ সাধন', 'উন্মোচন করুন', 'এক নতুন দিগন্ত', 'নিখুঁতভাবে', 'সীমাহীন সম্ভাবনা', 'অনন্য উচ্চতায়', 'জাদুকরী'] },
    { lang: 'Hindi', words: ['क्रांतिकारी', 'सशक्त', 'सुव्यवस्थित', 'अद्वितीय', 'नए युग की शुरुआत', 'जादूई', 'अनंत संभावनाएं', 'उद्घाटन करें'] },
    { lang: 'Spanish', words: ['revolucionario', 'optimiza', 'empodera', 'innovador', 'tapiz', 'sin fisuras', 'desbloquea', 'vanguardista'] },
    { lang: 'French', words: ['révolutionnaire', 'incontournable', 'optimisez', 'plongez', 'façonner', 'tissu'] },
    { lang: 'German', words: ['revolutionieren', 'nahtlos', 'optimieren', 'eintauchen', 'wegweisend'] }
  ];

  const multilingualPatterns = [
    { lang: 'English', regex: /\bnot\s+just\b[\s\S]*?\b(?:it['’]?s|it\s+is|but)\b/i, name: 'Binary contrast ("Not just X, it\'s Y")' },
    { lang: 'Bengali', regex: /(?:শুধু|কেবল|শুধুমাত্র)[\s\S]+?(?:নয়|না)[\s\S]+?(?:বরং|এটি|কিন্তু)/iu, name: 'Binary contrast ("শুধু X নয়, বরং Y")' },
    { lang: 'Hindi', regex: /(?:सिर्फ|केवल)[\s\S]+?नहीं[\s\S]+?(?:बल्कि|है)/iu, name: 'Binary contrast ("सिर्फ X नहीं, बल्कि Y")' },
    { lang: 'Spanish', regex: /\bno\s+es\s+(?:solo|solamente)\b[\s\S]+?(?:sino|es)\b/iu, name: 'Binary contrast ("No es solo X, es Y")' },
    { lang: 'French', regex: /\bce\s+n['’]est\s+pas\s+(?:seulement|juste)\b[\s\S]+?(?:mais|c['’]est)\b/iu, name: 'Binary contrast ("Ce n\'est pas seulement X, c\'est Y")' },
    { lang: 'German', regex: /\bnicht\s+nur\b[\s\S]+?(?:sondern|ist)\b/iu, name: 'Binary contrast ("Nicht nur X, sondern Y")' },
    { lang: 'English', regex: /\bin\s+today['’]?s\s+(?:fast-paced|digital|modern)\s+world\b/i, name: 'Throat-clearing opener ("In today\'s digital world...")' },
    { lang: 'Bengali', regex: /আজকের\s+(?:দ্রুত\s+পরিবর্তনশীল|আধুনিক|ডিজিটাল)\s+(?:বিশ্বে|যুগে)/iu, name: 'Throat-clearing opener ("আজকের ডিজিটাল বিশ্বে...")' },
    { lang: 'Hindi', regex: /আজ\s+के\s+(?:दौर|डिजिटल\s+युग|बदलते\s+वक्त)\s+में/iu, name: 'Throat-clearing opener ("আজ के डिजिटल युग में...")' }
  ];

  headings.forEach(h => {
    multilingualSlop.forEach(group => {
      group.words.forEach(word => {
        const regex = new RegExp(`(^|[\\s,.:;!?"'\`])${word}([\\s,.:;!?"'\`]|$)`, 'iu');
        if (regex.test(h.text)) {
          violations.push({
            type: `AI Slop / Copy Polish (${group.lang})`,
            msg: `Banned AI buzzword "${word}" detected in <${h.tag}>: "${h.text}". Replace with concrete outcome or active verb.`
          });
        }
      });
    });

    multilingualPatterns.forEach(pat => {
      if (pat.regex.test(h.text)) {
        violations.push({
          type: `AI Slop Pattern (${pat.lang})`,
          msg: `${pat.name} found in <${h.tag}>: "${h.text}". State the primary point directly without synthetic drama.`
        });
      }
    });

    if (/^[^:]{3,40}:\s*[a-z\u0980-\u09FF\u0900-\u097F]/u.test(h.text) && !/^(note|step\s*\d+|faq|tip):/i.test(h.text)) {
      violations.push({
        type: 'AI Slop Pattern (Universal)',
        msg: `Faux-insight colon reveal detected in <${h.tag}>: "${h.text}". State the claim directly without dramatized punctuation.`
      });
    }

    if (/[\u2014—]/.test(h.text)) {
      violations.push({
        type: 'AI Fingerprint (Em-Dash Overuse)',
        msg: `Em-dash ("—") detected in <${h.tag}>: "${h.text}". Avoid gluing clauses with em-dashes; use confident, standalone sentences.`
      });
    }

    if (/\b(?:[a-z]{3,15},\s+){2,}[a-z]{3,15}\s+and\s+[a-z]{3,15}\b/i.test(h.text)) {
      violations.push({
        type: 'AI Fingerprint (Rule-of-Three Triad)',
        msg: `Symmetrical list triad detected in <${h.tag}>: "${h.text}". AI defaults to 3-item lists; cut to the strongest 1-2 items.`
      });
    }

    if (/,\s*(?:highlighting|underscoring|reflecting|showcasing|ensuring)\b/i.test(h.text)) {
      violations.push({
        type: 'AI Fingerprint (Trailing -ing Puffery)',
        msg: `Trailing participial clause detected in <${h.tag}>: "${h.text}". Remove artificial puffery and state the concrete mechanism.`
      });
    }

    if (/\b(?:it['’]?s\s+worth\s+noting|crucially|important\s+to\s+remember|উল্লেখযোগ্য\s+যে|মনে\s+রাখা\s+জরুরি)\b/iu.test(h.text)) {
      violations.push({
        type: 'AI Fingerprint (Preachy Metadiscourse)',
        msg: `Preachy metadiscourse detected in <${h.tag}>: "${h.text}". Delete the commentary and let facts prove importance.`
      });
    }
  });

  if (/transition:\s*(?:all|width|height|margin|top|left)/i.test(content) || /transition-(?:all|width|height|margin)/i.test(content)) {
    violations.push({
      type: 'Motion Performance',
      msg: 'Detected transition animating layout properties (width/height/margin or transition:all). Animate only `transform` and `opacity` to avoid layout thrashing.'
    });
  }

  const metadata = {
    filename,
    title: pageTitle,
    metaDescription,
    canonical: canonicalUrl,
    h1s: h1List.map(h => h.text),
    textBlocks,
    wordSet,
    links: internalLinks,
    schemas
  };

  return { filename, headings, violations, passes, speedMetrics, modifiedContent, fixCount, metadata };
}

function auditCrossPageDuplicates(reports) {
  const crossViolations = [];
  const pages = reports.filter(r => r.metadata && (r.metadata.textBlocks.length > 0 || r.metadata.title));

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const pA = pages[i].metadata;
      const pB = pages[j].metadata;

      // 1. Cross-Page Title Duplication
      if (pA.title && pB.title && pA.title.trim().toLowerCase() === pB.title.trim().toLowerCase()) {
        crossViolations.push({
          type: 'SEO Cross-Page Collision (Duplicate Title)',
          files: [pA.filename, pB.filename],
          msg: `Identical <title> tag shared between "${path.basename(pA.filename)}" and "${path.basename(pB.filename)}":\n     Title: "${pA.title}". Each page must have a unique title.`
        });
      }

      // 2. Cross-Page Meta Description Duplication
      if (pA.metaDescription && pB.metaDescription && pA.metaDescription.trim().toLowerCase() === pB.metaDescription.trim().toLowerCase()) {
        crossViolations.push({
          type: 'SEO Cross-Page Collision (Duplicate Meta Description)',
          files: [pA.filename, pB.filename],
          msg: `Identical meta description shared between "${path.basename(pA.filename)}" and "${path.basename(pB.filename)}":\n     Desc: "${pA.metaDescription.slice(0, 80)}..."`
        });
      }

      // 3. Cross-Page H1 Duplication
      if (pA.h1s.length > 0 && pB.h1s.length > 0) {
        for (const h1A of pA.h1s) {
          for (const h1B of pB.h1s) {
            if (h1A.trim().toLowerCase() === h1B.trim().toLowerCase()) {
              crossViolations.push({
                type: 'SEO Cross-Page Collision (Duplicate H1)',
                files: [pA.filename, pB.filename],
                msg: `Identical <h1> heading shared between "${path.basename(pA.filename)}" and "${path.basename(pB.filename)}":\n     H1: "${h1A}"`
              });
            }
          }
        }
      }

      // 4. Exact Content Block / Paragraph Duplication Across Pages
      let sharedBlocksCount = 0;
      const matchingSnippets = [];
      for (const bA of pA.textBlocks) {
        for (const bB of pB.textBlocks) {
          if (bA.normalized === bB.normalized || (bA.normalized.length > 60 && bB.normalized.includes(bA.normalized))) {
            sharedBlocksCount++;
            if (matchingSnippets.length < 3) {
              matchingSnippets.push(bA.raw);
            }
          }
        }
      }

      if (sharedBlocksCount > 0) {
        crossViolations.push({
          type: 'SEO Cross-Page Duplicate Content (Matching Text Blocks)',
          files: [pA.filename, pB.filename],
          count: sharedBlocksCount,
          msg: `${sharedBlocksCount} verbatim text block(s) from "${path.basename(pA.filename)}" also found on "${path.basename(pB.filename)}":\n` +
               matchingSnippets.map(s => `     Matching Text: "${s.slice(0, 80)}..."`).join('\n')
        });
      }

      // 5. Jaccard Vocabulary Similarity (> 65%)
      if (pA.wordSet.size >= 15 && pB.wordSet.size >= 15) {
        let intersection = 0;
        for (const w of pA.wordSet) {
          if (pB.wordSet.has(w)) intersection++;
        }
        const union = pA.wordSet.size + pB.wordSet.size - intersection;
        const jaccard = union === 0 ? 0 : intersection / union;
        if (jaccard >= 0.65) {
          crossViolations.push({
            type: 'SEO Cross-Page Near-Duplicate Pages (High Similarity)',
            files: [pA.filename, pB.filename],
            similarity: (jaccard * 100).toFixed(1),
            msg: `High overall content similarity (${(jaccard * 100).toFixed(0)}%) between "${path.basename(pA.filename)}" and "${path.basename(pB.filename)}". Differentiate body copy or set canonical URL.`
          });
        }
      }
    }
  }

  return crossViolations;
}

function auditInternalLinkGraph(reports) {
  const linkingViolations = [];
  const linkStats = new Map();

  reports.forEach(r => {
    const base = path.basename(r.filename).toLowerCase();
    linkStats.set(base, {
      filename: r.filename,
      incomingCount: 0,
      outgoingCount: (r.metadata?.links || []).length,
      linkedBy: []
    });
  });

  reports.forEach(sourceReport => {
    const sourceBase = path.basename(sourceReport.filename).toLowerCase();
    const sourceLinks = sourceReport.metadata?.links || [];

    sourceLinks.forEach(l => {
      let targetBase = l.href.split('#')[0].split('?')[0].replace(/^\/|^\.\//, '');
      if (targetBase && !path.extname(targetBase) && !targetBase.endsWith('/')) {
        targetBase += '.html';
      }
      targetBase = targetBase.toLowerCase();

      if (linkStats.has(targetBase)) {
        if (targetBase === sourceBase) {
          linkingViolations.push({
            type: 'Internal Linking (Self Link)',
            files: [sourceReport.filename],
            msg: `Page "${path.basename(sourceReport.filename)}" contains a self-referential link pointing to itself ("${l.href}").`
          });
        } else {
          const targetStats = linkStats.get(targetBase);
          targetStats.incomingCount++;
          if (!targetStats.linkedBy.includes(sourceBase)) {
            targetStats.linkedBy.push(sourceBase);
          }
        }
      } else if (/\.(html|htm)$/i.test(targetBase) && linkStats.size > 1) {
        linkingViolations.push({
          type: 'Internal Linking (Broken Relative Link)',
          files: [sourceReport.filename],
          msg: `Broken internal link in "${path.basename(sourceReport.filename)}": points to "${l.href}", which does not exist in the project!`
        });
      }
    });
  });

  for (const [base, stats] of linkStats.entries()) {
    const isRoot = /^(?:index|home)\.html$/i.test(base);
    if (!isRoot && stats.incomingCount === 0 && linkStats.size > 1) {
      linkingViolations.push({
        type: 'Internal Linking (Orphan Page Detected)',
        files: [stats.filename],
        msg: `Orphan Page: "${base}" has 0 incoming internal links from any other page in the project! Add links from your navigation, hub page, or related articles.`
      });
    }
  }

  return { linkingViolations, linkStats };
}

function auditTrustAndLegalArchitecture(reports) {
  const trustViolations = [];
  const scannedFiles = reports.map(r => path.basename(r.filename).toLowerCase());
  const allLinks = reports.flatMap(r => r.metadata?.links || []);

  const hasPrivacy = scannedFiles.some(f => /privacy/i.test(f)) || allLinks.some(l => /privacy/i.test(l.href) || /privacy/i.test(l.anchor));
  const hasTerms = scannedFiles.some(f => /terms|conditions/i.test(f)) || allLinks.some(l => /terms|conditions/i.test(l.href) || /terms/i.test(l.anchor));
  const hasContact = scannedFiles.some(f => /contact|about/i.test(f)) || allLinks.some(l => /contact|about/i.test(l.href) || /contact|about/i.test(l.anchor));

  const missingPages = [];
  if (!hasPrivacy) missingPages.push('Privacy Policy');
  if (!hasTerms) missingPages.push('Terms of Service');
  if (!hasContact) missingPages.push('Contact / About Page');

  if (missingPages.length > 0 && reports.length > 1) {
    trustViolations.push({
      type: 'E-E-A-T Trust Architecture (Missing Trust Pages)',
      msg: `Site lacks essential trust & legal pages: [${missingPages.join(', ')}]. Google Search Quality Guidelines, payment processors (Stripe/PayPal), and ad platforms require these for business verification.`
    });
  }

  return trustViolations;
}

function printReport(report) {
  if (isJson) return;

  if (isMarkdown) {
    console.log(`\n### 📋 UI Polish Audit: \`${report.filename}\`\n`);
    if (report.speedMetrics && report.speedMetrics.length > 0) {
      console.log(`**⚡ Speed Telemetry:**\n` + report.speedMetrics.map(m => `- ${m}`).join('\n') + '\n');
    }
    console.log(`| Status | Count |`);
    console.log(`| :--- | :--- |`);
    console.log(`| ✅ Passes | ${report.passes.length} |`);
    console.log(`| ⚠️ Violations | ${report.violations.length} |`);
    if (report.fixCount > 0) console.log(`| 🛠️ Auto-fixes Applied | ${report.fixCount} |`);
    console.log(`\n**Violations Details:**`);
    report.violations.forEach((v, idx) => console.log(`${idx + 1}. **[${v.type}]** ${v.msg}`));
    return;
  }

  console.log(`\n======================================================`);
  console.log(` 📋 UI Polish, Speed & Hallmark Audit: ${report.filename}`);
  console.log(`======================================================`);

  if (report.speedMetrics && report.speedMetrics.length > 0) {
    console.log(`\n⚡ Speed & Network Telemetry:`);
    report.speedMetrics.forEach(m => console.log(`  • ${m}`));
  }

  if (report.headings.length > 0) {
    console.log(`\nDetected Document Heading Outline:`);
    report.headings.forEach(h => {
      const indent = '  '.repeat(h.level - 1);
      console.log(`${indent}• <${h.tag}> ${h.text.slice(0, 60)}`);
    });
  } else {
    console.log(`\n(No HTML heading tags detected)`);
  }

  console.log(`\nResults:`);
  report.passes.forEach(p => console.log(`  ✅ [PASS] ${p}`));

  if (report.violations.length === 0) {
    console.log(`  🎉 Perfect! Zero UI Polish, Speed & Hallmark violations detected.`);
  } else {
    console.log(`\n  ⚠️  ${report.violations.length} Violation(s) Found:`);
    report.violations.forEach((v, idx) => {
      console.log(`  ${idx + 1}. [${v.type}] ${v.msg}`);
    });
  }

  if (report.fixCount > 0) {
    const backupNotice = report.backupCreated ? ` (Safety backup saved: ${path.basename(report.backupCreated)})` : '';
    console.log(`\n  🛠️  Auto-Fix: Applied ${report.fixCount} automatic repair(s) to ${report.filename}!${backupNotice}`);
  }
}

function printCrossPageReport(crossViolations, linkAnalysis, trustViolations, fileCount) {
  if (isJson) return;

  console.log(`\n======================================================`);
  console.log(` 🌐 Cross-Page Duplicate Content & Collision Audit`);
  console.log(` Scanned: ${fileCount} page(s) across site`);
  console.log(`======================================================`);

  if (crossViolations.length === 0) {
    console.log(`  ✅ [PASS] No cross-page duplicate content, matching paragraphs, or title/H1 collisions detected! All pages have unique identities.`);
  } else {
    console.log(`\n  🚨 Found ${crossViolations.length} Cross-Page Duplicate Issue(s):`);
    crossViolations.forEach((cv, idx) => {
      console.log(`\n  ${idx + 1}. [${cv.type}]`);
      console.log(`     ${cv.msg}`);
    });
    console.log(`\n  💡 Remediation: See references/duplicate-content.md for Canonicalization and 60/40 Uniqueness guidelines.`);
  }

  // Internal Linking & Link Equity Matrix
  console.log(`\n======================================================`);
  console.log(` 🔗 Page-to-Page Internal Link Graph & Equity Matrix`);
  console.log(`======================================================`);

  for (const [base, stats] of linkAnalysis.linkStats.entries()) {
    const isOrphan = stats.incomingCount === 0 && !/^(?:index|home)\.html$/i.test(base) && linkAnalysis.linkStats.size > 1;
    const statusIcon = isOrphan ? '🚨 [ORPHAN PAGE]' : '✅';
    console.log(`  ${statusIcon} ${base.padEnd(20)} Incoming: ${String(stats.incomingCount).padEnd(3)} | Outgoing: ${stats.outgoingCount} link(s)`);
    if (stats.linkedBy.length > 0) {
      console.log(`     └── Linked by: ${stats.linkedBy.join(', ')}`);
    }
  }

  if (linkAnalysis.linkingViolations.length > 0) {
    console.log(`\n  ⚠️  Internal Linking Violations (${linkAnalysis.linkingViolations.length}):`);
    linkAnalysis.linkingViolations.forEach((lv, idx) => {
      console.log(`  ${idx + 1}. [${lv.type}] ${lv.msg}`);
    });
  } else {
    console.log(`\n  ✅ All pages have healthy internal link equity and zero orphan pages.`);
  }

  // E-E-A-T & Trust Pages Architecture
  console.log(`\n======================================================`);
  console.log(` 🛡️  E-E-A-T Trust Signals & Legal Pages Architecture`);
  console.log(`======================================================`);

  if (trustViolations.length === 0) {
    console.log(`  ✅ [PASS] Found Privacy Policy, Terms of Service, and Contact/About signals. E-E-A-T baseline satisfied.`);
  } else {
    console.log(`\n  ⚠️  Trust Architecture Violations (${trustViolations.length}):`);
    trustViolations.forEach((tv, idx) => {
      console.log(`  ${idx + 1}. [${tv.type}] ${tv.msg}`);
    });
    console.log(`\n  💡 Remediation: See references/trust.md for Google E-E-A-T compliance.`);
  }
}

async function auditUrl(url) {
  console.log(`\n🌐 Fetching live URL: ${url}...`);
  try {
    const start = performance.now();
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) UI-Polish-Auditor/1.0'
      }
    });
    const ttfb = performance.now() - start;

    if (!res.ok) {
      console.error(`HTTP Error: ${res.status} ${res.statusText}`);
      return;
    }

    const html = await res.text();
    const size = Buffer.byteLength(html, 'utf8');

    const report = auditHtmlContent(html, url, { ttfb, size });
    printReport(report);
  } catch (err) {
    console.error(`Failed to audit URL: ${err.message}`);
  }
}

async function main() {
  if (/^https?:\/\//i.test(nonFlagArgs[0])) {
    await auditUrl(nonFlagArgs[0]);
    return;
  }

  const filesToAudit = [];
  for (const targetPath of nonFlagArgs) {
    if (!fs.existsSync(targetPath)) {
      console.error(`File or directory not found: ${targetPath}`);
      continue;
    }
    const stat = fs.statSync(targetPath);
    if (stat.isDirectory()) {
      const dirFiles = fs.readdirSync(targetPath);
      for (const df of dirFiles) {
        if (/\.(html|htm|jsx|tsx|vue|astro)$/i.test(df)) {
          filesToAudit.push(path.join(targetPath, df));
        }
      }
    } else {
      filesToAudit.push(targetPath);
    }
  }

  if (filesToAudit.length === 0) {
    console.error('No audit-eligible files (.html, .htm, .jsx, .tsx, .vue, .astro) found.');
    process.exit(1);
  }

  const reports = [];
  for (const f of filesToAudit) {
    const content = fs.readFileSync(f, 'utf-8');
    const report = auditHtmlContent(content, f);
    if (isFix && report.fixCount > 0) {
      // 100% Safety Guard: Automatically create backup (.bak) before modifying
      const backupPath = `${f}.bak`;
      fs.copyFileSync(f, backupPath);
      report.backupCreated = backupPath;
      fs.writeFileSync(f, report.modifiedContent, 'utf-8');
    }
    reports.push(report);
    printReport(report);
  }

  let crossViolations = [];
  let linkAnalysis = { linkingViolations: [], linkStats: new Map() };
  let trustViolations = [];

  if (reports.length > 1) {
    crossViolations = auditCrossPageDuplicates(reports);
    linkAnalysis = auditInternalLinkGraph(reports);
    trustViolations = auditTrustAndLegalArchitecture(reports);
    printCrossPageReport(crossViolations, linkAnalysis, trustViolations, reports.length);
  }

  if (isJson) {
    const jsonOutput = reports.length === 1 ? reports[0] : {
      reports,
      crossViolations,
      internalLinking: {
        violations: linkAnalysis.linkingViolations,
        stats: Object.fromEntries(linkAnalysis.linkStats)
      },
      trustArchitecture: {
        violations: trustViolations
      }
    };
    console.log(JSON.stringify(jsonOutput, null, 2));
  }
}

main();

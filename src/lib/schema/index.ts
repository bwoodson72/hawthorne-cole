import type { CollectionEntry } from 'astro:content';
import { absoluteUrl, SITE_NAME, SITE_ORIGIN } from '@/lib/seo/site';

export type JsonLd = Record<string, unknown>;

const organizationId = absoluteUrl('/#organization');
const organizationReference = {
  '@type': 'Organization',
  '@id': organizationId,
  name: SITE_NAME,
  url: SITE_ORIGIN,
};

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: 'A fictional Fort Worth law firm created as a portfolio demonstration for Brian Woodson Web Development.',
  };
}

export function legalServiceSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': organizationId,
    name: 'Hawthorne & Cole Attorneys at Law',
    url: SITE_ORIGIN,
    description: 'A fictional Fort Worth law firm providing business litigation, contract, commercial real estate, estate planning, and probate counsel as a portfolio demonstration.',
    telephone: '+1-817-555-0148',
    email: 'contact@hawthornecole.example',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '500 West 7th Street, Suite 1800',
      addressLocality: 'Fort Worth',
      addressRegion: 'TX',
      postalCode: '76102',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Fort Worth' },
      { '@type': 'AdministrativeArea', name: 'North Texas' },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function personSchema(
  attorney: CollectionEntry<'attorneys'>,
  practiceAreas: CollectionEntry<'practiceAreas'>[],
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl(`/attorneys/${attorney.id}/#person`),
    name: attorney.data.name,
    jobTitle: attorney.data.title,
    url: absoluteUrl(`/attorneys/${attorney.id}/`),
    description: attorney.data.intro,
    worksFor: organizationReference,
    knowsAbout: practiceAreas.map(({ data }) => data.title),
  };
}

export function articleSchema(
  insight: CollectionEntry<'insights'>,
  author: CollectionEntry<'attorneys'>,
  practiceArea: CollectionEntry<'practiceAreas'>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': absoluteUrl(`/insights/${insight.id}/#article`),
    mainEntityOfPage: absoluteUrl(`/insights/${insight.id}/`),
    headline: insight.data.title,
    description: insight.data.summary,
    articleSection: insight.data.category,
    author: {
      '@type': 'Person',
      '@id': absoluteUrl(`/attorneys/${author.id}/#person`),
      name: author.data.name,
      url: absoluteUrl(`/attorneys/${author.id}/`),
    },
    publisher: organizationReference,
    about: {
      '@type': 'Service',
      name: practiceArea.data.title,
      url: absoluteUrl(`/practice-areas/${practiceArea.id}/`),
    },
    ...(insight.data.publishedDate && { datePublished: insight.data.publishedDate.toISOString() }),
    ...(insight.data.updatedDate && { dateModified: insight.data.updatedDate.toISOString() }),
    ...(insight.data.heroImage && { image: absoluteUrl(insight.data.heroImage) }),
  };
}

export function faqSchema(practiceArea: CollectionEntry<'practiceAreas'>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: practiceArea.data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serializeJsonLd(schema: JsonLd): string {
  return JSON.stringify(schema).replaceAll('<', '\\u003c');
}

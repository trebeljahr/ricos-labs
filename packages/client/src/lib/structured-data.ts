import { siteConfig } from "@/lib/site-config";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLd
  | JsonLdValue[];

type JsonLd = {
  [key: string]: JsonLdValue;
};

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const serviceId = `${siteConfig.url}/#services`;

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function stringifyJsonLd(data: JsonLd) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function getLandingPageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: absoluteUrl("/icon.png"),
        image: absoluteUrl(siteConfig.seo.image.path),
        description: siteConfig.seo.description,
        email: siteConfig.contact.email,
        foundingDate: siteConfig.entity.foundingDate,
        founder: {
          "@type": "Person",
          name: siteConfig.operator.name,
          url: siteConfig.socials.portfolio,
        },
        address: {
          "@type": "PostalAddress",
          ...siteConfig.operator.address,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "business inquiries",
            email: siteConfig.contact.email,
            areaServed: ["US", "DE", "EU"],
            availableLanguage: ["en"],
          },
        ],
        sameAs: Object.values(siteConfig.socials),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.seo.description,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.seo.image.path),
        description: siteConfig.seo.ogDescription,
        provider: {
          "@id": organizationId,
        },
        areaServed: ["Europe", "United States", "Worldwide"],
        knowsAbout: [...siteConfig.seo.keywords],
        priceRange: "$$",
        makesOffer: siteConfig.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            serviceType: service.name,
            description: service.description,
            provider: {
              "@id": organizationId,
            },
          },
        })),
      },
    ],
  };
}

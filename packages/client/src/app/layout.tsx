import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site-config";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const ogImage = {
  url: siteConfig.seo.image.path,
  width: siteConfig.seo.image.width,
  height: siteConfig.seo.image.height,
  alt: siteConfig.seo.image.alt,
};
const plausibleDomain = "ricoslabs.com";
const plausibleScriptUrl =
  "https://plausible.trebeljahr.com/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js";
const shouldLoadPlausible = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.seo.keywords],
  authors: [
    { name: siteConfig.operator.name, url: siteConfig.socials.portfolio },
  ],
  creator: siteConfig.operator.name,
  publisher: siteConfig.legalName,
  category: "technology",
  classification: "Software development studio",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon.png",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    images: [
      {
        url: siteConfig.seo.image.path,
        alt: siteConfig.seo.image.alt,
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: siteConfig.seo.themeColor.light,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: siteConfig.seo.themeColor.dark,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID && (
          <script
            defer
            async
            src="https://openpanel.dev/op.js"
            data-client-id={process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}
            data-track-screenviews="true"
          />
        )}
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {shouldLoadPlausible ? (
          <Script id="plausible-loader" strategy="afterInteractive">
            {`
              (function () {
                var domain = ${JSON.stringify(plausibleDomain)};
                if (location.hostname !== domain) return;
                window.plausible = window.plausible || function() {
                  (window.plausible.q = window.plausible.q || []).push(arguments);
                };
                var script = document.createElement("script");
                script.defer = true;
                script.dataset.domain = domain;
                script.src = ${JSON.stringify(plausibleScriptUrl)};
                document.head.appendChild(script);
              })();
            `}
          </Script>
        ) : null}
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

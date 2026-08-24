import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import StructuredData from "@/components/seo/structured-data";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: {
        default: "নকশি - ঐতিহ্যবাহী ফিরনি | অর্ডার করুন WhatsApp এ",
        template: "%s | নকশি ফিরনি",
    },
    description: "বাংলাদেশের ঐতিহ্যবাহী ফিরনি। ১৫০গ্রাম, ৫০০গ্রাম, ১কেজি। WhatsApp এ অর্ডার করুন। ফ্রি ডেলিভারি পান।",
    keywords: ["ফিরনি", "বাংলাদেশি ফিরনি", "ঐতিহ্যবাহী ফিরনি", "ফিরনি অর্ডার", "ফিরনি ডেলিভারি", "নকশি ফিরনি", "firni", "bangladeshi firni"],
    authors: [{ name: "নকশি ফিরনি" }],
    creator: "নকশি ফিরনি",
    publisher: "নকশি ফিরনি",
    metadataBase: new URL("https://www.biyebari.flowtim.com"),
    alternates: {
        canonical: "https://www.biyebari.flowtim.com",
    },
    openGraph: {
        title: "নকশি - ঐতিহ্যবাহী ফিরনি | অর্ডার করুন",
        description: "বাংলাদেশের ঐতিহ্যবাহী ফিরনি। ১৫০গ্রাম, ৫০০গ্রাম, ১কেজি। WhatsApp এ অর্ডার করুন।",
        url: "https://www.biyebari.flowtim.com",
        siteName: "নকশি ফিরনি",
        images: [
            {
                url: "https://www.biyebari.flowtim.com/og-image.svg",
                width: 1200,
                height: 630,
                alt: "নকশি ফিরনি - ঐতিহ্যবাহী বাংলাদেশি ফিরনি",
            },
        ],
        locale: "bn_BD",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "নকশি - ঐতিহ্যবাহী ফিরনি",
        description: "বাংলাদেশের ঐতিহ্যবাহী ফিরনি। WhatsApp এ অর্ডার করুন।",
        images: ["https://www.biyebari.flowtim.com/og-image.svg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.png",
        apple: "/biyebari.png",
    },
    manifest: "/manifest.json",
};

export const viewport: Viewport = {
    themeColor: "#FDF8F0",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="bn">
            <head>
                <StructuredData />
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                >
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3LBBK9P');`}
                </Script>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-G0S8BJ2SL0"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-G0S8BJ2SL0');
                    `}
                </Script>
            </head>
            <body className="min-h-screen bg-cream text-dark antialiased font-bangla">
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-W3LBBK9P"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                <Toaster richColors position="top-right" />
                {children}
            </body>
        </html>
    );
};

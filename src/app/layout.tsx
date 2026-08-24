import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "বিয়েবাড়ি - ঐতিহ্যবাহী ফিরনি",
    description: "ঐতিহ্যবাহী বাংলাদেশি ফিরনি, আপনার দোরগোড়ায় ডেলিভারি",
    icons: {
        icon: "/favicon.png",
        apple: "/biyebari.png",
    },
};

export const viewport: Viewport = {
    themeColor: "#FDF8F0",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="bn">
            <body className="min-h-screen bg-cream text-dark antialiased font-bangla">
                <Toaster richColors position="top-right" />
                {children}
            </body>
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
        </html>
    );
};

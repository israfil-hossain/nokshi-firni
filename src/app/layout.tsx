import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "নকশি - ঐতিহ্যবাহী ফিরনি",
    description: "ঐতিহ্যবাহী বাংলাদেশি ফিরনি, আপনার দোরগোড়ায় ডেলিভারি",
    icons: {
        icon: "/favicon.png",
        apple: "/nokshi-logo.png",
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
        </html>
    );
};

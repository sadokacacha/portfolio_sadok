import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
export const metadata = { title: "Sadok Acacha — Full-stack Developer", description: "Portfolio of Sadok Acacha, a full-stack developer." };
export default function RootLayout({ children }) { return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>; }

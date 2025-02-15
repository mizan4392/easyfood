import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Warning from "@/components/Warning";
import React from "react";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};
function Layout({ children, showHero }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Warning />
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;

import Footer from "@/components/sections/Footer";
import MobileNav2 from "@/components/ui/Navbar/MobileNav2";
import Navbar from "@/components/ui/Navbar/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MobileNav2 />
      <main className="px-4 max-w-7xl mx-auto flex flex-col overflow-x-hidden custom-scrollbar max-sm:scrollbar-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

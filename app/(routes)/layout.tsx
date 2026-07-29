import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/*
  Site chrome for real pages. Kept out of the root layout so app/not-found.tsx,
  which sits outside this route group, renders without nav, footer, or the
  page container.
*/
export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
      Full width on purpose. The max-width now lives inside each Section so
      that horizontal rules can span the viewport while the content column
      stays where it was.
    */
    <div className="flex min-h-screen w-full flex-1 flex-col overflow-x-clip">
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}

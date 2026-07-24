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
    <div className="min-h-screen flex flex-col flex-1 overflow-x-clip mx-auto w-full max-w-5xl pt-6 px-4 pb-2 md:px-8">
      <Navbar />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import { Footer } from "@/components/shared/footer";

import { Navbar } from "@/components/shared/navbar";



const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl md:px-4 px-2 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default layout;
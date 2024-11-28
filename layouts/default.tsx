import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full py-3">
        <div className="flex justify-center">
          <span className="text-default-600">Powered by</span>
          <p className="ml-1 text-primary"> lnwXsoE</p>
        </div>
        <div className="flex justify-center">
          <a href="https://www.hitwebcounter.com" target="_blank">
            <img
              src="https://hitwebcounter.com/counter/counter.php?page=17604015&style=0007&nbdigits=9&type=page&initCount=0"
              title="Counter Widget"
              alt="Visit counter For Websites"
              width={100}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

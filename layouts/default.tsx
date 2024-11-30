import { Link } from '@nextui-org/link';

import { Head } from './head';

import { Navbar } from '@/components/navbar';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex flex-col h-screen'>
      <Head />
      <Navbar />
      <main className='container mx-auto max-w-7xl px-6 flex-grow pt-16'>
        {children}
      </main>
      <footer className='w-full py-3'>
        <div className='flex justify-center'>
          <span className='text-default-600'>Powered by</span>
          <p className='ml-1 text-primary'> lnwXsoE</p>
        </div>
      </footer>
    </div>
  );
}

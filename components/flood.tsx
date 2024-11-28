import { title } from './primitives';

const FloodComponent = ({ articles, max }: any) => {
  const articlesWithMax =
    max !== undefined ? articles?.slice(0, max) : articles;
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block w-full text-center justify-center'>
        <h1 className={title()}>ข่าวสารล่าสุด</h1>
      </div>

      <main className='container mx-auto p-6'>
        {articles.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articlesWithMax.map((article: any, index: any) => (
              <div
                key={index}
                className='bg-surface/60 rounded-lg shadow-md overflow-hidden'
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className='w-full h-48 object-cover'
                  />
                )}
                <div className='p-4'>
                  <h3 className='text-medium font-semibold'>{article.title}</h3>
                  <p className='text mt-2'>{article.description}</p>
                  <p className='text-sm text mt-2 font-semibold'>
                    {article.date}
                  </p>
                  <a
                    href={article.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block mt-4 hover:underline'
                  >
                    อ่านต่อ →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text'>ค้นหาข่าวไม่พบ.</p>
        )}
      </main>
    </section>
  );
};

export default FloodComponent;

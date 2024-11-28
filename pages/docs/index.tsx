import DefaultLayout from "@/layouts/default";
import axios from "axios";

export const getStaticProps = async () => {
  let articles = [];

  try {
    const { data: html } = await axios.get(
      "https://www.thaipbs.or.th/tags?q=%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%97%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%83%E0%B8%95%E0%B9%89"
    );

    const articleRegex = /<article class="ContentCardstyle__Container-sc-odesfa-0[^>]*>(.*?)<\/article>/gs;
    const titleRegex = /<a[^>]*title="([^"]+)"[^>]*>/;
    const descriptionRegex = /<p class="ContentInformationLayoutAstyle__Description-sc-1ut12ee-3[^>]*>(.*?)<\/p>/;
    const urlRegex = /<a[^>]*href="([^"]+)"[^>]*>/;
    const dateRegex = /<span class="ContentInformationLayoutAstyle__DateText-sc-1ut12ee-5[^>]*>(.*?)<\/span>/;
    const imageRegex = /<img[^>]*src="([^"]+)"[^>]*>/;

    let match;
    while ((match = articleRegex.exec(html)) !== null) {
      const articleHtml = match[1];

      const titleMatch = titleRegex.exec(articleHtml);
      const descriptionMatch = descriptionRegex.exec(articleHtml);
      const urlMatch = urlRegex.exec(articleHtml);
      const dateMatch = dateRegex.exec(articleHtml);
      const imageMatch = imageRegex.exec(articleHtml);

      const cleanTitle = titleMatch
        ? titleMatch[1].replace(/&quot;/g, '"')
        : "No title";

      articles.push({
        title: cleanTitle,
        description: descriptionMatch
          ? descriptionMatch[1].replace(/&quot;/g, '"')
          : "No description",
        url: urlMatch ? `https://www.thaipbs.or.th${urlMatch[1]}` : "No URL",
        date: dateMatch ? dateMatch[1] : "No date",
        image: imageMatch ? imageMatch[1] : null,
      });
    }
  } catch (error) {
    console.error("Error scraping articles:", error);
  }

  return {
    props: {
      articles,
    },
    revalidate: 3600,
  };
};


const FloodNews = ({ articles }: any) => {
  return (
    <DefaultLayout>

    <div className="min-h-screen bg-gray-100">
      <header className="bg-black py-6">
        <h1 className="text-center text-3xl font-bold mb-3">ข่าวสารล่าสุด</h1>
        <h4 className="text-center font-bold">จาก ข่าวสด</h4>
      </header>

      <main className="container mx-auto p-6">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any, index: any) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-600">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{article.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{article.date}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-500 hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No articles found.</p>
        )}
      </main>
    </div>
    </DefaultLayout>
  );
};

export default FloodNews;


import FloodComponent from '@/components/flood';
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import axios from 'axios';

export const getStaticProps = async () => {
  let articles = [];

  try {
    const { data: html } = await axios.get(
      'https://www.thaipbs.or.th/tags?q=%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%97%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%83%E0%B8%95%E0%B9%89'
    );

    const articleRegex =
      /<article class="ContentCardstyle__Container-sc-odesfa-0[^>]*>(.*?)<\/article>/gs;
    const titleRegex = /<a[^>]*title="([^"]+)"[^>]*>/;
    const descriptionRegex =
      /<p class="ContentInformationLayoutAstyle__Description-sc-1ut12ee-3[^>]*>(.*?)<\/p>/;
    const urlRegex = /<a[^>]*href="([^"]+)"[^>]*>/;
    const dateRegex =
      /<span class="ContentInformationLayoutAstyle__DateText-sc-1ut12ee-5[^>]*>(.*?)<\/span>/;
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
        : 'No title';

      articles.push({
        title: cleanTitle,
        description: descriptionMatch
          ? descriptionMatch[1].replace(/&quot;/g, '"')
          : 'ไม่มีรายละเอียดเพิ่มเติม',
        url: urlMatch ? `https://www.thaipbs.or.th${urlMatch[1]}` : 'No URL',
        date: dateMatch ? dateMatch[1] : 'No date',
        image: imageMatch ? imageMatch[1] : null,
      });
    }
  } catch (error) {
    console.error('Error scraping articles:', error);
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
      <FloodComponent articles={articles} />
    </DefaultLayout>
  );
};

export default FloodNews;

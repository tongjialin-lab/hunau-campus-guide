import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '湖南农业大学新生校园导览',
  description: '湖南农业大学新生入学导览网站 - 校园地图、宿舍分布、食堂分布、附近美食，一站式了解湖南农业大学校园生活',
  keywords: '湖南农业大学,校园导览,新生入学,校园地图,宿舍,食堂,美食,百度地图',
  // 百度地图需要的 meta 信息
  other: {
    'baidu-site-verification': '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="referrer" content="origin" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

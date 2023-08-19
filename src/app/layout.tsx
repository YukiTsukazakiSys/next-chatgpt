// TODO: git hub にアップロードする
// TODO: vercelにあげる？（openaiの利用料金が怖いのでやらないかも）
// TODO: variable.css に色やフォントサイズの定義をして活用する
// TODO: 設定できる項目数を増やす（apiのオプションをユーザが変更できるようにする）
// TODO: PageRouterをAppRouterで書き換える
// TODO: app/chat/page.tsx を自作する（componentsフォルダ含む）
// TODO: chatgptのver.4のAPIも試してみたい！（お金めちゃかかるならやらない）

import '@/assets/globals.css';
import '@/assets/variable.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProvider from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'chatgpt-api practice',
  description: 'chat gpt api を利用した練習用アプリケーション',
};

export default function RootLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} pt-[100px]`}>
        <AppProvider>
          {header}
          <main className="flex flex-grow items-center justify-center">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}

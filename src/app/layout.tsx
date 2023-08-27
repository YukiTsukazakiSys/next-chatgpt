// TODO: コンポーネント分割したい
// TODO: zodを使ってバリデーションチェックしたい
// TODO: storybookを作りたい
// TODO: ログイン設定つけて、chatGPTと会話できるようにする（API Keyの配置どうする？）
// TODO: PageRouterをAppRouterで書き換える
// TODO: app/chat/page.tsx を自作する（componentsフォルダ含む）
// TODO: chatgptのver.4のAPIも試してみたい！（お金めちゃかかるならやらない）

import '@/assets/globals.css';
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

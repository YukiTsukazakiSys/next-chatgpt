import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home = () => {
  const products = [{ name: 'bag' }, { name: 'shoes' }, { name: 'socks' }];
  return (
    <div>
      <Head>
        <title>トップページ</title>
        <meta name="description" content="これはトップページです" />
        <meta property="og:title" content="トップページ" />
        <meta property="og:description" content="これはトップページ" />
      </Head>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
      <h1 className="heading">Hello Next.js</h1>
      <h1 className={styles.heading}>Hello Next.js</h1>
      <Image
        src="https://images.unsplash.com/photo-1640622842223-e1e39f4bf627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MjY4OTkyMQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        alt="unsplash"
        width={500}
        height={300}
      />
    </div>
  );
};

export default Home;

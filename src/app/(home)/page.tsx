import styles from './page.module.scss';
import Link from 'next/link';

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>会話を開始しよう！</h1>
      <div className="mt-[30px]">
        <Link href="/setBehavior" className={styles.buttonContainer}>
          prompt入力画面へ
        </Link>
      </div>
    </div>
  );
}

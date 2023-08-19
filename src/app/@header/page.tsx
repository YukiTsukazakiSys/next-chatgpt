import { siteTitle } from '@/constants/constants';
import styles from './page.module.scss';

const Page = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{siteTitle}</h1>
    </header>
  );
};

export default Page;

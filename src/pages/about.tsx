import { Layout } from '@/components/layouts/Layout';
import { ReactNode } from 'react';

const About = () => {
  return <h1>About</h1>;
};

About.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default About;

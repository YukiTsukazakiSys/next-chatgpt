import { ReactNode } from 'react';
import Footer from '../parts/footer/Footer';
import Header from '../parts/header/Header';

type props = {
  children: ReactNode;
};

export const Layout = ({ children }: props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

/* eslint-disable no-restricted-globals */
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import { FAQ } from './BlockFAQ/FAQ';
import cls from './ProductPage.module.scss';
import { ProductCard } from './productCard/productCard';

export const ProductPage = () => {
  return (
    <div className={cls.wrapper}>
      <Header />
      <button
        type="button"
        className={cls.buttonBack}
        onClick={() => history.back()}
      >
        &larr;
      </button>
      <main className={cls.main}>
        <ProductCard />
        <section className={cls.SimilarPrompts}>
          <div className={cls.similarTitle}>Similar Prompts</div>
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

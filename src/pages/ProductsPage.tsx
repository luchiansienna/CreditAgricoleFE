import ProductList from "../components/ProductList/ProductList";
import styles from "./ProductsPage.module.css";
import { Button } from "../components/Button/Button";
import { Loading } from "../components/Loading/Loading";
import { hasContent } from "../utils/utils";
import { PriceSubscriptionHook } from "../customhooks/PriceSubscriptionHook";

const ProductsPage = () => {
  const {
    products,
    productPrices,
    previousPrices,
    subscriptionOpen,
    errorMessage,
    isLoading,
    startSubscription,
    stopSubscription,
  } = usePriceSubscriptionHook();

  return (
    <div className={styles.container}>
      <ProductList
        products={products}
        productPrices={productPrices}
        previousPrices={previousPrices}
        errorMessage={errorMessage}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Button
            onClick={stopSubscription}
            active={subscriptionOpen}
            label="Stop Subscription"
          />
          <Button
            onClick={startSubscription}
            active={hasContent(products) && !subscriptionOpen}
            label="Start Subscription"
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

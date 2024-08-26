import { Product } from "../../models/Product";
import { UpArrow, DownArrow } from "../../icons";
import styles from "./ProductList.module.css";
import { dateFormat, dateLocale } from "../../config";
import { ProductPrice } from "../../models/ProductPrice";
import { hasContent } from "../../utils/utils";

interface ProductListParams {
  products: Product[];
  productPrices: ProductPrice[];
  previousPrices: ProductPrice[];
  errorMessage: string;
}

const ProductList = ({
  products,
  productPrices,
  previousPrices,
  errorMessage,
}: ProductListParams) => (
  <table className={styles.styles}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Product name</th>
        <th>Price</th>
        <th>Price change</th>
        <th>Updated at</th>
      </tr>
    </thead>
    <tbody>
      {errorMessage || !hasContent(products) || !hasContent(productPrices) ? (
        <tr>
          <td colSpan={5}>{errorMessage ?? "No products to display"}</td>
        </tr>
      ) : (
        products.map((product) => {
          const currentPrice = productPrices.find(
            (p) => p.ProductId === product.Id
          );
          const previousPrice = previousPrices.find(
            (p) => p.ProductId === product.Id
          );
          return (
            <tr key={product.Id}>
              <td>{product.Id}</td>
              <td>{product.Name}</td>
              <td>
                {currentPrice?.Price.Amount} {currentPrice?.Price.Currency}
              </td>
              <td>
                {currentPrice &&
                  previousPrice &&
                  currentPrice.Price.Amount > previousPrice.Price.Amount && (
                    <UpArrow />
                  )}
                {currentPrice &&
                  previousPrice &&
                  currentPrice.Price.Amount < previousPrice.Price.Amount && (
                    <DownArrow />
                  )}
              </td>
              <td>
                {currentPrice &&
                  new Date(currentPrice.UpdatedAt).toLocaleString(
                    dateLocale,
                    dateFormat
                  )}
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
);

export default ProductList;

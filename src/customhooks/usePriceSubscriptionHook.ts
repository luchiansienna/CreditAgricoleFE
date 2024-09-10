import { useEffect, useState } from "react";
import { pairwise, startWith, Subscription } from "rxjs";
import { webSocket } from "rxjs/webSocket";
import { apiUrls } from "../config";
import { Product } from "../models/Product";
import { ProductPrice } from "../models/ProductPrice";

let subscription: Subscription;

export const usePriceSubscriptionHook = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productPrices, setProductPrices] = useState<ProductPrice[]>([]);
    const [previousPrices, setPreviousPrices] = useState<ProductPrice[]>([]);
    const [subscriptionOpen, setSubscriptionOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const subject = webSocket<ProductPrice[]>({
        url: apiUrls.productprices,
        serializer: (msg) =>
          JSON.stringify({ channel: "webDevelopment", msg: msg }),
        deserializer: ({ data }) => JSON.parse(data),
      }).pipe(startWith(), pairwise());
    
      const stopSubscription = () => {
        if (subscription && !subscription.closed) {
          console.log("Closing subscription");
          subscription.unsubscribe();
          setSubscriptionOpen(false);
          setIsLoading(false);
        }
      };
    
      const startSubscription = () => {
        if (!subscription || subscription?.closed) {
          console.log("Starting subscription");
          setIsLoading(true);
          subscription = subject.subscribe({
            next: ([previousValue, currentValue]) => {
              setErrorMessage("");
              if (previousValue) setPreviousPrices(previousValue);
              if (currentValue) setProductPrices(currentValue);
              setSubscriptionOpen(true);
              setIsLoading(false);
            }, // Called whenever there is a message from the server.
            error: () => {
              setErrorMessage("The price list websocket threw an error");
              setSubscriptionOpen(false);
              setIsLoading(false);
            }, // Called if at any point WebSocket API signals some kind of error.
            complete: () => {
              console.log("Subscription complete");
              setSubscriptionOpen(false);
              setIsLoading(false);
            }, // Called when connection is closed (for whatever reason).
          });
        }
      };

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrls.productlist)
      .then((response) => response.json())
      .catch((reason) => {
        setErrorMessage("Products were enable to be fetched from the API");
        setIsLoading(false);
        return Promise.reject(reason);
      })
      .then((data: Product[]) => setProducts(data.sort((p) => p.Id)))
      .then(() => startSubscription());
    return () => stopSubscription();
  }, []);

return { startSubscription, stopSubscription, products, productPrices, previousPrices, subscriptionOpen, errorMessage, isLoading };
};

import { Price } from "./Currency";

export type ProductPrice = {
    ProductId: number;
    Price: Price;
    UpdatedAt: Date;
}
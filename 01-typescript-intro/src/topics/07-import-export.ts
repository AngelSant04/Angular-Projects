import { Product, taxCalculation } from "./06-function-destructuring";

const shoppingCart: Product[] = [
  {
    description: "Nokia",
    price: 1100,
  },
  {
    description: "Ipad",
    price: 100,
  },
];

const [total, taxResult] = taxCalculation({
  products: shoppingCart,
  tax: 0.15,
});

console.log("Total ", total);
console.log("Tax ", taxResult);

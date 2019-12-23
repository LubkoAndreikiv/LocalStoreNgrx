export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  coverUrl: string;
  customerRating: number;
  description: string;
  reviews: { text: string, customerName: string }[]
}

export interface FilterConfig {
  search: string;
  filter: string;
  priceRange: { oneFive: boolean, moreFive: boolean};
}

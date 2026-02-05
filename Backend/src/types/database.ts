export interface Product {
  id: number;
  name: string;
  image: string;
}

export interface ProductInsert {
  name: string;
  image: string;
}

export interface ProductUpdate {
  name?: string;
  image?: string;
}

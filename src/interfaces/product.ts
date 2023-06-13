export interface IProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  size: number[];
  quantity: number;
  views: number;
  tags: Tag[];
  CategoryId: Category[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null,
}

interface Tag {
  _id: string;
  name: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
}


interface Category {
  _id: string;
  name: string;
  products: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null,
}
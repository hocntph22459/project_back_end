export interface ICategory {
    _id: string;
    name: string,
    products: IProduct[],
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null,
}

export interface IProduct {
  _id: string;
  name: string;
  price: string;
  images: string[];
  description: string;
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
  
  interface Comment {
    _id: string;
    content: string;
    author: string;
    products: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null,
  }
  
  interface Category {
    _id: string;
    name: string;
    products: string[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null,
  }
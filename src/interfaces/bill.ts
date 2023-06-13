interface IBill {
    _id: string;
    name: string;
    email: string;
    phone: number;
    address: string,
    items: product[];
    total: number;
    status:String;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

interface product {
    name: string;
    price: number;
    size: number;
    quantity: number;
}
export default IBill
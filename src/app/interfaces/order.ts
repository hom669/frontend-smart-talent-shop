export interface Order {
    id: number,
    createdAt: string,
    orderDetails: {
        quantity: number,
        valueTotal: number,
        product: {
            id: number,
            name: string,
            price: number,
            image: string,
            description: string,
        },
    }[];
    totalOrder: number;
}
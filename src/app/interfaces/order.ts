export interface Order {
    id: number,
    createdAt: string,
    user: {
        id: number,
        username: string,
        details: {
            fullName: string,
            identification: string,
            email: string
        }
    },
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
    codeOrder: string;
}
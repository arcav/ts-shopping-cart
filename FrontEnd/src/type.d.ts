type CarItemType = {
    id: string; // Changed from number to string for Electrolux API
    category: string;
    description: string;
    image: string;
    price: number;
    listPrice?: number;
    title: string;
    amount: number;
};

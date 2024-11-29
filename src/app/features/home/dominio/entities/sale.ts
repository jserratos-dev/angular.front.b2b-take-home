export interface ISale {
    id: number;
    createdAt: string; 
    updatedAt: string;
    DeletedAt: string | null; 
    date: Date; 
    status: string; 
    price: number; 
    loanId: number;
    merchantId: number;
    products: any | string;
    branchId: number;
    sellsAgentId: number;
}



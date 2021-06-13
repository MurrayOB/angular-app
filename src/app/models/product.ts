export interface Product{
    id? : any, 
    name?: string;
    category?: any; 
    quantity?: any; 
    token?: any; 
}

export interface AllProducts extends Array<Product>{}

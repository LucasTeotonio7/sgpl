export interface Purchase{
    id?:number;
    purchase_closing_date:string;
    closed:boolean;
    product:number;
    supplier: number;
    week: number;
}
export interface Purchase{
    id?:number;
    purchase_closing_date:string;
    closed:boolean;
    product_id:number;
    supplier_id: number;
    week_id: number;
}
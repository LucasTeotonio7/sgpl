export interface Week{
    id?:number;
    date_start:string;
    date_end:string;
    product: number;
}

export interface weekView{
    date_start:Date;
    date_end:Date;
}

export interface WeeklyCollection{
    id?:number;
    date:string;
    quantity:number;
    purchase:number;
}
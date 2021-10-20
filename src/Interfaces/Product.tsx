import Brand from "./Brand";
import Gender from "./Gender";
import Supplier from "./Supplier";
import Type from "./Type";

export default interface Product {
    upc: string,
    name: string,
    quantity: number,
    gender: Gender,
    price: number,
    cost: number,
    desc: string,
    brand: Brand,
    supplier: Supplier,
    type: Type,
    date: string,
    image_path: string,
}
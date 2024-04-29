export class Producto {
    constructor(
        public idProducto: number,
        public nombreProducto: string,
        public id_supplier: number,
        public id_categoria: number,
        public cantidad: string,
        public precioUnitario: number,
        public unidadesStock: number,
        public enPedido: number,
        public volverAPedir: number,
        public discontinua: number
    ) { }
}
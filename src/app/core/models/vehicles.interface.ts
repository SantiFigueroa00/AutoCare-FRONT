export interface Vehicle {
    id: string;
    patente: string;
    kilometraje: number;
    modelo: Model;
}

interface Model {
    descripcion: string;
    motor: Engine;
    marca: Brand;
}

interface Engine {
    descripcion: string;
}

interface Brand {
    descripcion: string;
}
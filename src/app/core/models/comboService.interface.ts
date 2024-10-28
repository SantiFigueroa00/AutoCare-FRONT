import { typeService } from "./typeService.interface";

export interface comboService {
    id: string;
    puntosAdicionales: number;
    nombre: string;
    descripcion: string;
    tiposDeServicio:typeService[];
    type:'comboService';
}
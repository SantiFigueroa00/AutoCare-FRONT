import { Service } from "./service.interface";

export interface Turn {
    id: string;
    fecha:string;
    horaFin:string;
    horaInicio:string;
    observaciones:string;
    servico:Service;
}



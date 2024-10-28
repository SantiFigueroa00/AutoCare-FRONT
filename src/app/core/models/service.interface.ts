import { Client } from "./client.interface";
import { comboService } from "./comboService.interface";
import { Employee } from "./employee.interface";
import { typeService } from "./typeService.interface";
import { Vehicle } from "./vehicles.interface";

export interface Service {
    id: string;
    lineasDeServicio: ServiceLine[];
    lineasDeCombo: ComboLine[];
    vehiculo: Vehicle;
    empleado:Employee;
    cliente:Client;
    precioTotal: number;
    puntosTotales: number;
}

export interface ServiceLine {
    id: string;
    puntos: string;
    subtotal: string;
    tipoDeServicio: typeService;
    type:'ServiceLine'
}

export interface ComboLine {
    id: string;
    puntos: string;
    subtotal: string;
    combo: comboService;
    type:'ComboLine'
}

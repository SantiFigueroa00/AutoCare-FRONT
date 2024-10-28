export interface Login {
    usuario: Usuario;
    token: string;
}

interface Usuario {
    email: string;
    nombre: string;
    apellido: string;
}
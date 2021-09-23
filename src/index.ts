import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import UIkit from 'uikit';
import { Tabla } from './components/tabla';

document.addEventListener('DOMContentLoaded', _ => {
    console.log("Contenido HTML Listo");
    const btnModal = document.querySelector("button");
    const modal = UIkit.modal("#modal-example");
    btnModal?.addEventListener('click', e => {
        e.preventDefault();
        console.log("click en boton");
        modal.show();
    });

    const table = new Tabla("tabla-sample", "https://localhost:44340/api/tabla-prueba");
});

export const metodos = {
    get: 'GET' as Method,
    post: 'POST' as Method
};

export function hacerPeticion<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
        axios(config).then((res: AxiosResponse) => {
            resolve(res.data);
        }).catch((err: AxiosError) => {
            console.error(err);
            reject(err);
        });
    });
}
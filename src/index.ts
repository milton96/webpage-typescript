import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

document.addEventListener('DOMContentLoaded', _ => {
    console.log("Contenido HTML Listo")
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
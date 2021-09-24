import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import UIkit from 'uikit';

document.addEventListener('DOMContentLoaded', _ => {
    const btnModal = document.querySelector("button");
    const modal = UIkit.modal("#modal-example");
    btnModal?.addEventListener('click', e => {
        e.preventDefault();
        modal.show();
    });
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
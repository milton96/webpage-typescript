import { AxiosRequestConfig } from 'axios';
import { hacerPeticion, metodos } from './index';

interface IPost {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

document.addEventListener('DOMContentLoaded', _ => {
    console.log("Peticiones a json placeholder");
    let configUnPost: AxiosRequestConfig = {
        method: metodos.get,
        url: 'https://jsonplaceholder.typicode.com/posts/1'
    };
    hacerPeticion<IPost>(configUnPost).then(res => {
        console.log(res);
    });

    let configListaPost: AxiosRequestConfig = {
        method: metodos.get,
        url: 'https://jsonplaceholder.typicode.com/posts'
    };
    hacerPeticion<IPost[]>(configListaPost).then(res => {
        console.log(res.length);
    });
});
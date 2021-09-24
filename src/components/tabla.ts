import { ITabla, IColumna, IFila } from './itabla';
import { hacerPeticion, metodos } from '../index';
import { AxiosRequestConfig } from 'axios';

export class Tabla {
    private tablaHtml: HTMLTableElement;
    private tbodyHtml?: HTMLTableSectionElement;
    private theadHtml?: HTMLTableSectionElement;
    
    private filas: IFila[];
    private columnas: IColumna[];
    private filasPorPagina: number;

    private pagina: IFila[];
    private paginaActual: number;

    /**
     * inicializa una nueva instancia para tabla
     * @param idTabla identificador de la tabla o elemnto html table
     * @param source url de donde se obtendran los datos o los datos
     */
    constructor(idTabla: string | HTMLTableElement, source: string | ITabla) {        
        if (typeof idTabla === 'string')
            this.tablaHtml = document.getElementById(idTabla) as HTMLTableElement;
        else
            this.tablaHtml = idTabla;

        this.filas = [];
        this.columnas = [];
        this.pagina = [];
        this.filasPorPagina = 5;
        this.paginaActual = 1;

        if (this.tablaHtml) {
            if (typeof source === 'string')
                this.obtenerDatos(source);   
            else
                this.inicializarTabla(source);
        }        
    }

    public obtenerDatos(url: string): void {
        if (!this.tablaHtml) return;

        const config: AxiosRequestConfig = {
            method: metodos.post,
            url: url
        }

        hacerPeticion<ITabla>(config).then(res => {
            this.inicializarTabla(res);
        }).catch(err => {
            console.error(err);
        })
    }

    private inicializarTabla(dataTabla: ITabla): void {
        if (!this.tablaHtml) return;

        this.filasPorPagina = dataTabla.tabla.FilasPagina;
        this.columnas = dataTabla.tabla.Columnas.sort((a, b) => (a.Posicion > b.Posicion) ? 1 : -1);
        this.filas = dataTabla.tabla.Filas;

        this.actualizarTabla();
    }

    private actualizarTabla(): void {
        this.theadHtml = document.createElement("thead");
        this.tbodyHtml = document.createElement("tbody");

        this.tablaHtml.innerHTML = "";
        this.tablaHtml.appendChild(this.theadHtml);
        this.tablaHtml.appendChild(this.tbodyHtml);

        this.agregarColumnas();
        this.agregarFilas();
        this.hacerPaginacion();
    }

    private agregarColumnas(): void {
        const tr = this.theadHtml?.insertRow();
        this.columnas.forEach((col, index) => {
            let th = document.createElement("th");
            th.innerText = col.Valor;

            th.addEventListener("click", e => {
                console.log(`Posicion: ${col.Posicion} - Valor: ${col.Valor}`);
            });

            tr?.appendChild(th);
        });
    }

    private agregarFilas(): void {
        console.log(this.filas);
        this.pagina = this.filas.filter(f => f.Mostrar);
        console.log(this.pagina);
    }

    private hacerPaginacion(): void {
        console.log(this.filasPorPagina);
    }
}
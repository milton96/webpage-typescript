import { ITabla, IColumna, IFila } from '../interfaces/itabla';
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
        dataTabla.tabla.Filas.map(fila => {
            fila.Celdas = fila.Celdas.sort((a, b) => a.Posicion > b.Posicion ? 1 : -1)
        });
        this.filas = dataTabla.tabla.Filas;

        // si ya tiene un thead se quita
        const thead = this.tablaHtml.querySelector("thead");
        if (thead) thead.remove();

        this.theadHtml = document.createElement("thead");
        this.tablaHtml.appendChild(this.theadHtml);
        this.agregarColumnas();

        // actualizar filas de la tabla
        this.actualizarFilas();
    }

    private actualizarFilas(): void {        
        this.tbodyHtml = document.createElement("tbody");

        this.tablaHtml.querySelector("tbody")?.remove();
        this.tablaHtml.appendChild(this.tbodyHtml);
        
        this.agregarFilas();
        this.hacerPaginacion();
    }

    private agregarColumnas(): void {
        const tr = this.theadHtml?.insertRow();
        this.columnas.forEach((col, index) => {
            let th = this.crearTh(col);
            tr?.appendChild(th);
        });
    }

    private agregarFilas(): void {
        this.pagina = this.filas.filter(f => f.Mostrar);

        this.pagina.forEach((fila) => {
            let row = document.createElement("tr");
            fila.Celdas.forEach((celda, index) => {
                let td = document.createElement("td");
                td.innerText = celda.Valor;
                row.appendChild(td);
            });
            this.tbodyHtml?.appendChild(row);
        });
    }

    private hacerPaginacion(): void {
        console.log(this.filasPorPagina);
    }

    private crearTh(columna: IColumna): HTMLTableCellElement {
        let th = document.createElement("th"),
        span = document.createElement("span");
        
        span.innerText = columna.Valor;
        th.appendChild(span);

        if (columna.Ordenar) {
            let a = this.crearAicon("arrow-down");
            a.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Ordenar columna ${columna.Posicion} - ${columna.Valor}`);
            });
            th.appendChild(a);
        }

        if (columna.Filtrar) {
            let a = this.crearAicon("search");
            a.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Filtrar columna ${columna.Posicion} - ${columna.Valor}`);
            });
            th.appendChild(a);
        }
        return th;
    }

    private crearAicon(icon: string): HTMLAnchorElement {
        let a = document.createElement("a");
        a.href = "#";
        a.setAttribute("uk-icon", icon);
        return a;
    }
}
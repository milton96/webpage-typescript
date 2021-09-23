export interface ITabla {
    tabla: Tabla
}

interface Tabla {
    Columnas:    IColumna[];
    Filas:       IFila[];
    FilasPagina: number;
}

export interface IColumna {
    Posicion:   number;
    Valor:      string;
    Filtrar:    boolean;
    Ordenar:    boolean;
    TipoFiltro: string;
}

export interface IFila {
    Celdas:  Celda[];
    Mostrar: boolean;
}

interface Celda {
    Posicion: number;
    Valor:    string;
}
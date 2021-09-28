"use strict";

document.addEventListener('DOMContentLoaded', function (_) {
  var table = new Tabla("tabla-sample", "https://localhost:44364/api/tabla-prueba");
});
var tabla = {
  "Columnas": [{
    "Posicion": 1,
    "Valor": "Columna 1",
    "Filtrar": true,
    "Ordenar": false,
    "TipoFiltro": "texto"
  }, {
    "Posicion": 2,
    "Valor": "Columna 2",
    "Filtrar": true,
    "Ordenar": false,
    "TipoFiltro": "texto"
  }, {
    "Posicion": 3,
    "Valor": "Columna 3",
    "Filtrar": true,
    "Ordenar": false,
    "TipoFiltro": "texto"
  }, {
    "Posicion": 4,
    "Valor": "Columna 4",
    "Filtrar": false,
    "Ordenar": true,
    "TipoFiltro": "texto"
  }, {
    "Posicion": 5,
    "Valor": "Columna 5",
    "Filtrar": false,
    "Ordenar": true,
    "TipoFiltro": "texto"
  }],
  "Filas": [{
    "Celdas": [{
      "Posicion": 5,
      "Valor": "Fila 1 Columna 5"
    }, {
      "Posicion": 2,
      "Valor": "Fila 1 Columna 2"
    }, {
      "Posicion": 4,
      "Valor": "Fila 1 Columna 4"
    }, {
      "Posicion": 1,
      "Valor": "Fila 1 Columna 1"
    }, {
      "Posicion": 3,
      "Valor": "Fila 1 Columna 3"
    }],
    "Mostrar": true
  }, {
    "Celdas": [{
      "Posicion": 3,
      "Valor": "Fila 2 Columna 3"
    }, {
      "Posicion": 2,
      "Valor": "Fila 2 Columna 2"
    }, {
      "Posicion": 5,
      "Valor": "Fila 2 Columna 5"
    }, {
      "Posicion": 4,
      "Valor": "Fila 2 Columna 4"
    }, {
      "Posicion": 1,
      "Valor": "Fila 2 Columna 1"
    }],
    "Mostrar": false
  }, {
    "Celdas": [{
      "Posicion": 5,
      "Valor": "Fila 3 Columna 5"
    }, {
      "Posicion": 2,
      "Valor": "Fila 3 Columna 2"
    }, {
      "Posicion": 4,
      "Valor": "Fila 3 Columna 4"
    }, {
      "Posicion": 3,
      "Valor": "Fila 3 Columna 3"
    }, {
      "Posicion": 1,
      "Valor": "Fila 3 Columna 1"
    }],
    "Mostrar": true
  }, {
    "Celdas": [{
      "Posicion": 1,
      "Valor": "Fila 4 Columna 1"
    }, {
      "Posicion": 5,
      "Valor": "Fila 4 Columna 5"
    }, {
      "Posicion": 4,
      "Valor": "Fila 4 Columna 4"
    }, {
      "Posicion": 2,
      "Valor": "Fila 4 Columna 2"
    }, {
      "Posicion": 3,
      "Valor": "Fila 4 Columna 3"
    }],
    "Mostrar": true
  }, {
    "Celdas": [{
      "Posicion": 1,
      "Valor": "Fila 5 Columna 1"
    }, {
      "Posicion": 5,
      "Valor": "Fila 5 Columna 5"
    }, {
      "Posicion": 4,
      "Valor": "Fila 5 Columna 4"
    }, {
      "Posicion": 2,
      "Valor": "Fila 5 Columna 2"
    }, {
      "Posicion": 3,
      "Valor": "Fila 5 Columna 3"
    }],
    "Mostrar": true
  }],
  "FilasPagina": 10
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tabla = /*#__PURE__*/function () {
  /**
   * inicializa una nueva instancia para tabla
   * @param idTabla identificador de la tabla o elemnto html table
   * @param source url de donde se obtendran los datos o los datos
   */
  function Tabla(idTabla, source) {
    _classCallCheck(this, Tabla);

    _defineProperty(this, "tablaHtml", void 0);

    _defineProperty(this, "tbodyHtml", void 0);

    _defineProperty(this, "theadHtml", void 0);

    _defineProperty(this, "filas", void 0);

    _defineProperty(this, "columnas", void 0);

    _defineProperty(this, "filasPorPagina", void 0);

    _defineProperty(this, "pagina", void 0);

    _defineProperty(this, "paginaActual", void 0);

    _defineProperty(this, "ulPaginacion", void 0);

    _defineProperty(this, "minFila", void 0);

    _defineProperty(this, "maxFila", void 0);

    if (typeof idTabla === 'string') {
      this.tablaHtml = document.getElementById(idTabla);
      this.ulPaginacion = document.getElementById("".concat(idTabla, "-paginacion"));
    } else {
      this.tablaHtml = idTabla;
      this.ulPaginacion = document.getElementById("".concat(idTabla.id, "-paginacion"));
    }

    this.filas = [];
    this.columnas = [];
    this.pagina = [];
    this.filasPorPagina = 5;
    this.paginaActual = 1;
    this.minFila = 0;
    this.maxFila = 0;

    if (this.tablaHtml) {
      if (typeof source === 'string') this.obtenerDatos(source);else this.inicializarTabla(source);
    }
  }

  _createClass(Tabla, [{
    key: "obtenerDatos",
    value: function obtenerDatos(url) {
      var _this = this;

      if (!this.tablaHtml) return;
      var config = {
        method: metodos.post,
        url: url
      };
      hacerPeticion(config).then(function (res) {
        _this.inicializarTabla(res);
      })["catch"](function (err) {
        console.error(err);
      });
    }
  }, {
    key: "inicializarTabla",
    value: function inicializarTabla(dataTabla) {
      if (!this.tablaHtml) return;
      this.filasPorPagina = dataTabla.tabla.FilasPagina;
      this.maxFila = this.filasPorPagina;
      this.columnas = dataTabla.tabla.Columnas.sort(function (a, b) {
        return a.Posicion > b.Posicion ? 1 : -1;
      });
      dataTabla.tabla.Filas.map(function (fila) {
        fila.Celdas = fila.Celdas.sort(function (a, b) {
          return a.Posicion > b.Posicion ? 1 : -1;
        });
      });
      this.filas = dataTabla.tabla.Filas; // si ya tiene un thead se quita

      var thead = this.tablaHtml.querySelector("thead");
      if (thead) thead.remove();
      this.theadHtml = document.createElement("thead");
      this.tablaHtml.appendChild(this.theadHtml);
      this.agregarColumnas(); // actualizar filas de la tabla

      this.actualizarFilas();
    }
  }, {
    key: "actualizarFilas",
    value: function actualizarFilas() {
      var _this$tablaHtml$query;

      this.tbodyHtml = document.createElement("tbody");
      (_this$tablaHtml$query = this.tablaHtml.querySelector("tbody")) === null || _this$tablaHtml$query === void 0 ? void 0 : _this$tablaHtml$query.remove();
      this.tablaHtml.appendChild(this.tbodyHtml);
      this.agregarFilas();
      this.hacerPaginacion();
    }
  }, {
    key: "agregarColumnas",
    value: function agregarColumnas() {
      var _this$theadHtml,
          _this2 = this;

      var tr = (_this$theadHtml = this.theadHtml) === null || _this$theadHtml === void 0 ? void 0 : _this$theadHtml.insertRow();
      this.columnas.forEach(function (col, index) {
        var th = _this2.crearTh(col);

        tr === null || tr === void 0 ? void 0 : tr.appendChild(th);
      });
    }
  }, {
    key: "agregarFilas",
    value: function agregarFilas() {
      var _this3 = this;

      this.pagina = this.filas.filter(function (f) {
        return f.Mostrar;
      });
      this.pagina = this.pagina.slice(this.minFila, this.maxFila);
      this.pagina.forEach(function (fila) {
        var _this3$tbodyHtml;

        var row = document.createElement("tr");
        fila.Celdas.forEach(function (celda, index) {
          var td = document.createElement("td");
          td.innerText = celda.Valor;
          row.appendChild(td);
        });
        (_this3$tbodyHtml = _this3.tbodyHtml) === null || _this3$tbodyHtml === void 0 ? void 0 : _this3$tbodyHtml.appendChild(row);
      });
    }
  }, {
    key: "hacerPaginacion",
    value: function hacerPaginacion() {
      var _this4 = this;

      this.ulPaginacion.innerHTML = "";
      var numeroPaginas = this.numeroPaginas(); // página anterior

      var aAnterior = this.crearAicon("chevron-left"),
          liAnterior = document.createElement("li");
      aAnterior.addEventListener("click", function (e) {
        e.preventDefault();

        _this4.cambiarPagina(--_this4.paginaActual);
      });
      liAnterior.appendChild(aAnterior);
      this.ulPaginacion.appendChild(liAnterior); // números de página

      for (var i = 0; i < numeroPaginas; i++) {
        var paginaActual = i + 1;
        var li = this.crearNumPagina(paginaActual);
        if (paginaActual == this.paginaActual) li.classList.add("activa");
        this.ulPaginacion.appendChild(li);
      } // página siguiente


      var aSiguiente = this.crearAicon("chevron-right"),
          liSiguiente = document.createElement("li");
      aSiguiente.addEventListener("click", function (e) {
        e.preventDefault();

        _this4.cambiarPagina(++_this4.paginaActual);
      });
      liSiguiente.appendChild(aSiguiente);
      this.ulPaginacion.appendChild(liSiguiente);
    }
  }, {
    key: "crearTh",
    value: function crearTh(columna) {
      var th = document.createElement("th"),
          span = document.createElement("span");
      span.innerText = columna.Valor;
      th.appendChild(span);

      if (columna.Ordenar) {
        var a = this.crearAicon("arrow-down");
        a.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("Ordenar columna ".concat(columna.Posicion, " - ").concat(columna.Valor));
        });
        th.appendChild(a);
      }

      if (columna.Filtrar) {
        var _a = this.crearAicon("search");

        _a.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("Filtrar columna ".concat(columna.Posicion, " - ").concat(columna.Valor));
        });

        th.appendChild(_a);
      }

      return th;
    }
  }, {
    key: "crearAicon",
    value: function crearAicon(icon) {
      var a = document.createElement("a");
      a.href = "#";
      a.setAttribute("uk-icon", icon);
      return a;
    }
  }, {
    key: "cambiarPagina",
    value: function cambiarPagina(numeroPagina) {
      if (numeroPagina < 1) numeroPagina = 1;
      var numeroPaginas = this.numeroPaginas();
      if (numeroPagina > numeroPaginas) numeroPagina = numeroPaginas;
      this.minFila = numeroPagina * this.filasPorPagina - this.filasPorPagina, this.maxFila = numeroPagina * this.filasPorPagina;
      if (this.maxFila > this.filas.filter(function (f) {
        return f.Mostrar;
      }).length) this.maxFila = this.filas.filter(function (f) {
        return f.Mostrar;
      }).length;
      this.paginaActual = numeroPagina;
      this.actualizarFilas();
    }
  }, {
    key: "numeroPaginas",
    value: function numeroPaginas() {
      return Math.ceil(this.filas.filter(function (f) {
        return f.Mostrar;
      }).length / this.filasPorPagina);
    }
  }, {
    key: "crearNumPagina",
    value: function crearNumPagina(numero) {
      var _this5 = this;

      var li = document.createElement("li"),
          a = document.createElement("a");
      a.innerText = "".concat(numero);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        _this5.paginaActual = numero;

        _this5.cambiarPagina(numero);
      });
      li.appendChild(a);
      return li;
    }
  }]);

  return Tabla;
}();
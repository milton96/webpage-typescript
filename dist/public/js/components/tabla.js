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

    if (typeof idTabla === 'string') this.tablaHtml = document.getElementById(idTabla);else this.tablaHtml = idTabla;
    this.filas = [];
    this.columnas = [];
    this.pagina = [];
    this.filasPorPagina = 5;
    this.paginaActual = 1;

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
      this.columnas = dataTabla.tabla.Columnas.sort(function (a, b) {
        return a.Posicion > b.Posicion ? 1 : -1;
      });
      this.filas = dataTabla.tabla.Filas;
      this.actualizarTabla();
    }
  }, {
    key: "actualizarTabla",
    value: function actualizarTabla() {
      this.theadHtml = document.createElement("thead");
      this.tbodyHtml = document.createElement("tbody");
      this.tablaHtml.innerHTML = "";
      this.tablaHtml.appendChild(this.theadHtml);
      this.tablaHtml.appendChild(this.tbodyHtml);
      this.agregarColumnas();
      this.agregarFilas();
      this.hacerPaginacion();
    }
  }, {
    key: "agregarColumnas",
    value: function agregarColumnas() {
      var _this$theadHtml;

      var tr = (_this$theadHtml = this.theadHtml) === null || _this$theadHtml === void 0 ? void 0 : _this$theadHtml.insertRow();
      this.columnas.forEach(function (col, index) {
        var th = document.createElement("th");
        th.innerText = col.Valor;
        th.addEventListener("click", function (e) {
          console.log("Posicion: ".concat(col.Posicion, " - Valor: ").concat(col.Valor));
        });
        tr === null || tr === void 0 ? void 0 : tr.appendChild(th);
      });
    }
  }, {
    key: "agregarFilas",
    value: function agregarFilas() {
      console.log(this.filas);
      this.pagina = this.filas.filter(function (f) {
        return f.Mostrar;
      });
      console.log(this.pagina);
    }
  }, {
    key: "hacerPaginacion",
    value: function hacerPaginacion() {
      console.log(this.filasPorPagina);
    }
  }]);

  return Tabla;
}();
"use strict";

document.addEventListener('DOMContentLoaded', function (_) {
  console.log("Contenido HTML Listo");
  var btnModal = document.querySelector("button");
  var modal = UIkit.modal("#modal-example");
  btnModal === null || btnModal === void 0 ? void 0 : btnModal.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("click en boton");
    modal.show();
  });
  var table = new Tabla("tabla-sample", "https://localhost:44340/api/tabla-prueba");
});
var metodos = {
  get: 'GET',
  post: 'POST'
};

function hacerPeticion(config) {
  return new Promise(function (resolve, reject) {
    axios(config).then(function (res) {
      resolve(res.data);
    })["catch"](function (err) {
      console.error(err);
      reject(err);
    });
  });
}
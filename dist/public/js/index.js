"use strict";

document.addEventListener('DOMContentLoaded', function (_) {
  console.log("Contenido HTML Listo");
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
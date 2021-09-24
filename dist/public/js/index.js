"use strict";

document.addEventListener('DOMContentLoaded', function (_) {
  var btnModal = document.querySelector("button");
  var modal = UIkit.modal("#modal-example");
  btnModal === null || btnModal === void 0 ? void 0 : btnModal.addEventListener('click', function (e) {
    e.preventDefault();
    modal.show();
  });
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
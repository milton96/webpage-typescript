"use strict";

document.addEventListener('DOMContentLoaded', function (_) {
  console.log("Peticiones a json placeholder");
  var configUnPost = {
    method: metodos.get,
    url: 'https://jsonplaceholder.typicode.com/posts/1'
  };
  hacerPeticion(configUnPost).then(function (res) {
    console.log(res);
  });
  var configListaPost = {
    method: metodos.get,
    url: 'https://jsonplaceholder.typicode.com/posts'
  };
  hacerPeticion(configListaPost).then(function (res) {
    console.log(res.length);
  });
});
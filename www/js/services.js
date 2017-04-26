angular.module('starter.services', [])
.factory('tarefasService', function($http){
  // tabela pedido
  function getPedido(){
    return $http.get("http://localhost:3001/consulta");
  }

  function addPedido(dados){
    return $http.post("http://localhost:3001/insere", dados);
  }
  function alterPedido(dados) {
    return $http.put("http://localhost:3001/atualiza", dados);
  }
  function deletePedido(dados) {
    return $http.delete("http://localhost:3001/remove/" + dados.id_pedido);
  }
  //conulta estoque
  function getEstoque(){
    return $http.get("http://localhost:3001/consultaEstoque");
  }

  return {
    getPedido: getPedido,
    addPedido: addPedido,
    alterPedido: alterPedido,
    deletePedido: deletePedido,
    //retorno da consulta ao estoque
    getEstoque: getEstoque
  };

});

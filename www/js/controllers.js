angular.module('starter.controllers', ['starter.services'])

.controller('HomeCtrl', function($scope, $rootScope, tarefasService, $ionicPopup,$ionicListDelegate) {

  $scope.pedidos = [];
  $scope.pedido = {};
  $scope.estoque = {};

  function carregaPedido(){
    tarefasService.getPedido().then(function(resp) {
      $scope.pedidos = resp.data;
      angular.forEach($scope.pedidos,function(pedido) {
        calculaPedido(pedido);
      })
      calculaEstoque();
    })
  }

  function arredondar(nr) {
    if (nr.indexOf(',') != -1) nr = nr.replace(',', '.');
    nr = parseFloat(nr) * 100;
    return Math.floor(nr) / 100;
  }

  function calculaPedido(pedido) {
    margem = 10;
    placas = 1;
    tecido = 0.4; //1.2;
    espuma = 1.2; //0.4;
    bojos = 8;

    //a espuma deve ser somada com valores usados por todas as cores
    pedido.espuma_necessaria = 0;

    //vermelho
    produzir = pedido.bojo_vermelho * (1+(margem/100));
    placas_necessarias = Math.ceil(produzir/8);
    tecido_vermelho = placas_necessarias * tecido;
    espuma_necessaria = placas_necessarias * espuma;
    bojos_produzidos = placas_necessarias * bojos;
    pedido.tecido_vermelho_necessario = tecido_vermelho.toFixed(2);
    pedido.espuma_necessaria += espuma_necessaria;

    //preto
    produzir = pedido.bojo_preto * (1+(margem/100));
    placas_necessarias = Math.ceil(produzir/8);
    tecido_preto = placas_necessarias * tecido;
    espuma_necessaria = placas_necessarias * espuma;
    bojos_produzidos = placas_necessarias * bojos;
    pedido.tecido_preto_necessario = tecido_preto.toFixed(2);
    pedido.espuma_necessaria += espuma_necessaria;

    //branco
    produzir = pedido.bojo_branco * (1+(margem/100));
    placas_necessarias = Math.ceil(produzir/8);
    tecido_branco = placas_necessarias * tecido;
    espuma_necessaria = placas_necessarias * espuma;
    bojos_produzidos = placas_necessarias * bojos;
    pedido.tecido_branco_necessario = tecido_branco.toFixed(2);
    pedido.espuma_necessaria += espuma_necessaria;

    //transforma o valor numero da espuma para texto
    pedido.espuma_necessaria = pedido.espuma_necessaria.toFixed(2);
  }

  function calculaEstoque(){
    tarefasService.getEstoque().then(function(resp){
      $scope.estoque = resp.data[0];
      angular.forEach($scope.pedidos, function(value){
        $scope.estoque.tecido_vermelho -= +value.tecido_vermelho_necessario;
        $scope.estoque.tecido_preto -= +value.tecido_preto_necessario;
        $scope.estoque.tecido_branco -= +value.tecido_branco_necessario;
        $scope.estoque.espuma -= +value.espuma_necessaria;
      });
    })
  }

  carregaPedido();

  function getItem(pedido, novo){
    $scope.pedido = pedido;
    $ionicPopup.show({
      title:"Novo Pedido",
      scope: $scope,
      template: "Cliente<input type='text' placeholder='Cliente' autofocus='true' ng-model='pedido.nome'>"+
                "Bojo Vermelho<input type='text' placeholder='Quantidade' ng-model='pedido.bojo_vermelho'>"+
                "Bojo Preto<input type='text' placeholder='Quantidade' ng-model='pedido.bojo_preto'>"+
                "Bojo Branco<input type='text' placeholder='Quantidade' ng-model='pedido.bojo_branco'>",
      buttons:[
        {text: "Ok",
        onTap: function(e){
          if (pedido.bojo_vermelho == undefined) pedido.bojo_vermelho = 0;
          if (pedido.bojo_preto == undefined) pedido.bojo_preto = 0;
          if (pedido.bojo_branco == undefined) pedido.bojo_branco = 0;
          if (pedido.id_pedido == null){
           tarefasService.addPedido(pedido).then(function(){
             carregaPedido();
           })
          }
          else{
            tarefasService.alterPedido(pedido).then(function(){
              carregaPedido();
            })
          }
        }},
        {text: "Cancelar"}
      ]
    });
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.onItemremove = function(pedido){
    tarefasService.deletePedido(pedido).then(function() {
      carregaPedido();
    })
  }

  $scope.onClickRemove = function(){
    $scope.removeStatus = !$scope.removeStatus;
  };

  $scope.onItemAdd = function() {
    $scope.pedido = {};
    getItem($scope.pedido, true);
  };

  $scope.onItemEdit = function(pedido) {
   getItem(pedido, false);
  };

})

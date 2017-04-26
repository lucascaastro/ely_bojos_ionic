angular.module('starter.routes', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'pages/home.html',
    controller: 'HomeCtrl'
  })
  
  .state('tab.chat-detail', {
    url: '/chats',
    templateUrl: '',
    controller: ''
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});

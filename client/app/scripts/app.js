'use strict';

angular
  .module('xdojo',[
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'dialogs.main'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/events', {
        templateUrl: 'views/events.html',
        controller: 'EventsCtrl'
      })
      .when('/event', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .when('/event/:id', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['dialogsProvider','$translateProvider',function(dialogsProvider,$translateProvider){
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');

    $translateProvider.translations('pt-BR',{
      DIALOGS_ERROR: 'Erro',
      DIALOGS_ERROR_MSG: 'Ocorreu um erro desconhecido.',
      DIALOGS_CLOSE: 'Fechar',
      DIALOGS_PLEASE_WAIT: 'Por favor, aguarde.',
      DIALOGS_PLEASE_WAIT_ELIPS: 'Por favor, aguarde...',
      DIALOGS_PLEASE_WAIT_MSG: 'Aguardando a operação ser concluída.',
      DIALOGS_PERCENT_COMPLETE: '% Completo',
      DIALOGS_NOTIFICATION: 'Notificação',
      DIALOGS_NOTIFICATION_MSG: 'Notificação de aplicação desconhecido.',
      DIALOGS_CONFIRMATION: 'Confirmação',
      DIALOGS_CONFIRMATION_MSG: 'Confirmação requerida.',
      DIALOGS_OK: 'Ok',
      DIALOGS_YES: 'Sim',
      DIALOGS_NO: 'Não'
    });

    $translateProvider.preferredLanguage('pt-BR');
  }]);

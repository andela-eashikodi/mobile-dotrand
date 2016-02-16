// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dotrand', ['ionic', 'ngCordova', 'dotrand.controllers', 'dotrand.services', 'internationalPhoneNumber'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {      
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  
  window.addEventListener('native.keyboardshow', function(){
    document.body.classList.add('keyboard-open');
  });
  
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider) {
  // $ionicConfigProvider.scrolling.jsScrolling(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('auth', {
      url: '/auth',
      abstract: true,
      templateUrl: 'templates/auth.html',
      controller: 'authCtrl'
    })
    .state('auth.login', {
      url: '/login',
      views: {
        'loginPage': {
          templateUrl: 'templates/login.html',
          controller: 'authCtrl'
        }
      }
    })
    .state('auth.signup', {
      url: '/signup',
      views: {
        'loginPage': {
          templateUrl: 'templates/signup.html',
          controller: 'authCtrl'
        }
      }
    })
    .state('auth.confirm-code', {
      url: '/confirm-code',
      views: {
        'loginPage': {
          templateUrl: 'templates/confirm-code.html',
          controller: 'authCtrl'
        }
      }
    })
    .state('auth.enter-details', {
      url: '/enter-details',
      views: {
        'loginPage': {
          templateUrl: 'templates/enter-details.html',
          controller: 'authCtrl'
        }
      }
    })
    
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  
  // Each tab has its own nav history stack:
  
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');

});

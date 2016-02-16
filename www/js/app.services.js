angular.module('dotrand.services', [])

.factory('Toast', function(){
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "onclick": null,
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  return {
    successToast: function(msg) {
      toastr["success"](msg);
    },
    errorToast: function(msg) {
      toastr["error"](msg);
    }
  }
})

.factory('BaseUrl', function() {
  return 'http://10.0.2.2:2016'
  // return 'http://localhost:2016';
  // return 'https://dotrand-api.herokuapp.com'
})

.factory('User', function($http, BaseUrl) {
  return {
    authenticate: function(info) {
      return $http.post(BaseUrl + '/user/authenticate', info);
    }
  }
})

.factory('Chats', function($cordovaContacts, $ionicPlatform) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: ''
  }];

  return {
    all: function() {
      // document.addEventListener("deviceready", onDeviceReady, false);
      // function onDeviceReady() {
      //     console.log(JSON.stringify(navigator.contacts));
      // }
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

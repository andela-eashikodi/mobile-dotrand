angular.module('dotrand.controllers', [])

.controller('authCtrl', function($scope, $rootScope, $location, $timeout, Toast, User, $cordovaToast) {
  
  $scope.login = function() {
    $location.url('/tab/chats');
    // $scope.loginLoading = true;
    // User.authenticate($scope.loginDetails).then(function(res) {
    //   $scope.loginLoading = false;
    // }, function(err){
    //   $scope.loginLoading = false;
    //   $cordovaToast.show(err.data.message, 'short', 'bottom');
    // });
  };
  
  $scope.resendCode = function() {
    $cordovaToast.show('Confirmation code has been re-sent', 'short', 'bottom');
  };
  
  $scope.confirmCode = function() {
    $timeout(function() {
      $location.url('/auth/enter-details');
    });
  };
  
  $scope.$watch('phone', function(oldVal, newVal) {
    if(oldVal !== newVal) {
      $rootScope.phoneSent = $("#mobile-number").intlTelInput("getNumber");
    }
  });
  
  $scope.enterPhoneNumber = function() {
    if($scope.phone) {
      var intlNumber = $("#mobile-number").intlTelInput("getNumber");
      console.log('fullnumber', intlNumber);
      $timeout(function() {
        $location.url('/auth/confirm-code');
      });
    }
    else {
      $cordovaToast.show('Enter Valid Number', 'short', 'bottom');
    }
  };
  
  $scope.inputNumber = function() {
    $scope.numberInvalid = false;
    $scope.numberTaken = false;
  };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $cordovaContacts, $ionicPlatform) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    var opts = {                                           //search options
      filter : '',                                 // 'Bob'
      multiple: true,                                      // Yes, return any contact that matches criteria
      fields:  [ 'displayName', 'name' ]                   // These are the fields to search for 'bob'.
      // desiredFields: [id];    //return fields.
    };

    if (ionic.Platform.isAndroid()) {
      opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
    }
    
    // console.log(navigator.contacts);
    $cordovaContacts.find(opts).then(function(allContacts) {
      console.log('contacts', JSON.stringify(allContacts, null, 2));
      $scope.chats = allContacts;
    });
  }
  
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

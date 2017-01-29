var app = angular.module('wallpaperApp', []);

app.controller('settingsCtrl', function ($scope, wallpaperService) {

  var remote = require('electron').remote;
  $scope.refreshTime = localStorage.getItem('refreshTime');
  $scope.categories = ['buildings', 'food', 'nature', 'objects', 'people', 'technology'];
  $scope.selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
  var window = remote.getCurrentWindow();


  //close settings window
  $scope.cancel = function() {
    window.hide();
  }

  //save settings in localstorage, reset the timer and update the wallpaper
  $scope.save = function() {
    var selectedCategories = JSON.stringify($scope.selectedCategories);
    localStorage.setItem('refreshTime',$scope.refreshTime);
    localStorage.setItem('selectedCategories',selectedCategories);
    wallpaperService.resetTimer();
    window.hide();
  }

});

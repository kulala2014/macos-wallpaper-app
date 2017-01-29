var app = angular.module('wallpaperApp', []);

app.controller('homeCtrl', function ($scope, wallpaperService) {

  var remote = require('electron').remote;
  var BrowserWindow = require('electron').remote.BrowserWindow;
  $scope.loading = false;

  init();

  //open the settings window
  $scope.openSettings = function() {
    win.show();
  }

  //close the app
  $scope.quit = function() {
    remote.app.quit();
  }

  //download and set the wallpaper
  $scope.getWallpaper = function() {
    $scope.loading = true;
    wallpaperService.getWallpaper().then(function() {
      $scope.loading = false;
    });
  }

  function init() {
    //setting refresh time and categories the first time the user opens the app
    if (localStorage.getItem('refreshTime') === null) {
      localStorage.setItem('refreshTime',1);
    }
    if (localStorage.getItem('selectedCategories') === null) {
      localStorage.setItem('selectedCategories',JSON.stringify(['buildings', 'food', 'nature', 'objects', 'people', 'technology']));
    }

    //init settings page
    win = new BrowserWindow({ width: 450, height: 285, title:'Wallpaper Settings', resizable: false, show:false, frame: false });
    win.loadURL('file://' +  __dirname +  '/settings.html');
    win.on('closed', function() {
      win = null;
    });

    wallpaperService.resetTimer();
  }

});

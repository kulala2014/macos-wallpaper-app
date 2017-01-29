app.service('wallpaperService', function ($timeout, $q) {

  var electron = require('electron');
  var rmdir = require('rmdir');
  var wallpaper = require('wallpaper');
  var webshot = require('webshot');
  var s = this;


  //download and set the wallpaper
  this.getWallpaper = function () {
    var deferred = $q.defer();
    var categories = JSON.parse(localStorage.getItem('selectedCategories'));
    var random = Math.floor(Math.random() * categories.length);
    var mainScreen = electron.screen.getPrimaryDisplay();
    var h = (mainScreen.size.height * 2);
    var w = (mainScreen.size.width * 2);
    var filePath = new Date().toLocaleString();
    filePath = filePath.replace(/\D/g,'');
    filePath = __dirname+'/img/wallpapers/'+filePath+'.jpg';
    var options = {
      screenSize: {
        width: w,
        height: h
      },
      shotSize: {
        width: w,
        height: h
      },
      quality: 100,
      streamType: 'jpg'
    }

    //use the node webshot package to save the image from unsplash
    webshot('https://source.unsplash.com/category/'+categories[random]+'/'+w+'x'+h, filePath, options, function(err) {
      deferred.resolve();
      s.setWallpaper(filePath);
    });


    s.resetTimer();
    return deferred.promise;
  };

  //use the node wallpaper.js package to set the saved image as the wallpaper, then delete it
  this.setWallpaper = function (filePath) {
    wallpaper.set(filePath).then(() => {
      rmdir(__dirname+'/img/wallpapers', function (err, dirs, files) { }); //delete local files
    });
  };

  //timer to reset the wallpaper every hour, day, or week
  this.resetTimer = function () {
    var time = (localStorage.getItem('refreshTime') * 3600000);

    $timeout(function(){
      s.getWallpaper();
    }, time);
  };

});

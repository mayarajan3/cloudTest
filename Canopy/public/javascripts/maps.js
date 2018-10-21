//AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw

var apikey = "AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw";
//Specifies how much to offset each image in the grid. Calculated by finding the difference
//between the lattitude of the edge of the map section and the center. Recalculate new offset if zoom level is changed. 
var offset = 0.004299*2;
//https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=YOUR_API_KEY
var globalGridSize = 3;
var imageArr = createImgArray(2.423850, 99.314919, 16, 400, apikey);
var base64Arr = createBase64Array(imageArr);

function generateURI(lat,long,zoom,size,key) {
    return 'https://maps.googleapis.com/maps/api/staticmap?' + 'center='+ lat + ',' + long + "&zoom=" + zoom
    + "&size=" + size + "x" + size + "&format=jpg" + "&maptype=satellite" + "&key=" + key;
}

function createImgArray(originLat, originLong, zoom, size, key) {
    var arr = new Array();
    for(var i=0; i<globalGridSize; i++){
        arr[i] = new Array();
        for(var j=0; j<globalGridSize; j++){
            var lat = originLat - i*offset;
            var long = originLong + j*offset;
            arr[i][j] = generateURI(lat, long, zoom, size, key);
        }
    }
    return arr;
}

function createBase64Array(arr){
    var tempArr = new Array(globalGridSize);
    for(var i=0; i<globalGridSize; i++){
        tempArr[i] = new Array(globalGridSize);
        for(var j=0; j<globalGridSize; j++){
            //tempArr[i][j]=
       }
    }
     return tempArr;
 }

 function toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }
  
  toDataURL(
    'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0',
    function(dataUrl) {
      console.log('RESULT:', dataUrl)
    }
  )

$(document).ready(function(e) {
    for(var i=globalGridSize-1; i>=0; i--){
        for(var j=globalGridSize-1; j>=0; j--){
            $('.help').after("<img src=" + imageArr[i][j] + " >");
        }
    }
});

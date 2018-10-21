//AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw

var apikey = "AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw";
//Specifies how much to offset each image in the grid. Calculated by finding the difference
//between the lattitude of the edge of the map section and the center. Recalculate new offset if zoom level is changed. 
var offset = 0.004299*2;
//https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=YOUR_API_KEY
var globalGridSize = 3;

function generateURI(lat,long,zoom,size,key) {
    return 'https://maps.googleapis.com/maps/api/staticmap?' + 'center='+ lat + ',' + long + "&zoom=" + zoom
    + "&size=" + size + "x" + size + "&maptype=satellite" + "&key=" + key;
}

function createImgArray(gridSize, originLat, originLong, zoom, size, key) {
    var arr = new Array();
    for(var i=0; i<gridSize; i++){
        arr[i] = new Array();
        for(var j=0; j<gridSize; j++){
            var lat = originLat - i*offset;
            var long = originLong + j*offset;
            arr[i][j] = generateURI(lat, long, zoom, size, key);
        }
    }
    return arr;
}

console.log(createImgArray(globalGridSize, 2.423850, 99.314919, 16, 400, apikey));

$(document).ready(function(e) {
    var arr = createImgArray(globalGridSize, 2.423850, 99.314919, 16, 400, apikey);
    for(var i=globalGridSize-1; i>=0; i--){
        for(var j=globalGridSize-1; j>=0; j--){
            $('.help').after("<img src=" + arr[i][j] + " >");
        }
    }
});
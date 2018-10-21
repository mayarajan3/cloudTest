var apikey = "AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw";
//Specifies how much to offset each image in the grid. Calculated by finding the difference
//between the lattitude of the edge of the map section and the center. Recalculate new offset if zoom level is changed. 
var offset = 0.004299*2;
//https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=YOUR_API_KEY
var globalGridSize = 3;
var imageArr=createImgArray;

//var imageData = "";

function clicky () {
    displayImage($('#uploadBtn')[0]);
    encodeImageFileAsURL($('#uploadBtn')[0]);
    var file = {"image" : imageData};
    $.post("/upload", file, function(data, status){
        $('#fileUpload').html(data);
    }, "json");
}

/*function clicky2 () {
    imageArr = createImgArray($("#latCoord").val(), $("#longCoord").val(), 16, 400, apikey);
    $.post("/uploadCoords", {imageArr:imageArr}, function(data, status){
        //console.log(data);
        var dataArray = $.map(data, function (item) {
            return item;
        });
        //console.log(dataArray[8]);
        $('#testtest').html(dataArray[8]);
    }, "json");
}*/

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      imageData = reader.result;
    }
    reader.readAsDataURL(file);
  }

  function displayImage(element) {

    var file = element.files[0];
    var reader  = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
        var image = document.createElement("img");
        // the result image data
        image.src = e.target.result;
        image.style = "width:400px; height:400px;margin-bottom:15px; border-radius:3px;text-align:center";
        image.class = "userImage";
        $('.helper').empty();
        $('.helper').append(image);
     }
     // you have to declare the file loading
     reader.readAsDataURL(file);
 }
  
//////////// Image Grid


function generateURI(lat,long,zoom,size,key) {
    return 'https://maps.googleapis.com/maps/api/staticmap?' + 'center='+ lat + ',' + long + "&zoom=" + zoom
    + "&size=" + size + "x" + size + "&format=jpg" + "&maptype=satellite" + "&key=" + key;
}

function createImgArray(originLat, originLong, zoom, size, key) {
    var arr = new Array();
    for(var i=0; i<globalGridSize; i++){
        arr[i] = new Array();
        for(var j=0; j<globalGridSize; j++){
            var lat = +originLat - i*offset;
            var long = +originLong + j*offset;
            arr[i][j] = generateURI(lat, long, zoom, size, key);
        }
    }
    return arr;
}

$(document).ready(function(e) {
    $("#hello").click(function() {
        $('#testtest').empty();
        console.log($("#latCoord").val()+ "   "+$("#longCoord").val());
        //var arr = createImgArray(2.423850, 99.314919, 16, 400, apikey);
        var arr = createImgArray($("#latCoord").val(), $("#longCoord").val(), 16, 400, apikey);
        console.log(arr);
        for(var i=0; i<globalGridSize; i++){
            for(var j=0; j<globalGridSize; j++){
    
                $('#testtest').append("<img src=" + arr[i][j] + " style='width:200px;margin-bottom:-2px;margin-top:-2px; !important;padding;0' >");
            }
        }
    });
});

//Test Coords
//2.423850, 99.314919


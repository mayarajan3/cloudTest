//AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw

var apikey = "AIzaSyD1kTgXzQV20Ab_hXTML1AVWCoETfh4iCw";
//https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=YOUR_API_KEY

function generateURI(lat,long,zoom,size,key) {
    return 'https://maps.googleapis.com/maps/api/staticmap?' + 'center='+ lat + ',' + long + "&zoom=" + zoom
    + "&size=" + size + "x" + size + "&maptype=satellite" + "&key=" + key;
}

var test = generateURI(-0.738975, -78.371154, 16, 400, apikey);
$('button').after("<img src=" + test + ">");
console.log(test);


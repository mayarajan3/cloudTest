var imageData = '';

function clicky () {
    encodeImageFileAsURL($('#uploadBtn')[0]);
    var file = {"image" : imageData};
    $.post("/upload", file, function(data, status){
        $('p').html(data);
    }, "json");
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      imageData = reader.result;
    }
    reader.readAsDataURL(file);
  }


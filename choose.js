var sourceImageUrl, blobUrl;
var closeModal = document.getElementById('hide_modal');
var fd = new FormData();

//getting blob from image file
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
            
        reader.onload = function (e) {
            document.getElementById("sourceImage").src = e.target.result;
            blobUrl = document.getElementById("sourceImage").src;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//making blob from dataURL
//to create base64 octet-stream
//from https://github.com/akrennmair/ng-pdfviewer/pull/15/files/c1a9d16aff3e63de2351afb097bd350a2ac20f7d?diff=split
function makeblob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
}

//image change handler
$("#img").change(function(){
    readURL(this);
});

//button click for local image handler
document.getElementById('processImageUpload').addEventListener("click", function() {
    //Processing Image with the large binary object as the picture is a local upload
    processImage(makeblob(blobUrl), "application/octet-stream", false);
});

//modal close event handler
closeModal.addEventListener("click", function(){
   err_modal.style.display = "none";
});

//web image change handler
//assigns preview image source to web source
$("#webUrl").change(function(){
    document.getElementById("sourceImage").src = this.value;
});

//web image handler 2
//sends the url to the Computer Vision server with a json header
document.getElementById('processImageWeb').addEventListener("click", function() {
    //Processing Image with web address
    var sourceImageUrl = document.getElementById("webUrl").value;
    var url = '{"url": ' + '"' + sourceImageUrl + '"}';
    //alert(url);
    processImage(url, "application/json", false);
})


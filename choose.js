var sourceImageUrl, blobUrl;
var analyzeImage = document.getElementById('processImage');
var closeModal = document.getElementById('hide_modal');
var fd = new FormData();

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

makeblob = function (dataURL) {
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

$("#chooseImage").change(function(){
    readURL(this);
});

analyzeImage.addEventListener("click", processImage);

closeModal.addEventListener("click", function(){
   err_modal.style.display = "none"; 
});
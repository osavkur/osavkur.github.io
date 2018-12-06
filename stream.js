var str;
var video;
var streamObj = null;
//only start on document ready event to make sure all DOM content is loaded
$(document).ready(function(){
    //unrelated styling call because of onload function
    stylingDropdown($('#input').val());
    //handles starting and stopping of stream
    video = document.getElementById("videoElement");
    $('#processImageStream').click(function(){
        startStream(true);
        str = window.setInterval(function() {
            takeSnapshot(true);
        }, 4000);
    });
    $('#processPhoneStream').click(function(){
        startStream(false);
        str = window.setInterval(function() {
            takeSnapshot(false);
        }, 4000);
    });
    $('#stopProcessStream').click(function(){
       clearInterval(str);
       if(streamObj)
       {
           streamObj.getTracks().forEach(function(track){
               track.stop();
           });
       }
       streamObj = null;
       video.src = "";
    });
});

//stream start function
//requires webcam permissions
function startStream(webcam)
{
    if(webcam)
    {
        //checks for support
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.mediaDevices.getUserMedia) {       
            navigator.mediaDevices.getUserMedia({video: true})
                .then(function(stream){
                    streamObj = stream;
                    video.srcObject = stream;
                })
                .catch(function(e){
                    alert(`Something went wrong whilst starting the stream.
                           This is the error we caught: `+e.toString());
                });
        }
    }
}
    
//clunky way of taking a screenshot of the webcam stream every certain interval
//and analyzing that
//code taken from: https://jsfiddle.net/dannymarkov/cuumwch5/
function takeSnapshot(webcam){
    // Here we're using a trick that involves a hidden canvas element.
    var hidden_canvas = document.getElementById('canvas');
    var context = hidden_canvas.getContext('2d');
    if(webcam)
    {
        var width = video.videoWidth, height = video.videoHeight;
        if (width && height) {
            
            // Setup a canvas with the same dimensions as the video.
            hidden_canvas.width = width;
            hidden_canvas.height = height;
                
            // Make a copy of the current frame in the video on the canvas.
            context.drawImage(video, 0, 0, width, height);
            
            // Turn the canvas image into a dataURL to call the processing image function
            processImage(makeblob(hidden_canvas.toDataURL('image/png')), "application/octet-stream", true);
        }
    }
}
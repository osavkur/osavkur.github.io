//controls the appearance of all of the buttons and the dropdown menu
$('#input').change(function(){
   var input = this.value;
   stylingDropdown(input);
});

//Links:
//https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYaXTshU4U8Ph5Uv3ySVs4N1mrQWNGP0hkcCwx8Pcx6FhGrE0dvQ
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAqqi2Z6Fmbxuc4pTb51_9wnVGTwqFurYPtOfzJr8ssdKnuNdAIw
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFG-KP7QEgYbkfyyj77GOQS_WlzGSWPM9abjmuNpM2GutApetR-Q

function stylingDropdown(input){
    if (input === "none") {
        document.getElementById("chooseImage").style.display="none";
        
        document.getElementById("webImage").style.display="none";
        
        $('.stream').hide();        
        
    }
    else if (input === "upload") {
        document.getElementById("chooseImage").style.display="block";

        document.getElementById("webImage").style.display="none";
        
        $('.stream').hide();        
    }
    else if (input === "webImage") {
        document.getElementById("chooseImage").style.display="none";
        
        document.getElementById("webImage").style.display="block";

        $('.stream').hide();
        
    }
    else if (input === "stream") {
        document.getElementById("chooseImage").style.display="none";
        
        document.getElementById("webImage").style.display="none";
        $("#imageDiv").hide();
        $('.stream').show();
    }
}
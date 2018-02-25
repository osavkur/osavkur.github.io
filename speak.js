function speak(text) {
    responsiveVoice.setDefaultVoice("US English Female");
    var connectedText = text[0];
    for (var i = 1; i < text.length; i++) {
        connectedText += text[i]
    }
    console.log(connectedText);
    if(responsiveVoice.voiceSupport()) {
        if(responsiveVoice.isPlaying()) {
            responsiveVoice.cancel();
        }
        responsiveVoice.speak(connectedText);
    } else {
        alert("Your browser does not support responsive.js");
    }
}
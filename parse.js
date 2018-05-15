var parsed;
var xhr = new XMLHttpRequest();
var err_modal = document.getElementById('err_modal');
err_modal.style.display = "none";
function processImage() {
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************
    // Replace the subscriptionKey string value with your valid subscription key.
    var subscriptionKey = "506ab9d261594494a48a08c59afc944a";
    // Replace or verify the region.
    //
    // You must use the same region in your REST API call as you used to obtain your subscription keys.
    // For example, if you obtained your subscription keys from the westus region, replace
    // "westcentralus" in the URI below with "westus".
    //
    // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
    // a free trial subscription key, you should not need to change this region.
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color,Tags",
        "language": "en",
    };
        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),
            
            processData: false,
            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: makeblob(blobUrl),
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            speakSentences(data);
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
}
        
function speakSentences(jsonTxt)
{
    var genCaption = jsonTxt.description.captions[0].text+".";
    var updatedTags = [];
    var colorString;
    var tagsString = " And the picture contains these features: ";
    for(var i = 0;i<jsonTxt.tags.length;i++)
    {
        if((jsonTxt.tags[i].confidence*100) >= 50)
        {
            updatedTags[i] = jsonTxt.tags[i].name;
        }
    }
    if(updatedTags.length === 0)
        tagsString = "And there were no discernable features to determine above 50 percent confidence.";
    for(var j = 0;j<updatedTags.length;j++)
    {
        if(j!==(updatedTags.length-1))
            tagsString = tagsString + updatedTags[j] + ", ";
        else
            tagsString = tagsString +" and "+ updatedTags[j] + ".";
    }
    if(jsonTxt.color.dominantColorForeground !== jsonTxt.color.dominantColorBackground)
    {
        colorString = "And the main foreground color is: "+jsonTxt.color.dominantColorForeground+
                      ". While the main background color is: "+jsonTxt.color.dominantColorBackground+".";
    }
    speak([genCaption,tagsString,colorString]);
}

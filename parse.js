var parsed;
var err_modal = document.getElementById('err_modal');
var subscriptionKey = "a10817c2ee29417d9e1a4f0e4933ee6e";
err_modal.style.display = "none";
var buffer = [];
//sending the request to the Microsoft API using Ajax
function processImage(dataToProcess, datatype, streamParam) {
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
                xhrObj.setRequestHeader("Content-Type", datatype);
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: dataToProcess,
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            speakSentences(data, streamParam);
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
}
 
//calls the text to audio API but formats the data returned first      
function speakSentences(jsonTxt, streamParam)
{
    console.log(jsonTxt);
    try
    {
        var genCaption = jsonTxt.description.captions[0].text + ".";
    }
    catch(e)
    {
        console.log(e);
    }
    var updatedTags = [];
    var colorString;
    var tagsString = " And the picture contains these features: ";
    //jsonTxt = cleanse(jsonTxt);
    for(var i = 0; i<jsonTxt.tags.length ;i++)
    {
        updatedTags[i] = jsonTxt.tags[i].name;
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
        colorString = " And the main foreground color is: "+jsonTxt.color.dominantColorForeground+
                      ". While the main background color is: "+jsonTxt.color.dominantColorBackground+".";
    }
    if(streamParam)
    {
        if(buffer.length > 5) {
            buffer = [];
        }
        buffer.push(genCaption);
        speak([buffer[0]]);
        buffer.shift();
    } else {
        speak([genCaption,tagsString,colorString]);
    }
}
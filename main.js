Prediction1="";
Prediction2="";
Webcam.set({
width:350,
height: 322,
image_format :'png',
png_quality:98
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_photograph()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured-image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/f0ZEJ-21Y/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + Prediction1; 
    speak_data_2 = "The second prediction is " + Prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
img = document.getElementById('captured-image');
classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak();
        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";

        }
        if(results[0].label == "Victory")
         { document.getElementById("update_emoji").innerHTML = "&#9996;";
         ; }
         
            if(results[1].label == "Best")
             { document.getElementById("update_emoji2").innerHTML = "&#128077;";}  
             if(results[1].label == "Victory")
              { document.getElementById("update_emoji2").innerHTML = "&#9996;"; }
              
    }
}
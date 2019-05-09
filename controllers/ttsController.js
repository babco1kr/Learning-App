// // const db = require("../models");

// const fs = require('fs');


// const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');



// module.exports = {

//     sayWord: function (req, res) {

//         const textToSpeech = new TextToSpeechV1({
//             iam_apikey: `${process.env.API_KEY}`,
//           });
//           console.log("watson request made");

//         let synthesizeParams = {
//             text: req.body.word,
//             accept: 'audio/mp3',
//             voice: 'en-US_AllisonVoice',
//           };
          
//           textToSpeech.synthesize(synthesizeParams)
//             .then(audio => {

//               audio.pipe(fs.createWriteStream("./client/src/audio/audio.mp3"))
//               res.send("audio file generated");
//               //
//               // audio.pipe(fs.createWriteStream("./client/src/audio/audio.mp3"));
//             })
//             .catch(err => {
//               console.log('error:', err);
//             });
//     }
// }
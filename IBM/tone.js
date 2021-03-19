// importamos las librerias importantes
const express = require('express')
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
var JsonParser = bodyParser.json();
require('dotenv').config();

// de express nos traemos lo necesario
const { json, urlencoded } = express

// creamos nuestra app
const app = express()

// definimos un puerto por el cual escucharemos peticiones
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

// configuraciones para nuestro server
app.use(json())
app.use(urlencoded({ extended: false }))
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  serviceUrl: process.env.URL,
});

app.post('/sending', JsonParser, (req, res) => {
    const comentarios = req.body.comentarios;
    console.log(comentarios);
    const toneParams = {
        toneInput: {
            'text': comentarios
        },
        contentType: 'application/json',
    };
  
    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            console.log("Analizando...");
            auxText = JSON.stringify(toneAnalysis.result);
            res.json(auxText);
        })
        .catch(err => {
            console.log('error:', err);
            res.send(err);
        });
  });

//Get author
app.get('/autor', (req, res) => {
    res.send({ alumno: "JDSV", servicio: "Cloud Foundry IBM" })
});

// iniciamos nuestro server
app.listen(PORT,HOST, () => { console.log(`Server listening on port ${PORT} and host ${HOST}`); })
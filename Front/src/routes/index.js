const router = require('express').Router();
const path = require('path');

//Get author
router.get('/autor', (req, res) => {
    res.send({ alumno: "JDSV", servicio: "ECS en AWS" })
});

//Post for Analyze information
router.post('/sending', (req, res) => {
   const aux = req.body.comentarios;
   console.log(aux);
//    res.sendFile(path.join(__dirname+'/src/html/index.html'));
});

module.exports = router;
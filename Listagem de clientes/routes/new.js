var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('new', {title: "Cadastro de Cliente", action: "/new"});
}
);

router.post('/new', async function(req, res, next){
    const nome = req.body.nome;
    const idade = parseInt(req.body.idade);
    const uf = req.body.uf;
    await db.insert({nome, idade, uf});
    res.redirect('/?new=true');
});

module.exports = router;
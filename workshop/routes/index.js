var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const docs = await db.findAll();
    res.render('index', {docs});
  } catch(err){
    next(err);
  }
});

router.get("/edit/:id", async function(req, res, next){
  try{
    const id = req.params.id;
    const doc =  await db.findOne(id);
    res.render('new', {title:'Edição de Clientes', doc, action:'/edit/' + doc._id});
  }catch(ex){
    res.redirect(`/erro=${ex}`);
  }
});

router.get('/new', function(req, res, next){
  try{
    res.render('new', {title: "Cadastro de Cliente", doc:{}, action:"/new"});
  }catch(ex){
    res.redirect(`/erro=${ex}`);
  }
}
);

router.post('/new', async function(req, res, next){
  try{
    const nome = req.body.nome;
    const idade = parseInt(req.body.idade);
    const uf = req.body.uf;
    await db.insert({nome, idade, uf});
    res.redirect('/?new=true');
  }catch(ex){
    res.redirect(`/erro=${ex}`);
  }
});

router.post('/edit/:id', async function(req, res){
  try{
    const id = req.params.id;
    const nome = req.body.nome;
    const idade = parseInt(req.body.idade);
    const uf = req.body.uf;
    await db.replaceOne(id, {nome, idade, uf});
    res.redirect('/?edit=true');
  }catch(ex){
    res.redirect(`/erro=${ex}`);
  }
});

router.get('/delete/:id', async function(req, res) {
  try{
    const id = req.params.id;
    await db.deleteOne(id);
    res.redirect('/?delete=true');
  }catch(ex){
    res.redirect(`/erro=${ex}`);
  }
 
});

module.exports = router;

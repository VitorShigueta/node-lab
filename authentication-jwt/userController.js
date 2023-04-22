const express = require('express');
const router = express.Router();
const User = require("./models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const auth = require("./auth");

router.post('/register', async function(req, res) {
  
    try{
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        if (!(req.body.email && req.body.password && req.body.name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const user = new User({
		    name : req.body.name,
            email : req.body.email,
            password : hashedPassword
	    });
	    await user.save();
        // criar o token
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expira em 24 horas
        });
        res.status(200).send({ auth: true, token: token });
    } catch(err) {
        console.log(err);
    }

});
/*
router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token informado.' });
    
    jwt.verify(token, config.secret, async function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
      const user = await User.findById({ _id: decoded.id });
      res.status(200).send(user);
    });
});
*/
router.get('/me', auth, async function(req, res, next) {

    try {
        const user = await User.findById({ _id: req.user.id });
         res.status(200).send(user);
    } catch (err) {
        console.log(err);
    }
    
  });

router.post("/login", async (req, res) => {

    // Our login logic starts here
     try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          config.secret,
          {
            expiresIn: "5h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return res.status(200).json(user);
        } 
      return res.status(400).send("Invalid Credentials");
      
    // Our login logic ends here
    } catch(err) {
        console.log(err);
    }
});

router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome to FreeCodeCamp 🙌");
});

router.get('/', (req, res) => {
    res.send("hello");
});

module.exports = router;

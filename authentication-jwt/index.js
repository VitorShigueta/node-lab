const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userController = require('./userController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())

mongoose
	.connect("mongodb+srv://vitor:senha@cluster0.tnqdnrq.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
            console.log('Your app is runing')
        })
	})

app.use("/", userController)

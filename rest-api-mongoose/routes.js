const express = require("express")
const router = express.Router()
const Post = require("./models/Post")

/*
get all postos
use:
curl http://localhost:5000/api/posts
*/
router.get("/posts", async (req, res) => {
	const posts = await Post.find()
	res.send(posts)
})

/*
save a new post
use:
curl http://localhost:5000/api/posts \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"title":"Post 1", "content":"Anything"}'
*/
router.post("/posts", async (req, res) => {
    console.log("carregando todos os posts");
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	})
	await post.save()
	res.send(post)
})

/*
find only one post
use:
curl http://localhost:5000/api/posts/<OBJECT_ID>
*/
router.get("/posts/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

/*
modify one post
use:
curl http://localhost:5000/api/posts/<OBJECT_ID> \
    -X PATCH \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated Post", "content":"Updated post content"}'
*/
router.patch("/posts/:id", async (req, res) => {

	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

/*
delete post
use:
curl http://localhost:5000/posts/<OBJECT_ID> -X DELETE -I
*/
router.delete("/posts/:id", async (req, res) => {
    console.log("chegou aqui")
	try {
        console.log("Tentando remover")
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
        console.log("deu ruim")
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = router
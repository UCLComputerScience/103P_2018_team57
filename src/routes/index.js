module.exports = function(app) {
	const videos = {
		"Video 1": ["xxx", "nsfw", "saucy"],
		"Video 2": ["animals"]
	}

	app.get("/", function(req, res) {
		res.render("index.html", {
			videos: videos
		})
	})

	app.post("/add-video", function(req, res) {
		const videoName = req.body.videoName
		const tags = req.body.tags.split(" ")
		videos[videoName] = tags
		res.redirect("/")
	})
}

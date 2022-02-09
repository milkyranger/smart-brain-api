const Clarifai = require("clarifai")
const app = new Clarifai.App({
  apiKey: "1d390dfbb6e24474a30017fe5b07e773"
})



const handleApiCall = (req,res) => {
	app.models.predict(
	      "a403429f2ddf4b49b307e318f00e528b", 
	      req.body.input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json("API error"))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
		      res.json(entries[0].entries);
		  })
		.catch(err => res.status(400).json("error in accessing count"))

}

module.exports = {
	handleImage,
	handleApiCall
}
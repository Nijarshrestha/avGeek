const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const jetList = require("./data/list_of_planes.json");

app.get("/", (req, res) => {
	res.header("Content-Type", "application/json");
	res.json(jetList);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

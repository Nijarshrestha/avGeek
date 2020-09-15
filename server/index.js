const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8081;

const planesListRaw = fs.readFileSync("./data/list_of_planes.json");

app.get("/", (req, res) => {
	res.header("Content-Type", "application/json");
	const data = JSON.parse(planesListRaw);
	res.json(data.tables);
});

app.get("/tables_length", (req, res) => {
	res.header("Content-Type", "application/json");
	const data = JSON.parse(planesListRaw);
	res.send(data.tables.length + "");
});

app.get("/tables", (req, res) => {
	res.header("Content-Type", "application/json");
	const data = JSON.parse(planesListRaw);
	res.json(data.tables);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 8081;

const planesListRaw = fs.readFileSync("./data/list_of_planes.json");
const planesList = JSON.parse(planesListRaw);

// This middleware will be executed for every request to the app
app.use((req, res, next) => {
	res.header("Content-Type", "application/json");
	next();
});

app.get("/", (req, res) => {
	res.json(planesList.tables);
});

app.get("/tables_length", (req, res) => {
	res.send(planesList.tables.length + "");
});

app.get("/tables", (req, res) => {
	res.json(planesList.tables[0].rows[0]);
});

// const zip = (rows) => rows[0].map((_, c) => rows.map((row) => row[c]));
const tableToObj = function (table) {
	const rows = Object.values(table.rows);
	const head = rows.shift().columns;
	// const values = rows.map((i) => zip([Object.values(head), Object.values(i.columns)]));
	const values = rows.map((i) => {
		const data = {};
		Object.values(head).forEach((o, id) => {
			data[o] = i.columns[id];
		});
		return data;
	});
	return values;
};

app.get("/planes_list", (req, res) => {
	const tables = planesList.tables;
	const rows = tableToObj(tables[0]);
	res.json(rows);
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

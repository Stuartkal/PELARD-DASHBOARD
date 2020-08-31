const express = require('express');
const bodyparser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./Documents');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Post and generate PDF
app.post('/create-pdf', (req, res) => {
	pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
		if (err) {
			res.send(Promise.reject());
		}
		res.send(Promise.resolve());
	});
});

//Get generated PDF
app.get('/fetch-pdf', (req, res) => {
	res.sendfile(`${__dirname}/result.pdf`);
});
app.listen(port, () => console.log(`listening to port ${port}`));

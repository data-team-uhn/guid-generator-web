const fs = require('file-system');

exports.getPublicKey = (req, res) => {
    fs.readFile('eGUID-config.json', (err, data) => {
		if (err) {
			res.status(400).json({
                message: "unable to read /eGUID-config.json",
                error: err.message,
            })
		}

		let key = JSON.parse(data);
		console.log(key);
		res.json(key);
	});
};

exports.getProjectId = (req, res) => {
    fs.readFile('project-config.json', (err, data) => {
		if (err) {
			res.status(400).json({
                message: "unable to read /project-config.json",
                error: err.message,
            })
		}

		let key = JSON.parse(data);
		console.log(key);
		res.json(key);
	});
};

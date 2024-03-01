var mammoth = require("mammoth");

const fs = require('fs').promises;
const path = require('path');

module.exports = async (folderPath) => {

	try {
		const files = await fs.readdir(folderPath);
		for (const file of files) {
			const filePath = path.join(folderPath, file)

			await mammoth.convertToHtml({ path: filePath })
				.then(function (result) {
					var html = result.value; // The generated HTML
					fs.writeFile(folderPath + "-html/" + file + ".html", html, (err) => {
						if (err) {
							console.error('Error writing HTML to file:', err);
							return;
						}
						console.log('HTML content saved to file:', filePath);
					});
					var messages = result.messages; // Any messages, such as warnings during conversion
					if (messages.length) {
						messages.foreEach(message => console.log("MESSAGE: ", messages))

					}
				})
				.catch(function (error) {
					console.error(error);
				});

			//returns new path
			return folderPath + "-html"

		}

	} catch (error) {
		throw error;
	}
}




// Example usage:
/* const folderPath = '/path/to/your/folder';

getAllFilesInFolder(folderPath)
	.then(files => {
		console.log("Files in folder:", files);
	})
	.catch(error => {
		console.error("Error reading folder:", error);
	});

mammoth.convertToHtml({path: "path/to/document.docx"})
	.then(function(result){
		var html = result.value; // The generated HTML
		var messages = result.messages; // Any messages, such as warnings during conversion
	})
	.catch(function(error) {
		console.error(error);
	}); */
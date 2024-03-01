const fs = require('fs').promises;

const docxToHtml = require("./docxToHtml")
const getBookMetadata = require("./getBookMetadata")
const getAnnotations = require("./getAnnotations");

(async () => {
	const folderPathDocx = "./play-books-notes"
	const folderPathHtml = await docxToHtml(folderPathDocx)

	try {
		const files = await fs.readdir(folderPathHtml);
		for (const fileName of files) {

			console.log(`Converting ${fileName} ...`)

			let htmlContent = await fs.readFile(folderPathHtml + "/" + fileName, 'utf8');

			const bookMetadata = getBookMetadata(htmlContent)

			const annotations = getAnnotations(htmlContent, folderPathHtml, fileName)
			//console.log(annotations)

			const bookData = {
				...bookMetadata,
				annotations
			}

			await fs.writeFile(folderPathDocx + "-json/" + fileName + ".json", JSON.stringify(bookData))
		}

	} catch (error) {
		throw error;
	}

})()
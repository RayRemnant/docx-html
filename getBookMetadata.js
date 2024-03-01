module.exports = (content) => {
	try {

		//cut the everything but the header part with the book info
		targetWord = "<h1>Annotations by color</h1>"

		targetIndex = content.indexOf(targetWord)

		if (targetIndex === -1) {
			console.log(`The word "${targetWord}" was not found`);
			return;
		}

		// Remove the text from the beginning up to the target word
		const bookMetadataContentHtml = content.substring(0, targetIndex);

		const extractTextFromTable = require("./extractTextFromTable")

		const extractedTextArray = extractTextFromTable(bookMetadataContentHtml, "tr")

		const [[title, author, publisher]] = extractedTextArray[0]

		return {
			title,
			author,
			publisher
		}

	} catch (error) {
		console.error("Error:", error);
	}
}
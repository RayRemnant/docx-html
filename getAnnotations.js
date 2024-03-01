const fs = require('fs').promises;

function getColorAnnotations(htmlContent) {

	function getColor() {
		const startIndex = htmlContent.indexOf('<h2><em>');
		const endIndex = htmlContent.indexOf('</em></h2>');
		//console.log("START ", startIndex)
		//console.log("END ", endIndex)
		if (startIndex !== -1 && endIndex !== -1) {
			return htmlContent.slice(startIndex + 8, endIndex).toLowerCase()
		}
		return ""
	}

	const color = getColor()
	//console.log("COLOR: ", color)

	htmlContent = htmlContent.replace("<h2>", "") //remove first h2 element, so we can match the closing h2 tag with the opening of the next one
	// Find the index of </h2> and <h2> tags
	const startIndex = htmlContent.indexOf('</h2>');
	//console.log("END INDEX: ", startIndex)
	const endIndex = htmlContent.indexOf('<h2>');
	//console.log("START INDEX: ", endIndex)

	// If both tags are found, slice the text content between them and remove it from the HTML content
	if (startIndex !== -1) {
		const slicedText = htmlContent.slice(startIndex + 4, endIndex);

		//console.log(slicedText.length)

		const updatedHtmlContent = endIndex ? htmlContent.slice(endIndex) : undefined
		return { color, slicedText, updatedHtmlContent };
	}

	return {
		color, slicedText: "", updatedHtmlContent: htmlContent
	}; // Return original HTML content if tags are not found
}



module.exports = (htmlContent) => {

	try {
		//cut the header part with the book info
		let targetWord = "<h1>Annotations by color</h1>"

		let targetIndex = htmlContent.indexOf(targetWord)

		if (targetIndex === -1) {
			console.log(`The word "${targetWord}" was not found`);
			console.log("Try to edit the notes in the book to update the format.")
			return;
		}

		htmlContent = htmlContent.substring(targetIndex);

		targetWord = "<h1>All your annotations</h1>"

		targetIndex = htmlContent.indexOf(targetWord)

		if (targetIndex === -1) {
			console.log(`The word "${targetWord}" was not found`);
			return;
		}

		htmlContent = htmlContent.substring(0, targetIndex);

		const htmlResult = []

		while (true) {
			//separate annotations of different colors into separate objects
			const { color, slicedText, updatedHtmlContent } = getColorAnnotations(htmlContent);
			if (!slicedText) {
				break; // Break the loop if no more occurrences found
			}

			htmlResult.push({ color, content: slicedText })
			htmlContent = updatedHtmlContent; // Update htmlContent for next iteration
		}

		const result = {}

		for (const { color, content } of htmlResult) {

			const extractTextFromTable = require("./extractTextFromTable")

			extractedTextArray = extractTextFromTable(content, 'th table tr')


			let flattenedArray = extractedTextArray.map(row => [...row[0], ...row[1]]);

			//console.log(flattenedArray)

			flattenedArray = flattenedArray.map(annotation => {
				//if annotation is length 3, there's no comment
				//if 4 there's a comment
				return annotation.length == 4 ? {
					note: annotation[0],
					date: new Date(annotation[1]),
					page: annotation[2],
					pageLink: annotation[3]
				} : {
					note: annotation[0],
					comment: annotation[1],
					date: new Date(annotation[2]),
					page: annotation[3],
					pageLink: annotation[4]
				}
			})

			result[color] = flattenedArray

			//console.log(result)
		}

		return result

	}

	catch (error) {
		throw error;
	}
}


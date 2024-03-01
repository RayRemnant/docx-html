const { JSDOM } = require("jsdom");

function getAllTextNodes(element) {

	const result = []

	/* 	console.log("---START")
	 */
	function getTextNodes(node) {
		if (node.children && node.children[0] && node.children[0].nodeName === "A") {
			result.push(node.children[0].text)
			result.push(node.children[0].href)

		} else if (node.nodeType === 3) { // Node.TEXT_NODE
			result.push(node.textContent.trim())
			//console.log("TEXT: ", node.textContent)
		} else if (node.nodeType === 1) { // Node.ELEMENT_NODE
			//console.log(node.nodeName)
			for (let childNode of node.childNodes) {
				getTextNodes(childNode);
			}
		}
	}
	getTextNodes(element);
	return result
}

function extractTextFromTable(html, cssQuery) {
	const result = []

	const dom = new JSDOM(html);

	const document = dom.window.document;

	const rows = document.querySelectorAll(cssQuery);

	for (let row of rows) {

		const index = result.push([]) - 1
		/* 		console.log("INDEX: ", index)
		 */
		for (let cell of row.cells) {

			getAllTextNodes(cell).length ? result[index].push(getAllTextNodes(cell)) : ""

		}
	}

	return result
}

module.exports = extractTextFromTable
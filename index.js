const fs = require("fs")
const { DOMParser } = require("xmldom")
const xmlFilePath = "sma_gentext.xml"

const readXmlFile = () => {
    if (xmlFilePath) {
        const fileContent = fs.readFileSync(xmlFilePath, "utf-8")

        const parser = new DOMParser()

        const xmlDocument = parser.parseFromString(
            fileContent,
            "application/xml"
        )

        if (xmlDocument) {
            extractData(xmlDocument)
        }
    } else console.log(`No XML File found at ${xmlFilePath}`)
}

const extractData = (xmlDoc) => {
    const transUnitNodes = xmlDoc.getElementsByTagName("trans-unit")

    for (let i = 0; i < transUnitNodes.length; i++) {
        const transUnitNode = transUnitNodes.item(i)
        const id = transUnitNode.getAttribute("id")

        if (id === "42007") {
            const targetNode = transUnitNode.getElementsByTagName("target")[0]

            if (targetNode) {
                writeToFile(targetNode.textContent)
                break
            }
        }
    }
}

const writeToFile = (content) => {
    fs.writeFileSync("output.txt", content)
}

readXmlFile()

const fs = require("fs")
const { DOMParser } = require("xmldom")
const xmlFilePath = "sma_gentext.xml"

const readXmlFile = () => {
    try {
        // Check if there is a path to read from
        if (xmlFilePath) {
            const fileContent = fs.readFileSync(xmlFilePath, "utf-8")

            const parser = new DOMParser()
            // Parse the data
            const xmlDocument = parser.parseFromString(
                fileContent,
                "application/xml"
            )

            if (xmlDocument) {
                extractData(xmlDocument)
            }
        } else console.log(`No XML File found at ${xmlFilePath}`)
    } catch (error) {
        console.log("Error reading XML file:", error)
    }
}

const extractData = (xmlDoc) => {
    // Validate the sent in parameter
    if (!xmlDoc || !xmlDoc.getElementsByTagName) {
        console.log("Invalid XML document provided")
        return
    }
    try {
        const transUnitNodes = xmlDoc.getElementsByTagName("trans-unit")
        // Loop through the trans-unit nodes and locate the one with an id of '42007'
        for (let i = 0; i < transUnitNodes.length; i++) {
            const transUnitNode = transUnitNodes.item(i)
            const id = transUnitNode.getAttribute("id")

            if (id === "42007") {
                const targetNode =
                    transUnitNode.getElementsByTagName("target")[0]
                // check the length of the value and pass it to the writeToFile-function
                if (targetNode.textContent.length) {
                    writeToFile(targetNode.textContent)
                    return
                }
            }
        }
        console.log("No valid data found with the specific ID")
    } catch (error) {
        console.log("An error occured:", error)
    }
}

//Writing parameter value to an .txt File
const writeToFile = (content) => {
    try {
        if (content.length) {
            fs.writeFileSync("output.txt", content)
        } else {
            console.log("No data to write")
        }
    } catch (error) {
        console.log("Error writing to file:", error)
    }
}

readXmlFile()

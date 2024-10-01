// src/utils/generateWord.js
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

/**
 * Generate a word document from the given template and data
 * @param {ArrayBuffer} templateFile - The template file as ArrayBuffer
 * @param {Object} data - The dynamic data to be filled in the template
 */
export function generateWord(templateFile, data) {
  try {
    // 1. Load the template
    const zip = new PizZip(templateFile);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 2. Render the document with the data
    doc.render(data);

    // 3. Generate the output document
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // 4. Save the document as download
    saveAs(out, "generated_report.docx");
  } catch (error) {
    console.error("Failed to generate document", error);
  }
}

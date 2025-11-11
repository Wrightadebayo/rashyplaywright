// const Excel = require("exceljs");
// const { test, expect } = require("@playwright/test");

// async function writeExcel(searchText, replaceText, change, filepath) {
//   const workbook = new Excel.Workbook();
//   await workbook.xlsx.readFile(filepath);

//   const worksheet = workbook.getWorksheet("Sheet1");

//   // 🔍 Find the cell that contains the search text
//   const output = await readExcel(worksheet, searchText);

//   // ✅ Only update if the word is found
//   if (output.row !== -1 && output.column !== -1) {
//     // 🧮 Apply the column/row change
//     const newRow = output.row + (change.rowChange || 0);
//     const newColumn = output.column + (change.colChange || 0);

//     // ✏️ Update the new cell
//     const cell = worksheet.getCell(newRow, newColumn);
//     cell.value = replaceText;

//     console.log(` Updated cell at row ${newRow}, column ${newColumn}`);
//   } else {
//     console.log(`'${searchText}' not found in the Excel sheet.`);
//   }

//   // 💾 Save the updated file
//   await workbook.xlsx.writeFile(filepath);
//   console.log("✅ File saved successfully!");
// }

// // 🔍 Function to find the text in the Excel sheet
// async function readExcel(worksheet, searchText) {
//   let output = { row: -1, column: -1 };

//   worksheet.eachRow((row, rowNumber) => {
//     row.eachCell((cell, colNumber) => {
//       if (cell.value === searchText) {
//         output.row = rowNumber;
//         output.column = colNumber;
//       }
//     });
//   });

//   return output; // ✅ Return the position
// }

// // writeExcel(
// //   "Banana",           // find this text
// //   350,               // replace it with this
// //   { rowChange: 0, colChange: 2 },  // move 2 columns to the right
// //   "C:/Users/DELL/Downloads/ExcelCreator.xlsx" // file path
// // );

// test("upload download excel validation", async ({ page }) => {
//   await page.goto(
//     "https://rahulshettyacademy.com/upload-download-test/index.html"
//   );
//   const textLocator = "Banana";
//   const updateValue = "350";
//   const downloadExtension = page.waitForEvent("download");
//   await page.getByRole("button", { name: "Download" }).click();
//   await downloadExtension;
//   writeExcel(
//     textLocator,
//     updateValue,
//     { rowChange: 0, colChange: 2 },
//     "C:/Users/DELL/Downloads/download.xlsx"
//   );
//   await page.locator('input[type="file"]').click();
//   await page
//     .locator('input[type="file"]')
//     .setInputFiles("C:/Users/Dell/Downloads/download.xlsx");
//   const textSearch = page.getByText(textLocator);

//   const desireRow = await page.getByRole("row").filter({ has: textSearch });
//   await expect(desireRow.locator("#cell-4-undefined")).toContainText(
//     updateValue
//   );
// });

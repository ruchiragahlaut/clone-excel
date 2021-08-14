// let a=10;
let topRow = document.querySelector(".top-row");
let str = "";
for (let i = 0; i < 26; i++) {
    /* adding first row in grid*/
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str;
let leftCol = document.querySelector(".left-col");
str = ""
for (let i = -1; i < 100; i++) {
    /* adding first column in grid*/
    str += `<div class='left-col_box'>${i + 1}</div>`
}
leftCol.innerHTML = str;
// 2d array
let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        str += `<div class='col' rid=${i} cid=${j} contenteditable="true"></div>`
    }
    /*contenteditable="true" --> this means that we can change the content of cell now*/
    str += "</div>"; 
}
grid.innerHTML = str;

//now we will create database -->
/* We are creating this because we want to store the previous details of 
all the cells so that when we move to the other cell for clicking we can change the 
above panel active btn property of bold and italic and underline */ 

let workSheetDB = [];
function initCurrentSheetDb() {
    let sheetDB = [];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            let cell = {
                // default properties of all the styling component 
                bold: false,
                italic: "normal",
                underline: "none",
                fontFamily: "Arial",
                fontSize: "10",
                halign: "left",
                /* new element value is added here 
                so when we add new sheet it holds the value*/
                value: "",
                children: [],
                formula: ""
            }

            row.push(cell);
        }
        sheetDB.push(row);
    }
    console.log(sheetDB);
    workSheetDB.push(sheetDB);
    console.log(workSheetDB);
}
initCurrentSheetDb();

//  2 d Array-> styling prop
//  cell set 
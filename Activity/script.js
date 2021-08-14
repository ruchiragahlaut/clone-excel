let addbtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
/* It is for the cells*/
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
/* all buttons that we have to function it */
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
// all styling button
let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
firstSheet.addEventListener("click", handleActiveSheet)
// alignment is for left,right,center button.
let allAlignBtns = document.querySelectorAll(".alignment-container>input");
// this is for formula box
let formulaInput = document.querySelector(".formula-box");
// database
let sheetDB = workSheetDB[0];

let gridContainer = document.querySelector(".grid_container");

//This is for UI scrolling
let topLeftBlock = document.querySelector(".top-left-block");
gridContainer.addEventListener("scroll", function () {
    // console.log(e);
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);
    topLeftBlock.style.top = top + "px";
    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})



// create sheets and add functionlities

addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `Sheet ${idx + 1}`;
    // page add
    sheetList.appendChild(NewSheet);
    //db remove active class to all the sheet
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");
    });
    // here we are searching the length of list and putting active on list
    let sheetArr = document.querySelectorAll(".sheet");
    sheetArr[sheetArr.length-1].classList.add("active-sheet");
    // here we are creating 2d array of new sheet that we added
    initCurrentSheetDb();
    // here idx-1 bcz arrays start from zeros
    sheetDB = workSheetDB[idx-1];
    // here we are  pointing the ui to the new db 
    //cell empty 
    initUI();
    NewSheet.addEventListener("click",handleActiveSheet);
    
});

gridContainer.addEventListener("scroll", function () {
    // console.log(e);
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);
    topLeftBlock.style.top = top + "px";
    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})


function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    // find the index of current sheet
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    // get data from the current array and set UI
    sheetDB = workSheetDB[sheetIdx-1];
    setUI(sheetDB);
}
// *****************************************************
//  address set on click of a cell 
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
       
        // It is completely meant for the styling 
        let cellObject = sheetDB[rid][cid];
        // styling-> set 
        // object styling set 
        // UI 
        // cell
        // boldness

        if (cellObject.formula != "") {
            formulaInput.value = cellObject.formula;
        } else {
            formulaInput.value = "";
        }
        // below code is for the active button for example ->
        /* If i write hello in one cell and bold it the above bold button 
        automatically became active now if move to another cell
        the above bold button active should be remove*/
        if (cellObject.bold == true) {
            boldElem.classList.add("active-btn")
        } else {
            boldElem.classList.remove("active-btn");
        }
        // alignment
        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active-btn");
        }
        //console.log(cellObject.halign);
        if (cellObject.halign == "left") {
            // left active
            leftBtn.classList.add("active-btn")
        } else if (cellObject.halign == "right") {
            rightBtn.classList.add("active-btn")
            // right active
        } else if (cellObject.halign == "center") {
            centerBtn.classList.add("active-btn")
        }
    });

    // it for the every cell if the content is increaing then your cell length will increase 
    Allcells[i].addEventListener("keydown", function (e) {
        let obj = Allcells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col_box")[rid];
        leftCol.style.height = height + "px";
    });
}
// initial cell click emulate
Allcells[0].click();
// ************Formatting****************

leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left"

    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    // db update very important
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";
})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right"

    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    // db update  db update very important
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center"
     // db update  db update very important
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "center";
})
fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize = fontSize + "px";
})

/* you have to do the same above thing for the font button also 
?
?
?   
?
*/  
fontFamily.addEventListener("change", function () {
    // alert(fontFamily.value);
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cFont = fontFamily.value
    cell.style.fontFamily = cFont;
})

boldElem.addEventListener("click", function () {
    //here we first check the button of bold above wheather it is active or not
    let isActive = boldElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {
        // cell text bold
        cell.style.fontWeight = "bold";
        boldElem.classList.add("active-btn");
    } else {
        // cell text normal
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active-btn");
    }
})
italicElem.addEventListener("click", function () {
     //here we first check the button of italic above wheather it is active or not
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {
        // cell text italic
        cell.style.fontStyle = "italic";
        // active button is for changing the backgroud of colour while pressing it
        italicElem.classList.add("active-btn");
    } else {
        // cell text normal
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active-btn");
    }
})
underlineElem.addEventListener("click", function () {
     //here we first check the button of underlined above wheather it is active or not
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {
        // cell text underlined
        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
    } else {
        // cell text normal
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
    }
})
// ****************************************************************




// Helper function
function getRIdCIdfromAddress(adress) {
    // A1
    let cellColAdr = adress.charCodeAt(0);
    //console.log(adress);
    /*charCodeAt(0) gives us ASCII value of alphabets*/
    //console.log("hello",cellColAdr);

    let cellrowAdr = adress.slice(1);
    
    //console.log("wow",cellrowAdr);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };

}

// when new sheet is formed and form a new ui

function initUI(){
    for (let i = 0; i < Allcells.length; i++) {
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily= "Arial";
        Allcells[i].style.fontSize = "10px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText= "";       
      }
}

for(let i=0;i<Allcells.length;i++){
    Allcells[i].addEventListener("blur",function handleCell(){
        let address = addressBar.value;
        let {rid,cid} = getRIdCIdfromAddress(address);
        cellObject = sheetDB[rid][cid];
        let cell = document.querySelector(`.col[rid="${rid}"][cid ="${cid}"]`);
        cellObject.value= cell.innerText;
    })
}

function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
        }
    }
}


// ````````````````` formula````````````````````````` //

// ********Formula code*******************
// cell blur
// "value"-> value
//  fomrula value-> manually value set 


for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        // 2d array
        let cellObject = sheetDB[rid][cid];

        // grid 
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        //   formula -> 40, 40
        if (cellObject.value == cell.innerText) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject, address);
        }
        // db entry
        cellObject.value = cell.innerText;
        // depend update 
        changeChildrens(cellObject);
    });
}


// formula bar enter// value -> formula set
// old formula -> new formula  

formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let Newformula = formulaInput.value;
        console.log(Newformula);
        // cellObject formula
        let address = addressBar.value;
        // getCurrentCell
        let { rid, cid } = getRIdCIdfromAddress(address);

        let cellObject = sheetDB[rid][cid];
        console.log(cellObject);
        let prevFormula = cellObject.formula;
        if (prevFormula == Newformula) {
            return;
        }
        if (prevFormula != "" && prevFormula != Newformula) {
            removeFormula(cellObject, address);
        }
        let evaluatedValue = evaluateFormula(Newformula);
        // alert(value);
        //    UI change
        //here we setting the formula by calling the setUIFormula function
        setUIByFormula(evaluatedValue, rid, cid);
        // db -> works
        setFormula(evaluatedValue,Newformula,rid,cid,address);
        changeChildrens(cellObject);
    }
})

function evaluateFormula(formula) {
    // (A100+A20)
    // 
    console.log(formula);
    let formulaTokens = formula.split(" ");
    console.log(formulaTokens);
    // split
    // [(, A1, +, A2,)]
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            console.log(formulaTokens[i]);
            // A1
            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            //  getting value from  db
            let { value } = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }
    // (10 +20 )
    // infix evaluation
    // eval is the inbuilt compiler of evaluting any kinf of calc
    let ans = eval(formula);
    return ans;
    // eval
    // ( 10 + 20 )
}

function setUIByFormula(value, rid, cid) {
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
    //  parent add yourself as a
    // here we just putting the calculated formula to the UI
}

function setFormula(value, formula, rid, cid, address) {
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
    // (A1 + A2)
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            cellObject.children.push(address)
        }
    }
}

function changeChildrens(cellObject) {
    // children get
    // formula reevaluate
    // recursively call
    let childrens = cellObject.children;
    for (let i = 0; i < childrens.length; i++) {
        let chAddress = childrens[i];
        let chRICIObj = getRIdCIdfromAddress(chAddress);
        let chObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, chRICIObj.rid, chRICIObj.cid);
        chObj.value = evaluatedValue;
        // your children have children
        changeChildrens(chObj);
    }

}
// remove yourself from parent;s children array
function removeFormula(cellObject, address) {
    // (A1)
    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            // console.log(formulaTokens[i]);
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            //  getting value from  db
            let childrens = parentCellObject.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx, 1);
        }
    }
    cellObject.formula = "";

}
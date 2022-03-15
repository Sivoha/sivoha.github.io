function Cell(cell, cellCharacter, num, status="none", player="1") {
    this.cell = cell;
    this.cellCharacter = cellCharacter;
    this.num = num;
    this.status = "none";
    this.player = "1";

    this.makeMove = () => { 
        if (this.status == "none" && this.player == "1") {
            cellCharacter.style.background = "url('cross.png')";
            this.status = "cross";
            cells.forEach(Element => { Element.changePlayerTo2(); });  
        } else if (this.status == "none" && this.player == "2") {
            cellCharacter.style.background = "url('circle.png')";
            this.status = "circle";
            cells.forEach(Element => { Element.changePlayerTo1(); }); 
        }
        checkCells();
    }

    this.changePlayerTo1 = () => {
        this.player = "1";
    }
    this.changePlayerTo2 = () => {
        this.player = "2";
    }
    this.resetCharacter = () => {
        this.cellCharacter.style.background = "none";
    }
    this.resetStatus = () => {
        this.status = "none";
    }
    this.setCrossStatus = () => {
        this.status = "cross";
    }
    this.setCircleStatus = () => {
        this.status = "circle";
    }
    this.resetBackground = () => {
        this.cell.style.backgroundColor = "deepskyblue";
    }
    this.setRedBackground = () => {
        this.cell.style.backgroundColor = "red";
    }
    this.getStatus = () => {
        return this.status;
    }
}

async function checkCells() {
    if (checkWin() || checkDraw()) {
        await sleep(2000);
        resetCells();
    }
}

function resetCells() {
    cells.forEach(Element => {
        Element.resetCharacter();
        Element.resetStatus();
        Element.resetBackground();
        Element.changePlayerTo1();
        sleep(50000);
    })
    
}

function checkWin() {
    cellNum = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]];
                console.clear();
    for (let i = 0; i < cellNum.length; ++i) {
        console.log(cells[cellNum[i][0]].status ,cells[cellNum[i][1]].status , cells[cellNum[i][2]].status);
        if ((cells[cellNum[i][0]].status == cells[cellNum[i][1]].status) && (cells[cellNum[i][1]].status == cells[cellNum[i][2]].status) && (cells[cellNum[i][0]].status != "none")) {
            cells[cellNum[i][0]].setRedBackground();
            cells[cellNum[i][1]].setRedBackground()
            cells[cellNum[i][2]].setRedBackground();
            return true;
        }
    }
    return false;
}

function checkDraw() {
    if (cells.every(Element => Element.status != "none")) {
        sleep(2000);
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let documentCells = document.querySelectorAll(".cell");
let documentCellCharacters = document.querySelectorAll(".cell-character")

let cells = [];
for (let i = 0; i < documentCells.length; ++i) {
    cells.push(new Cell(documentCells[i], documentCellCharacters[i], i));
    cells[i].cell.addEventListener("click", cells[i].makeMove);
}
let middle = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];

let main = [
    ['', '2', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];
let prevStep = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];
window.onload = function() {
    insertNewElement();
    render();
}


let score = 0;
let bestScore = 0;

window.onkeydown = function keyListen() {
    const key = event.key;
    if (key == 'ArrowUp')
        moveUp();
    else if (key == 'ArrowDown')
        moveDown();
    else if (key == 'ArrowRight')
        moveRight();
    else if (key == 'ArrowLeft')
        moveLeft();
}

function goBack() {
    copyValues(main, prevStep);
    copyValues(middle, prevStep);
    render();
}

function showGameover() {


    document.getElementById("gameover").style.visibility = "hidden";
}

function resetGame() {
    if (score > bestScore)
        bestScore = score;
    middle = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    main = [
        ['', '2', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    prevStep = [
        ['', '2', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    score = 0;
    render();
}


function isModified() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (main[i][j] != middle[i][j])
                return true;
        }
    }
    return false;

}


function render() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let id = i + "" + j;
            document.getElementById(id).innerHTML = main[i][j];
            const va = document.getElementById(id).innerHTML;
            switch (va) {
                case '2':
                    document.getElementById(id).style.backgroundColor = "#EEE4DA";
                    document.getElementById(id).style.color = "#776E65";
                    break;
                case '4':
                    document.getElementById(id).style.backgroundColor = "#EDE0C8";
                    document.getElementById(id).style.color = "#776E65";
                    break;
                case '8':
                    document.getElementById(id).style.backgroundColor = "#F2B179";
                    break;
                case '16':
                    document.getElementById(id).style.backgroundColor = "#F59563";
                    break;
                case '32':
                    document.getElementById(id).style.backgroundColor = "#F67C5F";
                    break;
                case '64':
                    document.getElementById(id).style.backgroundColor = "#F65E3B";
                    break;
                case '128':
                    document.getElementById(id).style.backgroundColor = "#EDCF72";
                    break;
                case '256':
                    document.getElementById(id).style.backgroundColor = "#EDCC61";
                    break;
                case '':
                    document.getElementById(id).style.backgroundColor = "#CDC1B4";
                    break;
                default:
                    document.getElementById(id).style.backgroundColor = '#EDC850'
            }
        }
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("Bestscore").innerHTML = bestScore;
}

function insertNewElement() {
    if (isModified() && isEmpty(middle)) {
        let flag = true;
        while (flag) {
            let row, column;
            let rand = getRandom();
            column = rand % 4;
            row = parseInt(rand / 4);
            if (middle[row][column] == '') {
                middle[row][column] = get2or4();
                flag = false;
            }
        }
        copyValues(prevStep, main);
        copyValues(main, middle);
    }
    render();
}



function moveUp() {
    for (var i = 0; i < 4; i++) {
        sortColumn(i, "UP");
    }
    insertNewElement();
}

function moveRight() {
    for (var i = 0; i < 4; i++) {
        sortRow(i, "RIGHT");
    }

    insertNewElement();
}

function moveLeft() {
    for (var i = 0; i < 4; i++) {
        sortRow(i, "LEFT");
    }

    insertNewElement();

}

function moveDown() {
    for (var i = 0; i < 4; i++) {
        sortColumn(i, "DOWN");
    }

    insertNewElement();
}



function copyValues(destination, source) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            destination[i][j] = source[i][j];
        }
    }
}



function sortColumn(i, moveType) {
    var column = [];
    for (var j = 0; j < 4; j++) {
        column[j] = middle[j][i];
    }
    if (moveType == 'DOWN') {
        column = reArrange(column, true);
        for (var j = 0; j < 4; j++) {
            middle[j][i] = column[j];
        }
    } else {
        column = reArrange(column, false);
        column = reverseSortIt(column);
        for (var j = 0; j < 4; j++) {
            middle[j][i] = column[j];
        }
    }
}

function sortRow(i, moveType) {
    var column = [];
    for (var j = 0; j < 4; j++) {
        column[j] = middle[i][j];
    }

    if (moveType == 'RIGHT') {
        column = reArrange(column, true);
        for (var j = 0; j < 4; j++) {
            middle[i][j] = column[j];
        }
    } else {
        column = reArrange(column, false);
        column = reverseSortIt(column);
        for (var j = 0; j < 4; j++) {
            middle[i][j] = column[j];
        }
    }
}

function reArrange(column, flag) {
    let top = column.length - 1;
    for (var i = column.length - 1; i >= 0; i--) {
        if (column[i] != 0) {
            let temp = column[i];
            column[i] = column[top];
            column[top] = temp;
            top--;
        }
    }
    top = column.length - 1;
    if (flag) {

        for (var i = top; i >= 0; i--) {
            if (column[i] != 0) {
                for (var j = i - 1; j >= 0; j--) {
                    if (column[j] != 0 && column[j] == column[i]) {
                        column[i] *= 2;
                        score += column[i];
                        column[j] = '';
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    } else {
        for (var i = 0; i <= top; i++) {
            if (column[i] != 0) {
                for (var j = i + 1; j <= top; j++) {
                    if (column[j] != 0 && column[j] == column[i]) {
                        column[i] *= 2;
                        score += column[i];
                        column[j] = '';
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    top = column.length - 1;
    for (var i = column.length - 1; i >= 0; i--) {
        if (column[i] != 0) {
            var temp = column[i];
            column[i] = column[top];
            column[top] = temp;
            top--;
        }
    }

    return column;
}

function reverseSortIt(array) {
    let top = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] != 0) {
            var temp = array[i];
            array[i] = array[top];
            array[top] = temp;
            top++;
        }
    }
    return array;
}

function get2or4() {
    let random = (Math.random() * 1000000) * 2;
    if (parseInt(random % 4) == 0) {
        return 4;
    }
    return 2;
}

function getRandom() {
    return parseInt((Math.random() * 100000) % 16);
}



function isEmpty(array) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (array[i][j] == '')
                return true;
        }
    }
    return false;
}
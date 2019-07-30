
import words1 from './words.json'
const words=Object.keys(words1);

export function isFormingWord(array,index)
{
    const row=parseInt(index[0]),column=parseInt(index[1]);
    let word=array[row][column];
    return isVerticalWord(array,word,row,column) || isHorizontalWord(array,word,row,column) || isDiagonal1Word(array,word,row,column) || isDiagonal2Word(array,word,row,column);
    
}


function isVerticalWord(array,word,row,column)
{
    let arrayLength=array.length;
    let ver=row;
    let verWord=word;
    let up=ver-1;
    let down =ver+ 1;
    while(up >=0 )
    {
        if(array[up][column] === '')
            break;
            verWord = array[up][column]+verWord;
        up--;
    }
    while(down < arrayLength)
    {
        if(array[down][column] === '')
            break;
            verWord += array[down][column];
        down++;
    }

    if((words.includes(verWord) || words.includes(verWord.split("").reverse().join("")) ) && verWord.length > 1){
        return verWord.length;
    }
    return 0;
}
function isHorizontalWord(array,word,row,column)
{
    let arrayLength=array.length;
    let hor=column;
    let horWord=word;
    let left=hor-1;
    let right =hor+ 1;
    while(left >=0 )
    {
        if(array[row][left] === '')
            break;
            horWord = array[row][left]+horWord;
        left--;
    }
    while(right < arrayLength)
    {
        if(array[row][right] === '')
            break;
            horWord += array[row][right];
        right++;
    }
    if((words.includes(horWord) || words.includes(horWord.split("").reverse().join(""))) && horWord.length > 1){
        return horWord.length;
    }
    return 0;
}

function isDiagonal1Word(array,word,row,column)
{
    let arrayLength=array.length;
    let diagRow=row-1,diagColumn=column-1;
    while(diagRow >= 0 && diagColumn >=0)
    {
        if(array[diagRow][diagColumn] === '')
            break;
        word = array[diagRow][diagColumn] + word;
        diagRow--;
        diagColumn--;
    }
    diagRow=row+1;
    diagColumn=column+1;
    while(diagRow < arrayLength && diagColumn < arrayLength)
    {
        if(array[diagRow][diagColumn] === '')
            break;
        word += array[diagRow][diagColumn];
        diagRow++;
        diagColumn++;
    }
    if((words.includes(word) || words.includes(word.split("").reverse().join(""))) && word.length > 1){
        return word.length;
    }
    return 0;
}

function isDiagonal2Word(array,word,row,column)
{
    let arrayLength=array.length;
    let diagRow=row+1,diagColumn=column-1;
    while(diagRow >= 0 && diagColumn >=0 && diagRow < arrayLength && diagColumn < arrayLength)
    {
        if(array[diagRow][diagColumn] === '')
            break;
        word = array[diagRow][diagColumn] + word;
        diagRow++;
        diagColumn--;
    }
    diagRow=row-1;
    diagColumn=column+1;
    while(diagRow >= 0 && diagColumn >=0 && diagRow < arrayLength && diagColumn < arrayLength)
    {
        if(array[diagRow][diagColumn] === '')
            break;
        word += array[diagRow][diagColumn];
        diagRow--;
        diagColumn++;
    }
    if((words.includes(word) || words.includes(word.split("").reverse().join(""))) && word.length > 1){
            return word.length;
    }
    return 0;
}


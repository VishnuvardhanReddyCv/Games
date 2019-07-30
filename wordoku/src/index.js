import React from 'react';
import ReactDOM from 'react-dom';
import {isFormingWord} from './utils.js'



class Cell extends React.Component {
    render() {
        return(
    <div className="cells">
    <input className="cell" type="text" id={this.props.cellId} maxlength="1" onChange={this.props.handleChange} value={this.props.cellValue}/>
    </div>);
    }
}

class Row extends React.Component {
    render()
    {
        let cells=[];
        for(let i=0;i<this.props.noOfColumns;i++)
        {
            let element=<Cell  handleChange={(e) => this.props.handleChange(e)} cellValue={this.props.rowValues[i]} cellId={this.props.rowId + i.toString()}/>
            cells.push(element);
        }
        return(
            <div className="rows" id={this.props.rowId}>{cells}</div>
        );

    }
}

class Board extends React.Component
{
    constructor(props)
    {
        super(props);
        let grid=new Array(this.props.gridSize);
        for(let i=0;i<this.props.gridSize;i++)
        {
            grid[i] =new Array(this.props.gridSize);
            for(let j=0;j<this.props.gridSize;j++)
            {
                grid[i][j] = '';
            }
        }
        this.state={
         array : grid,
         isPlayerOneTurn : true,
         playerOneScore : 0,
         playerTwoScore : 0,
         winner : null
        } 
        this.handleChange.bind(this);
    }

    handleChange(e)
    {
        let cellValue=e.target.value;
        let test=/^(?:[A-Za-z]|)$/;
        if(!test.test(cellValue))
        {
            alert("Number or special character not allowed");
            return;
        }
        let key=e.target.getAttribute('id');
        let array=this.state.array.slice();
        array[key.charAt(0)][key.charAt(1)] = cellValue;
        let player1=this.state.playerOneScore,player2=this.state.playerTwoScore;
        if(this.state.isPlayerOneTurn)
        {
            player1 += isFormingWord(this.state.array,key);
        }
        else
        {
            player2 += isFormingWord(this.state.array,key);
        }
        let winner = null;
        if(this.state.array.filter((ar) => ar.includes('')).length === 0)
        {
            if(player1 > player2)
            {
                winner = "Player 1"
            }
            else if(player1 < player2)
            {
                winner = "Player 2"
            }
            else
            {
                winner = "Draw Guy"
            }
        }
        this.setState({
            array : array,
            isPlayerOneTurn : !this.state.isPlayerOneTurn,
            playerOneScore : player1,
            playerTwoScore : player2,
            winner : winner
        });
    }
    render(){
        let rows=[];
        for(let i=0;i<this.props.gridSize;i++)
        {
            let element=<Row noOfColumns={this.props.gridSize} handleChange={(e) => this.handleChange(e)} rowValues={this.state.array[i]} rowId={i.toString()}/>
            rows.push(element);
        }
        return (
            <div className="Board">
            <div className="head">
                <div className="title-info">
                <h1>Wordoku</h1>
                <h2>Turn  : Player {(this.state.isPlayerOneTurn)?"1" : "2"} </h2>
                </div>
                <div className="scores">
                <h2>Scores</h2>
                <div className="scoreDetails">
                <p>Player 1 : {this.state.playerOneScore}</p>
                <p>Player 2 : {this.state.playerTwoScore}</p>
                </div>
                </div>
                {!(this.state.winner === null) && <h1>{this.state.winner} Win</h1>}
            </div>
            <div className="grid">{rows}</div>
            </div>
        );
    }
}


class Game extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            gridSize : 0 
        }
    }
    render()
    {
        return(
            
            <div className="main">
            { (this.state.gridSize === 0) &&
            <div className="intialize">
            <h1>Choose Grid-size</h1>
            <div>
            <button onClick={() => this.setState({gridSize : 4})}>4</button>
            <button onClick={() => this.setState({gridSize : 6})}>6</button>
            <button onClick={() => this.setState({gridSize : 8})}>8</button>
            <button onClick={() => this.setState({gridSize : 10})}>10</button>
            </div>
            </div>
            }
            {!(this.state.gridSize === 0) && <Board gridSize={this.state.gridSize}/>}
            </div>
        );
    }
}



ReactDOM.render(<Game/>,document.getElementById("root"));





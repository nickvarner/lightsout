import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }
  createBoard() {
    let board = [];
    //create array-of-arrays of true/false values
    for(let y = 0; y < this.props.nrows; y++){
      let row = [];
      for(let x = 0; x < this.props.ncols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    //flip initial cell
    flipCell(y,x);
    //flip the neighbors
    flipCell(y, x-1)
    flipCell(y, x+1)
    flipCell(y-1, x)
    flipCell(y+1, x)
    // win when every cell is turned off
    //determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board, hasWon});
  }
  render() {
    if(this.state.hasWon){
      return (
        <div className='winner'>
          <span className="neon-orange">YOU</span>
          <span className="neon-blue">WIN</span>
        </div>
      )
    }
    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board
    // TODO
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++){
      let row = [];
      for (let x = 0; x < this.props.ncols; x++){
        let coord = `${y}-${x}`
        row.push(
        <Cell 
        key={coord} 
        isLit={this.state.board[y][x]}
        flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }
      tblBoard.push(<tr>{row}</tr>);
    }
    return (
      <div>
        <div className="neon-orange">lights</div>
        <div className="neon-blue">out</div>
        <table className='Board'>
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;

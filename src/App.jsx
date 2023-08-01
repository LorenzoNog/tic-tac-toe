import React from "react";
import { useState } from "react";
import { TURNS, WINNER_COMBOS } from "./constants";
import { Square } from "./components/Square";
import confetti from 'canvas-confetti'

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    //revisamos todas las posiciones ganadoras
    for (let combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    //si no hay ganador
    return null;
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    //si ya tiene algo o si hay un ganador
    if (board[index] || winner) return;
    //actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn; // ha guardado x u o
    setBoard(newBoard);
    //actualizar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold m-10">Tic Tac Toe</h1>
      <button
        onClick={resetGame}
        className="p-2 rounded-2xl bg-gray-400 text-white mb-5"
      >
        Resetear juego
      </button>
      <section className="grid grid-cols-3">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="flex flex-row ">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="grid items-center ">
          <div className="flex flex-col gap-5 items-center justify-center absolute top-[20%] left-[25%] w-[50vw] h-[50vh] rounded border-2 bg-gray-500">
            <h2 className="text-white text-[30px] uppercase font-bold">
              {winner === false ? "Empate" : "Felicidades! ganó:"}
            </h2>
            <header className="text-white text-[50px] font-bold">
              {winner}
            </header>
            <footer>
              <button
                onClick={resetGame}
                className="p-2 rounded-2xl bg-gray-400 text-white"
              >
                Jugar de nuevo
              </button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
};

export default App;

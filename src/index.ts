import "./style.scss";
import { ActiveBoards } from "./app";
const game = document.querySelector(".game");
const boards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".board");

function boardClick() {
  for (let i = 0; i < boards.length; i++) {
    const boardElm = boards[i];

    for (let j = 0; j < boardElm.children.length; j++) {
      const cellElm = boardElm.children[j];

      cellElm.addEventListener("click", () => cellClick(i, j));
    }
  }
}

console.log(boardClick());

function cellClick(boardIdx: number, cellIdx: number) {
  for (const boardElm of boards) {
    for (const cellElm of boardElm.children) {
      cellElm.className = "cell";
    }
  }

  const currentBoard: HTMLDivElement = boards[boardIdx];
  for (const cell of currentBoard.children) {
    cell.classList.add("active");
  }

  const activeBoardsArray = new ActiveBoards();
  const activeBoards = activeBoardsArray.getActiveBoards(boardIdx, cellIdx);

  console.log(activeBoards);

  for (let activeBoardIdx in activeBoards) {
    const activeBoardElm = boards[activeBoardIdx];
    const activeCells: number = activeBoards[activeBoardIdx];

    //   @ts-ignore
    for (let activeCellIdx of activeCells) {
      const activeCellElm = activeBoardElm.children[activeCellIdx];
      activeCellElm.className = "cell active";
    }
  }
}

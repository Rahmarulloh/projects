export class ActiveBoards {
  activeRows: any = {
    0: [0, 1, 2],
    1: [0, 1, 2],
    2: [0, 1, 2],
    3: [3, 4, 5],
    4: [3, 4, 5],
    5: [3, 4, 5],
    6: [6, 7, 8],
    7: [6, 7, 8],
    8: [6, 7, 8],
  };

  activeColumns: any = {
    0: [0, 3, 6],
    1: [1, 4, 7],
    2: [2, 5, 8],
    3: [0, 3, 6],
    4: [1, 4, 7],
    5: [2, 5, 8],
    6: [0, 3, 6],
    7: [1, 4, 7],
    8: [2, 5, 8],
  };

  getRows = (activeIdx: number) => {
    return this.activeRows[activeIdx];
  };

  getColumns = (activeIdx: number) => {
    return this.activeColumns[activeIdx];
  };

  getActiveBoards = (boardIdx: number, cellIdx: number) => {
    const result: number[] = [];

    const rowBoards = this.getRows(boardIdx);

    for (const row of rowBoards) {
      if (row !== boardIdx) result[row] = this.getRows(cellIdx);
    }

    const columnBoards = this.getColumns(boardIdx);

    for (const column of columnBoards) {
      if (column !== boardIdx) result[column] = this.getColumns(cellIdx);
    }

    return result;
  };
}

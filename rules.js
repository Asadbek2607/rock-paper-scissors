import chalk from "chalk";
import Table from "table";
export {Rules};

class Rules {
    constructor(moves) {
        this.moves = moves;
        this.winTable = this.createWinTable();
    }

    createWinTable() {
        const N = this.moves.length;
        const table = [];
        for (let i = 0; i < N; i++) {
            table.push(new Array(N).fill(null));
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                const distance = (j - i + N) % N;
                if (distance === 0) {
                    table[i][j] = "Draw";
                } else if (distance <= N / 2) {
                    table[i][j] = "Win";
                } else {
                    table[i][j] = "Lose";
                }
            }
        }

        return table;
    }

    getWinStatus(userMove, computerMove) {
        return this.winTable[userMove - 1][computerMove - 1];
    }

    displayHelpTable() {
        const N = this.moves.length;
        const header = ["PC\\User", ...this.moves];
        const tableData = [header];

        for (let i = 0; i < N; i++) {
            const row = [this.moves[i]];
            for (let j = 0; j < N; j++) {
                const cell = this.winTable[i][j];
                if (cell === "Draw") {
                    row.push(chalk.yellow(cell));
                } else if (cell === "Win") {
                    row.push(chalk.green(cell));
                } else {
                    row.push(chalk.red(cell));
                }
            }
            tableData.push(row);
        }

        const tableConfig = {
            border: Table.getBorderCharacters("norc"),
            columns: Array(tableData[0].length).fill({ alignment: "center" }),
            drawHorizontalLine: (index) => index === 1,
        };

        console.log(Table.table(tableData, tableConfig));
    }
}
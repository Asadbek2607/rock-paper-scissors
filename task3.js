import readline from "readline";
import { KeyGenerator, HMACCalculator } from "./HMAC.js";
import { Rules } from "./rules.js";
class Game {
    constructor(args) {
        if (args.length < 3 || args.length % 2 !== 1) {
            console.error(
                "Error: Invalid number of moves. Please provide an odd number of non-repeating strings (>=3)."
            );
            console.error("Example: node game.js rock paper scissors lizard Spock");
            process.exit(1);
        }

        this.moves = args;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async playGame() {
        const key = KeyGenerator.generateKey();
        const rules = new Rules(this.moves);
        const hmac = HMACCalculator.calculateHMAC(key, this.moves.join(" "));

        console.log("HMAC:", hmac);
        console.log("Available moves:");
        for (let i = 0; i < this.moves.length; i++) {
            console.log(`${i + 1} - ${this.moves[i]}`);
        }
        console.log("0 - exit");
        console.log("? - help");

        const userMove = await this.getUserMove();
        if (userMove === 0) {
            console.log("Exiting the game.");
            this.rl.close();
            process.exit(0);
        } else {
            const computerMove = Math.floor(Math.random() * this.moves.length) + 1;
            const winStatus = rules.getWinStatus(userMove, computerMove);

            console.log(`Your move: ${this.moves[userMove - 1]}`);
            console.log(`Computer move: ${this.moves[computerMove - 1]}`);

            if (winStatus === "Draw") {
                console.log("It's a draw!");
            } else if (winStatus === "Win") {
                console.log("You win!");
            } else {
                console.log("You lose!");
            }

            console.log("HMAC key:", key + "\n");
            this.playGame();
        }
    }

    getUserMove() {
        return new Promise((resolve) => {
            this.rl.question("Enter your move: ", (userInput) => {
                if (userInput === "?") {
                    const rules = new Rules(this.moves);
                    rules.displayHelpTable();
                    this.getUserMove().then(resolve);
                } else {
                    resolve(parseInt(userInput));
                }
            });
        });
    }
}

const args = process.argv.slice(2);
const game = new Game(args);
game.playGame();

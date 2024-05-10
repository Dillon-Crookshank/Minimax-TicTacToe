// Tic Tac Toe
class Agent {
    constructor() {

    }

    // board.gameOver()
    // -Returns 0 if game is not over
    // -Returns 1 if X wins
    // -Returns 2 if O wins
    // -Returns 3 if Draw

    //board.cellFree(int cell)
    // -Cell is an integer from 1 to 9 that represents the cells on the game board
    // -Returns True if no move has been played on that cell
    // -Returns False if otherwise

    //board.clone()
    // -Returns a copy of the current board

    //board.move(int cell)
    // -Performs a move on the given cell
    // -Places an X or an O based on whose move it is currently

    minimax(board, isMaximizing) {
        //Base case - return a value if anyone has won the game

        switch(board.gameOver()) {
            case 0: // Game is not over
                break;
            case 1: // X Wins
                return 1;
            case 2: // O Wins
                return -1;
            case 3: // Draw
                return 0;
        }
        
        let best_value = null

        // Iterate through all possible moves
        for (let cell = 1; cell <= 9; cell++) {
            // Continue if the cell isn't free
            if (!board.cellFree(cell)) {
                continue;
            }

            // Clone the board and make a move on the current cell
            let new_board = board.clone();
            new_board.move(cell)
            
            // Calculate the minimax of this sub-board
            let new_value = this.minimax(new_board, !isMaximizing)

            // Update the max/min based on if we are maximizing or not
            if (best_value === null || (isMaximizing && new_value > best_value) || (!isMaximizing && new_value < best_value)) {
                best_value = new_value;
            }
        }

        return best_value;
    }

    selectMove(board) {
        let best_value = null;
        let best_move = null;
        
        // Iterate through all possible moves
        for (let cell = 1; cell <= 9; cell++) {
            // Continue if the cell isn't free
            if (!board.cellFree(cell)) {
                continue;
            }

            // Clone the board and make a move
            let new_board = board.clone()
            new_board.move(cell)

            // Calculate the minimax of this sub-board
            let new_value = this.minimax(new_board, !board.playerOne)

            // Update the max/min and best move based on if we are maximizing or not
            if (best_value === null || (board.playerOne && new_value > best_value) || (!board.playerOne && new_value < best_value)) {
                best_value = new_value;
                best_move = cell;
            }
        }

        return best_move;
    }

}
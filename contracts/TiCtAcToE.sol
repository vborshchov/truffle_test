pragma solidity 0.5.0;

import "./Player.sol";
import "GameManager.sol";

contract TiCtAcToE
{
    uint8 leftMoves;
    bool public  isReady;
    address public activeUser;
    address public player1; // 1 = o
    address public player2; // 7 = x
    uint8[][] public board;
    address public winner = address(0);
    address public GM;
    uint256 public lastMoveTimeStamp;

    constructor() public {
        this.GM = GM;
        isReady = true;
        leftMoves = 9;
        initArray();
    }

    modifier onlyActiveUser() {
        require(msg.sender == activeUser, "Only active user can make a move");
        _;
    }

    modifier onlyGM() {
        require(msg.sender == GM, "Only Game manager can call this function");
        _;
    }

    function initArray() internal  {
        board = new uint8[][](3);
        for (uint8 i = 0; i < 3; i++) {
            uint8[] memory temp = new uint8[](3);
            for(uint8 j = 0; j < 3; j++){
                temp[j] = 0;
            }
            board[i] = temp;
        }
    }

    function setUser(address user) public{
        require(
            player1 == address(0) ||
            player2 == address(0),
            "two players are in the game"
        );

        if(player1 == address(0)){
            player1 = user;
        }else if(player2 == address(0)){
            player2 = user;
            activeUser = player2;
            isReady = false;
            for(uint8 i = 0; i < 3; i++ ){
                for(uint8 j = 0; j < 3; j++ ){
                    board[i][j] = 0;
                }
            }
        }
    }

    function move(uint8 col, uint8 row) public onlyActiveUser  {
        require(isReady == false, "game is not ready");
        require(leftMoves > 0, "there is no moves left");
        require(row < 3 && col < 3, "illegal move");
        require(board[col][row] == 0, "the cell is already used by another player");
        leftMoves = leftMoves - 1;
        lastMoveTimeStamp = block.timestamp;

        if(msg.sender == player1 ){
            board[col][row] = board[col][row] + 1;
            activeUser = player2;
        } else if(msg.sender == player2) {
            board[col][row] = board[col][row] + 7;
            activeUser = player1;
        }

        if(checkWinner() || leftMoves == 0){
            reward();
        }
    }

    function reset() internal{
        player1 = address(0);
        player2 = address(0);
        isReady = true;
        leftMoves = 9;
    }

    function checkWinner() internal returns(bool){

        //[(0,0),(0,1),(0,2)]
        //[(1,0),(1,1),(1,2)]
        //[(2,0),(2,1),(2,2)]
        
        uint8 mainDiagSum = 0;
        uint8 diagSum = 0;
        for (uint8 i = 0; i < 3; i++) {
            uint8 rowSum = 0;
            uint8 colSum = 0;
            for(uint8 j = 0; j < 3; j++){
                rowSum += board[i][j];
                colSum += board[j][i];
                if (i == j) {
                    mainDiagSum = mainDiagSum + board[i][i];
                }
                if (i + j == 2) {
                    diagSum += board[j][i];
                }
            }
            // check rows and columns
            if (rowSum == 3 || colSum == 3) {
                winner = player1;
                return true;
            } else if (rowSum == 21 || colSum == 21) {
                winner = player2;
                return true;
            }
        }
        // check diagonals
        if (mainDiagSum == 3 || diagSum == 3) {
            winner = player1;
            return true;
        } else if (mainDiagSum == 21 || diagSum == 21) {
            winner = player2;
            return true;
        }
        return false;
    }

    function reward() internal {
        if (winner == player1) {
            Player(player1).incWins();
            Player(player2).incDefeats();
        } else if (winner == player2) {
            Player(player2).incWins();
            Player(player1).incDefeats();
        }
    }

    function closeTable() internal {
        if (activeUser == player1) {
            winner = player2;
        } else if (activeUser == player2) {
            winner = player1;
        }
        reward();
    }

    function claimForWin() public {
        require(lastMoveTimeStamp - block.timestamp >= 300, "You have more time to make a move");
        closeTable();
    }
}
pragma solidity 0.5.0;

import "./TiCtAcToE.sol";

contract GameManager
{
    address[] public players;
    address[] public games;
    address public pendingGame;

    constructor() public {
    }

    function createGame() internal returns (TiCtAcToE) {
        TiCtAcToE newGame;
        newGame = new TiCtAcToE();
        games.push(address(newGame));
        return newGame;
    }

    function createPlayer(address user) internal returns (address) {
        address player;
        player = createPlayer(user);
        players.push(player);
        return player;
    }

    function joinGame() public returns (TiCtAcToE) {
        address player;
        TiCtAcToE gameContract;

        player = createPlayer(msg.sender);

        if (pendingGame == address(0)) {
            gameContract = createGame();
        } else {
            gameContract = TiCtAcToE(pendingGame);
            gameContract.setUser(msg.sender);
            pendingGame = address(0);
        }
        gameContract.setUser(player);
        return gameContract;
    }
}
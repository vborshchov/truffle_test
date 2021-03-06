pragma solidity 0.5.0;

import "./TiCtAcToE.sol";
import "./Player.sol";

contract GameManager
{
    address[] public players;
    address[] public games;
    address public pendingGame;
    // mapping (address => uint8) bla;

    event playerJoinedGame(address gameAddress);

    constructor() public {
    }

    function getGames() public view returns (address[] memory) {
        return games;
    }

    function createGame() internal returns (TiCtAcToE) {
        TiCtAcToE newGame;
        newGame = new TiCtAcToE();
        games.push(address(newGame));
        return newGame;
    }

    function createPlayer(address user, string memory nickName) internal returns (Player) {
        Player player;
        player = new Player(nickName, address(this), user);
        players.push(address(player));
        return player;
    }

    function joinGame(string memory nickName) public payable {
        require(msg.value >= 0.04 ether, "Please pay some value to join Game");

        Player player;
        TiCtAcToE gameContract;

        player = createPlayer(msg.sender, nickName);

        if (pendingGame == address(0)) {
            gameContract = createGame();
        } else {
            gameContract = TiCtAcToE(pendingGame);
            pendingGame = address(0);
        }
        gameContract.setUser(msg.sender);
        emit playerJoinedGame(address(gameContract));
    }
}
pragma solidity 0.5.0;

import "./TiCtAcToE.sol";

contract Player
{
    uint256 public wins;
    uint256 public loses;
    string public nickName;
    address currentGame;
    address playerOwner;
    address _gm;

    constructor(string memory name, address gm, address owner) public {
        owner = playerOwner;
        nickName = name;
        wins = 0;
        loses = 0;
        _gm = gm;
    }

    modifier onlyCurrentGame() {
        require(msg.sender == currentGame, "Only game can use that");
        _;
    }

    modifier onlyGameManager() {
        require(msg.sender == _gm, "Only game manager can use that");
        _;
    }

    function inkWins() external onlyCurrentGame{
        wins++;
    }

    function incLoses() external onlyCurrentGame{
        loses++;
    }

    function setLatestGame(address gameAddress) public onlyGameManager{
        currentGame = gameAddress;
    }
}
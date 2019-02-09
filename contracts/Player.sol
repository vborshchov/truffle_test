pragma solidity 0.5.0;

// import "./TiCtAcToE.sol";

contract Player
{
    address[] public wins;
    address[] public loses;
    string public nickName;
    address playerOwner;

    constructor(string memory name, address owner) public {
        owner = playerOwner;
        nickName = name;
    }
    
}
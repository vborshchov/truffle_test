pragma solidity 0.5.0;

// import "./TiCtAcToE.sol";

contract Player
{
    address[] public wins;
    address[] public loses;
    string public nickName;

    constructor(string memory name) public {
        nickName = name;
    }

    
}
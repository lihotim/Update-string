// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld{
    
    string public message;
    
    constructor() {
        message = "Hello World!";
    }
    
    function set(string memory _message) public {
        message = _message;   
    }
    
    function get() public view returns (string memory) {
        return message;
    }
    
}
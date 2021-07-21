pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../src/contracts/HelloWorld.sol";

contract TestHelloWorld {

    function testInitialMessage() public {
        HelloWorld helloWorld = HelloWorld(DeployedAddresses.HelloWorld());
        string memory expected = 'Hello World!';
        Assert.equal(helloWorld.message(), expected, "The original message should say: Hello World!");
    }


//https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d
    function testIfSetterFunctionCanUpdateMessage() public {
        HelloWorld helloWorld = HelloWorld(DeployedAddresses.HelloWorld());
        helloWorld.set("tim");
        string memory result = helloWorld.message();
        Assert.equal(result, "tim", "The new message should say: tim");

    }

}

// truffle test ./test/TestHelloWorld.sol
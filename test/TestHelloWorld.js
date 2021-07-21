const HelloWorld = artifacts.require("HelloWorld");

contract('HelloWorld', (accounts) => {
    
    let helloWorld;

    before(async () => {
        helloWorld = await HelloWorld.deployed();
    });

    describe('Part 1: deployment', async () => {

        it('deploys successfully', async () => {
            const address = await helloWorld.address;
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('Original message should be: Hello World!', async () => {  
            const message = await helloWorld.message();
            assert.equal(message,'Hello World!')

         })

    });

    describe('Part 2: Set & Get', async () => {

        it('getter function works', async () => {
            const message = await helloWorld.message();
            assert.equal(message,'Hello World!');
        })

        it('setter function works', async () => {
            await helloWorld.set('Hey World!');
            const message = await helloWorld.message();
            assert.equal(message,'Hey World!');
        })
        
    });

});

// truffle test ./test/TestHelloWorld.js
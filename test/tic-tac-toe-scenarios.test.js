const TiCtAcToE = artifacts.require("TiCtAcToE");

contract('TiCtAcToE', accounts => {

    let instance
    let owner = accounts[0]
    let account = accounts[1]

    beforeEach('instance', async () => {
        instance = await TiCtAcToE.new()
    });

    describe('scenarios:', () => {
        it("first joining player is a winner", async () => {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
            
            await player1WinGameMoves(instance, account, owner)
            
            assert.equal( await instance.winner(), owner )
        });

        it("second joining player is a winner", async () => {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
    
            await player2WinGameMoves(instance, account, owner)
            
            assert.equal( await instance.winner(), account )
        });

        it("no one is a winner", async () => {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
    
            await tieGameMoves(instance, account, owner)

            assert.equal(await instance.winner() , '0x0000000000000000000000000000000000000000')
            assert.equal(await instance.player1(), '0x0000000000000000000000000000000000000000')
            assert.equal(await instance.player2(), '0x0000000000000000000000000000000000000000')
            assert.equal(await instance.isReady(), true)
        });

        it("check availability of move after end of the game", async () => {
            try {
                await instance.setUser({from: owner})
                await instance.setUser({from: account})
        
                await tieGameMoves(instance, account, owner)

                await instance.move( 2,0, {from:owner})
                assert.fail()
            } catch (error) {
                assert(error.toString().includes('game is not ready'), error.toString())
            }

        })
    })
});


tieGameMoves = async (instance, player1, player2) => {
    await instance.move( 1,1, {from:player1})
    await instance.move( 0,1, {from:player2})
    await instance.move( 0,2, {from:player1})
    await instance.move( 2,0, {from:player2})
    await instance.move( 2,1, {from:player1})
    await instance.move( 1,0, {from:player2})
    await instance.move( 0,0, {from:player1})
    await instance.move( 2,2, {from:player2})
    await instance.move( 1,2, {from:player1})
}

player1WinGameMoves = async (instance, player1, player2) => {
    await instance.move( 0,0, {from:player1})
    await instance.move( 1,1, {from:player2})
    await instance.move( 0,1, {from:player1})
    await instance.move( 0,2, {from:player2})
    await instance.move( 1,0, {from:player1})
    await instance.move( 2,0, {from:player2})
}

player2WinGameMoves = async (instance, player1, player2) => {
    await instance.move( 1,1, {from:player1})
    await instance.move( 0,1, {from:player2})
    await instance.move( 0,2, {from:player1})
    await instance.move( 1,0, {from:player2})
    await instance.move( 2,0, {from:player1})
}
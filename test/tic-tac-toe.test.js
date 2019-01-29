const TiCtAcToE = artifacts.require("TiCtAcToE");

contract('TiCtAcToE', accounts => {

    let instance
    let owner = accounts[0]
    let account = accounts[1]

    beforeEach('instance', async () => {
        instance = await TiCtAcToE.new()
    })

    it('should be ready to start the game', async () =>{
        let result = await instance.isReady()
        assert.equal(result, true)
    })

    it('should have empty board', async () =>{
        let res00 = await instance.board(0,0)
        let res01 = await instance.board(0,1)
        let res02 = await instance.board(0,2)
        let res10 = await instance.board(1,0)
        let res11 = await instance.board(1,1)
        let res12 = await instance.board(1,2)
        let res20 = await instance.board(2,0)
        let res21 = await instance.board(2,1)
        let res22 = await instance.board(2,2)

        let product = res00.toNumber()*res01.toNumber()*res02.toNumber()*res10.toNumber()*res11.toNumber()*res12.toNumber()*res20.toNumber()*res21.toNumber()*res22.toNumber()       
        expect(product).to.equal(0)
    })

    it('should set active user', async () => {
        await instance.setUser({from: owner})
        await instance.setUser({from: account})
        let currentActiveUser = await instance.activeUser()
        assert.equal(currentActiveUser, account)
    })

    it('should let player to make a move', async () => {
        await instance.setUser({from: owner})
        await instance.setUser({from: account})
        await instance.move(1,1, {from: account})
        const cell = await instance.board(1,1)
        assert.equal(cell.toNumber(), 7)
    })

    it('should fail to move to already taken board cell', async () => {
        try {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
            await instance.move(1,1, {from: account})
            await instance.move(1,1, {from: owner})
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('the cell is already used by another player'), error.toString())
        }
    })
    it('should check legality of move', async () => {
        try {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
            await instance.move(4,1, {from: account})
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('illegal move'), error.toString())
        }
    })

    describe('scenarios:', () => {
        it("first joining player is a winner", async () => {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
            
            instance.move( 0,0, {from:account})
            instance.move( 1,1, {from:owner})
            instance.move( 0,1, {from:account})
            instance.move( 0,2, {from:owner})
            instance.move( 1,0, {from:account})
            instance.move( 2,0, {from:owner})
            
            const winner = await instance.winner()
            assert.equal( winner, owner )
        });

        it("second joining player is a winner", async () => {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
    
            instance.move( 1,1, {from:account})
            instance.move( 0,1, {from:owner})
            instance.move( 0,2, {from:account})
            instance.move( 1,0, {from:owner})
            instance.move( 2,0, {from:account})
            
            const winner = await instance.winner()
            assert.equal( winner, account )
        });

        it("no one is a winner", async () => {
            await instance.setUser({from: owner})
            await instance.setUser({from: account})
    
            instance.move( 1,1, {from:account})
            instance.move( 0,1, {from:owner})
            instance.move( 0,2, {from:account})
            instance.move( 2,0, {from:owner})
            instance.move( 2,1, {from:account})
            instance.move( 1,0, {from:owner})
            instance.move( 0,0, {from:account})
            instance.move( 2,2, {from:owner})
            instance.move( 1,2, {from:account})

            const winner = await instance.winner()
            const player1 = await instance.player1();
            const player2 = await instance.player2();
            const isReady = await instance.isReady();
            
            assert.equal(winner, '0x0000000000000000000000000000000000000000')
            assert.equal(player1, '0x0000000000000000000000000000000000000000')
            assert.equal(player2, '0x0000000000000000000000000000000000000000')
            assert.equal(isReady, true)
        })
    })
})
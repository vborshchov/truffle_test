const TiCtAcToE = artifacts.require("TiCtAcToE");

contract('TiCtAcToE', accounts => {

    let instance
    let owner = accounts[0]
    let account = accounts[1]

    beforeEach('instance', async () => {
        instance = await TiCtAcToE.new()
    })

    it('should be ready to start the game', async () =>{
        assert.equal(await instance.isReady(), true)
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
        await instance.setUser(owner)
        await instance.setUser(account)
        let currentActiveUser = await instance.activeUser()
        assert.equal(currentActiveUser, account)
    })

    it('should let player to make a move', async () => {
        await instance.setUser(owner)
        await instance.setUser(account)
        await instance.move(1,1, {from: account})
        const cell = await instance.board(1,1)
        assert.equal(cell.toNumber(), 7)
    })

    it('should fail to move to already taken board cell', async () => {
        try {
            await instance.setUser(owner)
            await instance.setUser(account)
            await instance.move(1,1, {from: account})
            await instance.move(1,1, {from: owner})
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('the cell is already used by another player'), error.toString())
        }
    })
    it('should check legality of move', async () => {
        try {
            await instance.setUser(owner)
            await instance.setUser(account)
            await instance.move(4,1, {from: account})
            assert.fail()
        } catch (error) {
            assert(error.toString().includes('illegal move'), error.toString())
        }
    })
})
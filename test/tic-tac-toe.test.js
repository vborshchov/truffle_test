const TiCtAcToE = artifacts.require("TiCtAcToE");

contract('TiCtAcToE', accounts => {

    let instance
    let owner = accounts[0]
    let account = accounts[1]

    console.log(owner)
    console.log(account)

    beforeEach(async () => {
        instance = await TiCtAcToE.deployed()
    })

    it('should be ready to start the game', async () =>{
        let result = await instance.isReady.call()
        assert.equal(result, true)
    })

    it('should have empty board', async () =>{
        let res00 = await instance.board.call(0,0)
        let res01 = await instance.board.call(0,1)
        let res02 = await instance.board.call(0,2)
        let res10 = await instance.board.call(1,0)
        let res11 = await instance.board.call(1,1)
        let res12 = await instance.board.call(1,2)
        let res20 = await instance.board.call(2,0)
        let res21 = await instance.board.call(2,1)
        let res22 = await instance.board.call(2,2)

        let product = res00.toNumber()*res01.toNumber()*res02.toNumber()*res10.toNumber()*res11.toNumber()*res12.toNumber()*res20.toNumber()*res21.toNumber()*res22.toNumber()       
        expect(product).to.equal(0)
    })

    it('should set active user', async () => {
        await instance.setUser({from: owner})
        await instance.setUser({from: account})
        let currentActiveUser = await instance.activeUser()
        assert.equal(currentActiveUser, account)
    })
})
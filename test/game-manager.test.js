const GameManager = artifacts.require("GameManager");

contract('GameManager', accounts => {

    let instance
    let owner = accounts[0]
    let account = accounts[1]

    beforeEach('instance', async () => {
        instance = await GameManager.new()
    })

    it('should be valid instance', async () =>{
        assert.equal(typeof instance, 'object')
    })

    it('create TiCtAcToE game instance', () => {})

})
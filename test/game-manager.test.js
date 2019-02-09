const GameManager = artifacts.require("GameManager");
const TiCtAcToE = artifacts.require("TiCtAcToE");

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

    it('let user to join to TiCtAcToE game', async () => {
        await instance.joinGame("Victor", {from: owner})
        const games = await instance.getGames()
        const gameInstance = await TiCtAcToE.at(games[0])
        const player = await gameInstance.player1()
        assert.equal(player, owner)
    })

})
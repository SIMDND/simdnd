//Get Request

//localhost:3674/piece/get-pieces/52/Charmander

const pieces = pm.response.json()

pm.test('has the correct character name', () => {
    pm.expect(pieces[1].character_name).to.equal("Vaporeon")
})


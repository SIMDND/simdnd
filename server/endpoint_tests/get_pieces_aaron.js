//Get Request

//localhost:3674/piece/get-pieces/52/Charmander

/*

const pieces = pm.response.json()

pm.test('has the correct character name', () => {
    pm.expect(pieces[1].character_name).to.equal("Vaporeon")
})

*/

//Get Request

//localhost:3674/piece/get-pieces/52/Charmander

/*

const pieces = pm.response.json();

pm.test("Status code is 200", ()=>{
    pm.response.to.have.status(200);
});

*/

//Post Request

// localhost:3674/piece/create

/*
body - {
	"campaign_id":52,
	"board_name":"Charmander",
	"character_name":"Ben Affleck",
	"piece_type":"npc",
	"x_coordinate":3,
	"y_coordinate":5,
	"image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/220px-Ben_Affleck_by_Gage_Skidmore_3.jpg"
}

*/

/*
    const pieces = pm.response.json();

    let a = pieces.findIndex(element=>element.character_name==='Ben Affleck');

    pm.test('contains added item', function(){
        pm.expect(a).to.not.equal(-1);
        
})

*/

//Delete Request

//localhost:3674/piece/delete/52/Charmander/Ben Affleck

/*

const pieces = pm.response.json()

let a = pieces.findIndex(element=>element.character_name==='Ben Affleck');

pm.test('Does not contain deleted Item', function(){
        pm.expect(a).to.equal(-1);
        
})

*/

//Put request

//localhost:3674/piece/edit

/*
body - 
    {
	"campaign_id":52,
	"board_name":"Charmander",
	"new_character_name":"mewFour"
	"character_name":"Ben Affleck",
	"piece_type":"npc",
	"x_coordinate":3,
	"y_coordinate":5,
	"image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/220px-Ben_Affleck_by_Gage_Skidmore_3.jpg"
}
*/

/*
    const pieces = pm.response.json();

let numberOfTimesBenAffleckIsSeen = 0;

pieces.forEach((element,index,arr)=>{
    if (element.character_name==='Ben Affleck'){
        numberOfTimesBenAffleckIsSeen++;
    }
})

pm.test('Does not contain edited name', function(){
        pm.expect(numberOfTimesBenAffleckIsSeen).to.equal(0);
        
})

*/
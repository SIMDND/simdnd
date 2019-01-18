//destructure the logic functions
const {toggle} = require('../logic/logic_matt')
const {cloneArray} = require('../logic/logic_aaron')
const getType = require('jest-get-type');
const {mergeArrays} = require('../logic/logic_aaron')
const {getPlayerTokens} = require('../logic/logic_aaron')
const {shuffleTokens} = require('../logic/logic_aaron')
const {checkForPlayers} = require('../logic/logic_aaron')

describe('Tests Toggle: The Toggle Tester', () => {
    test('if given false returns true', () => {
        expect(toggle(false)).toBe(true)
    })
    test('if given true returns false', () => {
        expect(toggle(true)).toBe(false)
    })
});

describe('Tests the toggle functionality', () =>{
    test('if given true, returns false', ()=> {
        var answer = toggle(true)
        expect(answer).toBe(false)
    })
})

describe('Clone Array Tester', () =>{
    test("return type should be an array", () => {
        let a = cloneArray([{id:0,name:'a'},{id:1,name:'b'}])
        expect(getType(a)).toBe('array')
	})
})

describe('Merge Arrays tester', () =>{
    test("Merge array return value should have no property x_coordinate", () =>{
        let a = mergeArrays([{id:0,x:3,y:2,type:'Baggai'}],[{character_name:"aaron",piece_type:"player",x_coordinate:0,y_coordinate:0,image_url:'taco'}]);
        expect(a[1].x_coordinate).toBe(undefined);
    })
})

describe('Get Player Tokens Tester', () =>{
    test('Return value of getPlayerTokens should not contain any types npc',()=>{
        let a = getPlayerTokens([{piece_type:'npc',character_name:'Fred'},{piece_type:'player',character_name:'George'}]);
        expect(a[0].piece_type !== 'npc').toBe(true)
    })
})

describe('Shuffle Tokens Test', () =>{
    test('Return value of shuffle tokens should be same length as tokens passed in', ()=>{
        let a = shuffleTokens([{id:0,name:'Charlie'},{id:1,name:'Delta'}]);
        expect(a.length).toBe(2);
    })
})

describe('Check for Players Test', () =>{
    test('Array with element that has piece_type of player should return true', ()=>{
        let a = checkForPlayers([{piece_type:'npc',name:'Charlie'},{piece_type:'player',name:'Delta'}]);
        expect(a).toEqual(true);
    })
})
//destructure the logic functions
const {toggle, increment, decrement, } = require('../logic/logic_matt')
const {cloneArray} = require('../logic/logic_aaron')
const getType = require('jest-get-type');
const {mergeArrays} = require('../logic/logic_aaron')
const {getPlayerTokens} = require('../logic/logic_aaron')
const {shuffleTokens} = require('../logic/logic_aaron')
const {checkForPlayers} = require('../logic/logic_aaron')
const {compareArrayLengths} = require('../logic/logic_aaron')


//Matt's Tests
describe('Tests Toggle: The Toggle Tester', () => {
    test('if given false returns true', () => {
        expect(toggle(false)).toBe(true)
    })
    test('if given true returns false', () => {
        expect(toggle(true)).toBe(false)
    })
});

describe('Increment should return the input value plus 1', () =>{
    test('if given 1 returns 2', ()=> {
        expect(increment(1)).toBe(2)
    })
    test('if given 0 returns 1', ()=> {
        expect(increment(0)).toBe(1)
    })
})

describe('Decrement should return the input value minus 1', () =>{
    test('if given 1 returns 0', ()=> {
        expect(decrement(1)).toBe(0)
    })
    test('if given 2 returns 1', ()=> {
        expect(decrement(2)).toBe(1)
    })
})

//Aaron's tests

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


describe('Check for Players Test', () =>{
    test('Array with element that has piece_type of player should return true', ()=>{
        let a = checkForPlayers([{piece_type:'npc',name:'Charlie'},{piece_type:'player',name:'Delta'}]);
        expect(a).toEqual(true);
    })
})

describe('Compare Array Lengths should only return true if the 1st array is smaller than the second',()=>{
    test('With arrays of equal lengths the test should return false',()=>{
        expect([3,5,6].length<[6,5,6].length).toEqual(false);
    })
})
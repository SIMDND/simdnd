//destructure the logic functions
const {toggle} = require('../logic/logic_matt')

describe('Tests Toggle: The Toggle Tester', () => {
    test('if given false returns true', () => {
        expect(toggle(false)).toBe(true)
    })
});

describe('Tests the toggle functionality', () =>{
    test('if given true, returns false', ()=> {
        var answer = toggle(true)
        expect(answer).toBe(false)
    })
})
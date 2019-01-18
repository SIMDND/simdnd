//destructure the logic functions
const {toggle} = require('../logic/logic_matt')

describe('Tests Toggle: The Toggle Tester', () => {
    test('if given false returns true', () => {
        expect(toggle(false)).toBe(true)
    })
    test('if given true returns false', () => {
        expect(toggle(true)).toBe(false)
    })
});


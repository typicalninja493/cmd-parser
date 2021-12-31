const { parse } = require('../dist/parser')
const assert = require('assert')
const internal = require('stream')
const commandString = `!command -some -test true`

const { args } = parse('!', commandString)

describe('#Args.get', () => {
	it('Should return undefined if argument does not Exists', () => {
		assert.equal(args.get('some-Argument-that-does-not-exists'), undefined)
	})

	it('Should Error if argument does not Exists', () => {
		assert.throws(() => {
			args.get('some-Argument-that-does-not-exists', true)
		})
	});

	it('Should return the value of the Argument', () => {
		assert.equal(args.get('test'), 'true')
	})
});

describe('#Args.has', () => {
	it('It Should Return true since Argument Exists', () => {
		assert.equal(args.has('some'), true)
	})

	it('It Should Return false since Argument is Empty', () => {
		assert.equal(args.has('some', true), false)
	})
});

describe('#Args.find', () => {
	it('It Should return undefined since arg does not Exists', () => {
		assert.equal(args.find((val) => val == null), undefined)
	})

	it('It Should return a Object containing args details', () => {
		const val = args.find((_val, key) => key == 'some')

		assert.notStrictEqual(val, undefined);
		assert.deepStrictEqual(val, {
			arg: 'some',
			value: ''
		})
	})
})
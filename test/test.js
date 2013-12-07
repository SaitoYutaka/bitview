describe('d2h', function(){
    it('dec to hex', function(){
	expect('0').to.eql(d2h('0'))
	expect('1').to.eql(d2h('1'))
	expect('2').to.eql(d2h('2'))
	expect('3').to.eql(d2h('3'))
	expect('4').to.eql(d2h('4'))
	expect('5').to.eql(d2h('5'))
	expect('6').to.eql(d2h('6'))
	expect('7').to.eql(d2h('7'))
	expect('8').to.eql(d2h('8'))
	expect('9').to.eql(d2h('9'))
	expect('a').to.eql(d2h('10'))
	expect('b').to.eql(d2h('11'))
	expect('c').to.eql(d2h('12'))
	expect('d').to.eql(d2h('13'))
	expect('e').to.eql(d2h('14'))
	expect('f').to.eql(d2h('15'))
    })
})

describe('hex2bit', function(){
    it('hex to bit', function(){
	expect('00000000').to.eql(hex2bit('00'))
	expect('11111111').to.eql(hex2bit('ff'))
	expect('1111\n1010').to.eql(hex2bit('f\na'))
    })
})

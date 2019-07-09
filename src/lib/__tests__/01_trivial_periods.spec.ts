import moment from 'moment'
import Account from '../Account';
import Rule from '../Rule';
import Event from '../Event';

it('Trivial Periods', () => {
    const payAccount = new Account('Payday')
    const checkingAccount = new Account('Checking');

    const startingAt = moment('2019-07-12');

    const payRule = new Rule({
        startingAt: startingAt.toDate(),
        amount: 2000,
        fromAccountId: payAccount.id,
        toAccountId: checkingAccount.id,
        period: '0 0 0 12/14 JUL ? 2019'
    })

    let testDate = moment('2019-07-01').toDate()
    let sum = 0

    const iterator = payRule.iterator()
    while (testDate < moment('2020-07-01').toDate()) {
        const nextVal = iterator.next().value
        sum += nextVal.amount
        testDate = nextVal.date
        console.log(`${moment(nextVal.date).format('YYYY-MM-DD')} $${nextVal.amount}`)
    }

    expect(sum).toEqual(52000)
})
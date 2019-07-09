import ObjectId from 'bson-objectid'
import { parseExpression } from 'cron-parser'

import Event from './Event'

interface IRule {
    
    fromAccountId: ObjectId;
    toAccountId: ObjectId;
    
    amount: number;
    period: string;

    startingAt?: Date;
}

export default class Rule {
    public id: ObjectId;
    
    public fromAccountId: ObjectId;
    public toAccountId: ObjectId;
    
    public amount: number;
    public period: string;
    public startingAt: Date;

    constructor(base: IRule) {
        Object.assign(this, base);
        this.startingAt = this.startingAt || new Date;
        this.id = new ObjectId;
    }

    public *iterator(): IterableIterator<Event> {
        let interval = parseExpression(
            this.period, 
            {
                currentDate: this.startingAt,
                iterator: true
            }
        );
        
        while (true) {
            const nextDate = interval.next().toDate();
            const nextValue = this.getValueAt(nextDate);
            const nextEvent: Event = {
                ruleId: this.id,
                toAccountId: this.toAccountId,
                fromAccountId: this.fromAccountId,
                date: nextDate,
                amount: nextValue
            };
            yield nextEvent;
        }
    }

    public getValueAt(date: Date): number {
        return this.amount
    }
}

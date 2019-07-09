import ObjectId from 'bson-objectid'

export default interface Event {
    ruleId: ObjectId;
    toAccountId: ObjectId;
    fromAccountId: ObjectId;
    date: Date;
    amount: number;
}

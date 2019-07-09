import ObjectId from 'bson-objectid'

export default class Account {
    id: ObjectId;
    shortName: string;
    description: string;

    constructor(shortName: string, description?: string) {
        this.id = new ObjectId;
        this.shortName = shortName;
        this.description = description;
    }
}

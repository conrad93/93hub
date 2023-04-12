export class City {
    public _id: string;
    public name: string;
    public code: string;
    public countryCode: string;
    public status: number;
    constructor(_id: string, name: string, code: string, countryCode: string, status: number) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.countryCode = countryCode;
        this.status = status;
    }
}

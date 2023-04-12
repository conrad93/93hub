export class Country {
    public _id: string;
    public name: string;
    public code: string;
    public isd: string;
    public flag: string;
    public status: number;
    constructor(_id: string, name: string, code: string, isd: string, flag: string, status: number) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.isd = isd;
        this.flag = flag;
        this.status = status;
    }
}

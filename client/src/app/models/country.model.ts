export class Country {
    public _id: string;
    public name: string;
    public code: string;
    public isd: string;
    public flag: string;
    public nationality: string;
    public status: number;
    constructor(_id: string, name: string, code: string, isd: string, flag: string, nationality: string, status: number) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.isd = isd;
        this.flag = flag;
        this.nationality = nationality;
        this.status = status;
    }
}

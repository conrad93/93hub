export class Category {
    public _id: string;
    public name: string;
    public code: string;
    public status: number;
    constructor(_id: string, name: string, code: string, status: number) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.status = status;
    }
}

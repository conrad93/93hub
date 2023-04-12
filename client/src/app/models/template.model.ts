export class Template {
    public _id: string;
    public name: string;
    public code: string;
    public template: string;
    public details: any;
    public categoryCode: string;
    public status: number;
    constructor(_id: string, name: string, code: string, template: string, details: any, categoryCode: string, status: number) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.template = template;
        this.details = details;
        this.categoryCode = categoryCode;
        this.status = status;
    }
}

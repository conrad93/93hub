export class Employee {
    public _id: string;
    public name: string;
    public email: string;
    public password: string;
    public token: string;
    public status: number;
    constructor(_id: string, name: string, email: string, password: string, token: string, status: number) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.token = token;
        this.status = status;
    }
}

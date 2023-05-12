export class Customer {
    public _id: string;
    public first_name: string;
    public last_name: string;
    public password: string;
    public token: string;
    public status: number;
    public email: string;
    public isd: string;
    public phone_no: string;
    public address: string;
    public city: string;
    public country: string;
    public nationality: string;
    public dob: string;
    public username: string;
    constructor(_id: string, first_name: string, last_name: string, password: string, token: string, status: number, email: string, isd: string, phone_no: string, address: string, city: string, country: string, nationality: string, dob: string, username: string) {
        this._id = _id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.token = token;
        this.status = status;
        this.email = email;
        this.isd = isd;
        this.phone_no = phone_no;
        this.address = address;
        this.city = city;
        this.country = country;
        this.nationality = nationality;
        this.dob = dob;
        this.username = username;
    }
}

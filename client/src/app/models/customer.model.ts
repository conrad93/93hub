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
    public template_id: string;
    public template_data: any;
    public title: string;
    public facebook_link: string;
    public twitter_link: string;
    public github_link: string;
    public linkedin_link: string;
    public profile_pic: string;
    public about_me: string;
    public resume: string;
    public skills_array: any[];
    public education_array: any[];
    public experience_array: any[];
    constructor(
        _id: string, 
        first_name: string, 
        last_name: string, 
        password: string, 
        token: string, 
        status: number, 
        email: string, 
        isd: string, 
        phone_no: string, 
        address: string, 
        city: string, 
        country: string, 
        nationality: string, 
        dob: string, 
        username: string,
        template_id: string,
        template_data: any,
        title: string,
        facebook_link: string,
        twitter_link: string,
        github_link: string,
        linkedin_link: string,
        profile_pic: string,
        about_me: string,
        resume: string,
        skills_array: any[],
        education_array: any[],
        experience_array: any[]
    ) {
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
        this.template_id = template_id;
        this.template_data = template_data;
        this.title = title;
        this.facebook_link = facebook_link;
        this.twitter_link = twitter_link;
        this.github_link = github_link;
        this.linkedin_link = linkedin_link;
        this.profile_pic = profile_pic;
        this.about_me = about_me;
        this.resume = resume;
        this.skills_array = skills_array;
        this.education_array = education_array;
        this.experience_array = experience_array;
    }
}

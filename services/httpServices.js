import axios from "axios";

export default class httpServices{
    constructor(){
        this.axios=axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL_+'/api'
        });
    }
    post(url, data){
        return this.axios.post(url,data);
    }
};  

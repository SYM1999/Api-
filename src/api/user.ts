import myAxios from "./axios";

export function loginAPI(paramsList:any){
    return myAxios({
        url:'/api/login',
        methods:'post',
        data:paramsList
    })
}
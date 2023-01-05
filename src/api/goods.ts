import myAxios from "./axios";


export function getListAPI() {
    return myAxios(
        {
        // http://81.69.185.65:5001/hcharts1
        url: 'http://81.69.185.65:5001/hcharts11',
        methods: 'get',
        params: {
            page: 1,
            pageSize: 10
                }
        },
        {
            repeat_requst_cancel:false,
            loading:true
        },
        {
            text:"正在加载.........."
        }
    )
}
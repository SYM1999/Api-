import axios from 'axios'
import { AxiosRequestConfig } from 'axios/index.d'
import { ElLoading, ElMessage } from 'element-plus';

interface axiosConfig {
    url: string;
    methods: string;
    data?: any;
    params?: any;
}
interface customOptions {
    repeat_requst_cancel: Boolean,
    loading:Boolean
}
interface loadingOptions{
    target?:string,
    body?:Boolean,
    fullscreen?:Boolean,
    lock?:Boolean,
    text?:string,
    spinner?:string,
    background?:string,
}

const LoadingInstance = {
    _target:null,  //用来保存Lading实例
    _count: 0
}


function myAxios(axiosConfig: axiosConfig, customOptions?: customOptions,loadingOptions?:loadingOptions) {
    //axiosConfig是接受的单个请求的单独参数
    const service = axios.create({
        //设置公共参数
        baseURL: "http://localhost:8888",  //设置统一的请求前缀
        timeout: 10000,
    });

    let custom_options = Object.assign({  //合并参数
        repeat_requst_cancel: true,      //是否开启重复取消请求
        loading: false                    //是否开启loading效果
    }, customOptions)

    service.interceptors.request.use(
        //config（发送的请求数据）
        config => {
            removePending(config);  //删除map中重复的
            custom_options.repeat_requst_cancel && addPending(config);     //添加新的 

            //loading
            if (custom_options.loading) {
                LoadingInstance._count++;
                if (LoadingInstance._count === 1) {
                    LoadingInstance._target= ElLoading.service(loadingOptions)
                }
            }

            return config;
        },
        error => {
            return Promise.reject(error)
        }
    )

    service.interceptors.response.use(
        // AxiosResponse
        response => {
            removePending(response.config)    //删除map中请求完成的
            customOptions?.loading && closeLoading(custom_options)
            return response;
        },
        error => {
            error.config && removePending(error.config);
            httpErrorStatusHandle(error); // 处理错误状态码
            return Promise.reject(error)
        }
    )


    return service(axiosConfig)
}

export default myAxios



//取消请求

const pendingMap = new Map();//存储请求

/**
 *
 *生成每个请求唯一的值（根据 请求地址，请求方式，请求参数）
 * @param {*} config 
 */

function getPendingKey(config: AxiosRequestConfig) {
    let { url, method, params, data } = config;
    if (typeof data === 'string') data = JSON.parse(data)
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 *判断重复请求并存储进队列
 *
 * @param {*} config
 */
function addPending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        console.log("cancel:", cancel)
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
        }
    })
}

/**
 *取消重复请求并删除队列
 *
 * @param {*} config
 */
function removePending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey)
    }
}
// function cancel(message) {
//     if (token.reason) {
//       // Cancellation has already been requested
//       return;
//     }

//     token.reason = new CanceledError(message);
//     resolvePromise(token.reason);
//   })



/**
 *
 * 关闭loading层
 * @param {*} _options
 */
function closeLoading(_options:customOptions){
    if(_options.loading && LoadingInstance._count>0) LoadingInstance._count--;
    if(LoadingInstance._count===0) {
        LoadingInstance._target.close();
        LoadingInstance._target=null
    }
}

/**
 * 处理异常
 * @param {*} error 
 */
 /**
 * 处理异常
 * @param {*} error 
 */
function httpErrorStatusHandle(error) {
    // 处理被取消的请求
    if(axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
    let message = '';
    if (error && error.response) {
      switch(error.response.status) {
        case 302: message = '接口重定向了！';break;
        case 400: message = '参数不正确！';break;
        case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
        case 403: message = '您没有权限操作！'; break;
        case 404: message = `请求地址出错: ${error.response.config.url}`; break; // 在正确域名下
        case 408: message = '请求超时！'; break;
        case 409: message = '系统已存在相同数据！'; break;
        case 500: message = '服务器内部错误！'; break;
        case 501: message = '服务未实现！'; break;
        case 502: message = '网关错误！'; break;
        case 503: message = '服务不可用！'; break;
        case 504: message = '服务暂时无法访问，请稍后再试！'; break;
        case 505: message = 'HTTP版本不受支持！'; break;
        default: message = '异常问题，请联系管理员！'; break
      }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！';
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
  
    ElMessage({
      type: 'error',
      message
    })
  }

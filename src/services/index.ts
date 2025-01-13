// app.tsx 文件

import { RequestConfig } from '@umijs/max';
import qs from 'qs';

export const request: RequestConfig = {
    // timeout: 3000,
    // other axios options you want
    baseURL: 'http://47.106.95.15:8000',
    paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    },
    errorConfig: {
        // errorHandler() { },
        // errorThrower() { },
    },
    // 请求拦截器
    requestInterceptors: [

    ],
    // 响应拦截器
    responseInterceptors: [
    ],
};
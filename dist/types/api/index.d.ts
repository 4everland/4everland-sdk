import { AxiosInstance, AxiosRequestConfig } from 'axios';
export declare const pinningServiceApi: string;
export declare const registerApi: string;
export declare const endpoint: string;
declare class Request {
    instance: AxiosInstance;
    constructor(config: AxiosRequestConfig);
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(config: AxiosRequestConfig): Promise<T>;
    post<T>(config: AxiosRequestConfig): Promise<T>;
    put<T>(config: AxiosRequestConfig): Promise<T>;
    delete<T>(config: AxiosRequestConfig): Promise<T>;
}
declare const authRequest: Request;
declare const pinningRequest: Request;
export { authRequest, pinningRequest };

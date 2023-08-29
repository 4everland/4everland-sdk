import { AxiosInstance, AxiosRequestConfig } from 'axios';
declare class Request {
    instance: AxiosInstance;
    constructor(config: AxiosRequestConfig);
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(config: AxiosRequestConfig): Promise<T>;
    post<T>(config: AxiosRequestConfig): Promise<T>;
    put<T>(config: AxiosRequestConfig): Promise<T>;
    delete<T>(config: AxiosRequestConfig): Promise<T>;
}
export default Request;

declare class AuthApi {
    constructor();
    getSignMessage(address: string): Promise<string>;
    validSign<T>(address: string, signature: string): Promise<T>;
}
export default AuthApi;

import Request from '../api';
declare class PinningService {
    baseUrl: string;
    request: Request;
    constructor(baseUrl: string);
    pinning(cid: string, name: string, accessToken: string): Promise<void>;
}
export default PinningService;

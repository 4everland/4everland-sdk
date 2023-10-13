import Request from '../api';
import { ListPin, PinParams, AddPinParams, PinInfo } from './type';
interface PinningClientParams {
    baseURL: string;
    accessToken: string;
}
declare class PinningClient {
    baseURL: string;
    accessToken: string;
    request: Request;
    constructor(params: PinningClientParams);
    addPin(addPin: AddPinParams): Promise<PinInfo>;
    getPin(requestid: string): Promise<PinInfo>;
    replacePin(requestid: string, addPin: AddPinParams): Promise<PinInfo>;
    listPin(params?: PinParams): Promise<ListPin>;
}
export default PinningClient;

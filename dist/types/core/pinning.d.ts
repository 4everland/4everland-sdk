import Request from '../api';
import { ListPin, PinParams, AddPinParams, PinInfo } from './type';
declare class PinningService {
    baseUrl: string;
    accessToken: string;
    request: Request;
    constructor(baseUrl: string, accessToken: string);
    addPin(addPin: AddPinParams): Promise<PinInfo>;
    getPin(requestid: string): Promise<PinInfo>;
    listPin(params: PinParams): Promise<ListPin>;
}
export default PinningService;

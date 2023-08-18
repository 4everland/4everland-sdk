export declare class ErrorBase<T extends string> extends Error {
    name: T;
    code: number;
    message: string;
    constructor(name: T, code: number, message: string);
}

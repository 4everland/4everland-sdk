export declare class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    constructor(name: T, message: string);
}

import { Request } from 'express';
interface ReturnType {
    requestFrom: string;
}
export declare class AppController {
    getHello(request: Request): ReturnType;
}
export {};

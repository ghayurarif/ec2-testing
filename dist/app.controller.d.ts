import { AppService } from './app.service';
import { Request } from 'express';
interface ReturnType {
    requestFrom: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(request: Request): ReturnType;
}
export {};

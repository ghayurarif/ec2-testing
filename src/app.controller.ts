import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

interface ReturnType {
  requestFrom: string
}


@Controller()
export class AppController {
  @Get()
  getHello(@Req() request: Request): ReturnType {
    return {
      "requestFrom": request.url
    }
  }
}

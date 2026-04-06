import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { QueriesService } from "./queries.service";

@Controller("queries")
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post("/reach-out")
  reachOutForm(@Body() reqBody: any) {
    return this.queriesService.reachOutDataSave(reqBody);
  }

  @Post("/lets-connect")
  letsConnectForm(@Body() reqBody: any) {
    return this.queriesService.letsConnectDataSave(reqBody);
  }
}

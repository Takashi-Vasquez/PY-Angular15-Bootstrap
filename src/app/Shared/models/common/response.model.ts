import { Constants } from './constants.model';

export class ResponseMessage<T> {
  status: number;
  message: string;
  title: string;
  data: T;
  errors: any;
  validate?: any;
  length?: number;
  name?: string;

  constructor(status?: number, message?: string, title?: string, data?: T, errors?: any, validate?: any, length?: number, name?: string) {
    this.status = status || Constants.STATUS.Success;
    this.message = message || Constants.MESSAGE_STATUS.Success;
    this.title = this.title || null;
    this.data = data || null;
    this.errors = errors || null
    this.validate = validate || null;
    this.length = length || 0;
    this.name = name || null;
  }
}

export class ErrorModel {
  code: string;
  message: string;
  constructor(params?: Partial<ErrorModel>) {
    this.code = params?.code || null;
    this.message = params?.message || null;
  }
}

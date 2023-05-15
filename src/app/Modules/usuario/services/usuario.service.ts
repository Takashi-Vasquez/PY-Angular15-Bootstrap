import { Injectable } from '@angular/core';
import { PATHS } from '../../../Shared/models/common/paths.model';
import { CoreService } from '../../../Shared/services/coreService.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private coreService: CoreService
  ) {
  }

  ListUsers(page: string) {
    return this.coreService.httpService.get(this.coreService.baseUrlReq, `${PATHS.INTRANET.User}?page=${page}`);
  }
}

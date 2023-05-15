import { Location } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './http.service';
import { SweetAlertService } from './sweet-alert.service';

@Injectable()
export class CoreService {

  baseUrl: string = "http://localhost:3500";
  baseUrlReq: string = "https://reqres.in/api";
  // baseUrlSecurity: string = "https://localhost:7290/api";  // Seguridad

  constructor(
    public sweetAlert: SweetAlertService,
    // public dialog: MatDialog,

    public router: Router,
    public httpService: HttpService,
    public injector: Injector,
    private location: Location,

  ) { }

  updateURL(router: Router, activateRoute: ActivatedRoute, queryParams: Params) {
    router.navigate([], { relativeTo: activateRoute, queryParams, queryParamsHandling: 'merge' }).then();
  }

  back() {
    this.location.back();
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreService } from '../Shared/services/coreService.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { UsuarioService } from './usuario/services/usuario.service';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    HomeComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [
    CoreService,
    UsuarioService
  ],
})
export class HomeModule { }

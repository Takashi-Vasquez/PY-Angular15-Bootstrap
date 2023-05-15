import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }


  async obtenerUsuarios() {

    let data = await this.usuarioService.ListUsers('1');
    // console.log("data", data.data);
  }

}

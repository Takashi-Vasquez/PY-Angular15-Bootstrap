import { Component } from '@angular/core';
import { enviroment } from 'src/environments/enviroment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PY-Angular15-Bootstrap';

  public prod = enviroment.production;

}

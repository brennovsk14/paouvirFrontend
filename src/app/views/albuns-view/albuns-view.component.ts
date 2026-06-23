import { Component } from '@angular/core';
import {CardComponent} from '../../componentes/card-component/card-component';
import {BotaoComponent} from '../../componentes/botao/botao.component';

@Component({
  selector: 'app-albuns-view',
  imports: [
    CardComponent,
    BotaoComponent
  ],
  templateUrl: './albuns-view.component.html',
  styleUrl: './albuns-view.component.scss'
})
export class AlbunsViewComponent {

}

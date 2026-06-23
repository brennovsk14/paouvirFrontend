import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BotaoComponent} from '../../componentes/botao/botao.component';
import {CardComponent} from '../../componentes/card-component/card-component';

@Component({
  selector: 'app-bandas-view',
  standalone: true,
  imports: [CommonModule, BotaoComponent, CardComponent],
  templateUrl: './bandas-view.component.html',
  styleUrl: './bandas-view.component.scss'
})
export class BandasViewComponent {

}


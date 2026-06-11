import { Component } from '@angular/core';
import {InputComponent} from '../input/input.component';
import {BotaoComponent} from '../botao/botao.component';

@Component({
  selector: 'app-card-login',
  imports: [
    InputComponent,
    BotaoComponent
  ],
  templateUrl: './card-login.component.html',
  styleUrl: './card-login.component.scss'
})
export class CardLoginComponent {

}

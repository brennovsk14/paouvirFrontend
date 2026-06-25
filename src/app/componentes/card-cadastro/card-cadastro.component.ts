import { Component } from '@angular/core';
import {BotaoComponent} from "../botao/botao.component";
import {InputComponent} from "../input/input.component";

@Component({
  selector: 'app-card-cadastro',
    imports: [
        BotaoComponent,
        InputComponent
    ],
  templateUrl: './card-cadastro.component.html',
  styleUrl: './card-cadastro.component.scss'
})
export class CardCadastroComponent {

}

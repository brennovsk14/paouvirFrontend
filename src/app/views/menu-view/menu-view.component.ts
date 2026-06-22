import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from '../../componentes/sidebar/sidebar.component';
import {BotaoComponent} from '../../componentes/botao/botao.component';
import {CardComponent} from '../../componentes/card-component/card-component';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BotaoComponent],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss'
})
export class MenuViewComponent {

}


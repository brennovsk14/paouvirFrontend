import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from '../../componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss'
})
export class MenuViewComponent {

}


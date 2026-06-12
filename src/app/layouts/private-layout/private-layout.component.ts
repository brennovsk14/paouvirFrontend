import { Component } from '@angular/core';
import {SidebarComponent} from '../../componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-private-layout',
  imports: [
    SidebarComponent
  ],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})
export class PrivateLayoutComponent {

}

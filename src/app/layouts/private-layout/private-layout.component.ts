import {Component} from '@angular/core';
import {SidebarComponent} from '../../componentes/sidebar/sidebar.component';
import {SidebarItem} from '../../componentes/sidebar-item/sidebar-item.component';
import {NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-private-layout',
  imports: [
    SidebarComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})
export class PrivateLayoutComponent {

  items: SidebarItem[] = [
    {label: 'Menu', icon: 'home'},
    {label: 'Bandas', icon: 'people'},
    {label: 'Álbuns', icon: 'album'},
    {label: 'Músicas', icon: 'music_note'},
  ];

  sidebarRecolhida: boolean = false;
  sidebarAberta: boolean = false;
  title?: string = "Paouvir";

  constructor(
    // private router: RouterOutlet,
  ) {}

}

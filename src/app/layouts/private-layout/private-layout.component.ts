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
    {label: 'Menu', icon: 'fa fa-home', routerLink: '/menu'},
    {label: 'Bandas', icon: 'fa fa-people-group'},
    {label: 'Álbuns', icon: 'fa fa-compact-disc'},
    {label: 'Músicas', icon: 'fa fa-headphones'},
  ];

  sidebarRecolhida: boolean = false;
  sidebarAberta: boolean = false;
  title?: string = "Paouvir";

  constructor(
    private router: RouterOutlet,
  ) {}

}

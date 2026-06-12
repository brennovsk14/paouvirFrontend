import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface para definir a estrutura de itens do menu da sidebar.
 */
export interface SidebarItem {
  /** Texto de exibição do item */
  label: string;
  /** Ícone (classe CSS, ex: 'fa fa-home') */
  icon?: string;
  /** Identificador único ou rota */
  id?: string;
  /** Indica se o item está ativo */
  active?: boolean;
  /** Indica se o item está desabilitado */
  disabled?: boolean;
  /** Subitens para criar uma árvore expansível */
  children?: SidebarItem[];
  /** Estado interno de expansão (para itens com filhos) */
  expanded?: boolean;
  routerLink?: string;
}

/**
 * Componente individual de item da sidebar.
 * Suporta ícones, estados ativos, hover e submenus (árvores expansíveis).
 */
@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  /** Objeto de configuração do item */
  @Input({ required: true }) item!: SidebarItem;

  /** Se a sidebar pai está em modo recolhido */
  @Input() collapsed: boolean = false;

  /** Evento disparado ao clicar no item */
  @Output() itemClick = new EventEmitter<SidebarItem>();

  /**
   * Manipula o clique no item.
   * Se tiver filhos, alterna a expansão. Caso contrário, emite o evento de clique.
   */
  onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (this.item.disabled) return;

    if (this.item.children && this.item.children.length > 0) {
      this.item.expanded = !this.item.expanded;
    } else {
      this.itemClick.emit(this.item);
    }
  }

  /**
   * Manipula o clique em um subitem da árvore de navegação.
   * Propaga o evento de clique para o componente pai.
   * @param subItem O item filho que foi clicado.
   */
  onSubItemClick(subItem: SidebarItem): void {
    this.itemClick.emit(subItem);
  }
}

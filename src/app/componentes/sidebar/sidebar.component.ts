import { Component, Input, Output, EventEmitter, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarItem, SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

/**
 * Componente de Sidebar Profissional.
 * Suporta expansão/recolhimento, responsividade (overlay em mobile),
 * scroll interno e itens personalizados (SidebarItem).
 *
 * @example
 * * * * <app-sidebar
 * [items]="menuItems"
 * [(collapsed)]="isCollapsed"
 * [(visible)]="isVisible"
 * (itemClick)="onMenuSelect($event)">
 *
 * * * <div logo class="d-flex align-items-center gap-2 p-3">
 * <img src="assets/logo-icon.svg" alt="Logo" width="32" height="32" />
 * <span class="fs-5 fw-bold text-white">Meu Sistema</span>
 * </div>
 *
 * * * <div footer class="p-3 border-top border-secondary">
 * <div class="d-flex align-items-center gap-2">
 * <div class="avatar bg-primary rounded-circle text-center" style="width: 32px; height: 32px; line-height: 32px;">
 * <i class="fa fa-user text-white"></i>
 * </div>
 * <div class="user-info" *ngIf="!isCollapsed">
 * <small class="d-block text-white fw-bold">Admin</small>
 * <small class="d-block text-muted" style="font-size: 0.75rem;">admin@sistema.com</small>
 * </div>
 * </div>
 * </div>
 * </app-sidebar>
 *
 * * * * // ... imports omitidos ...
 * export class AppComponent {
 * isCollapsed = false;
 * isVisible = true; // Em mobile, gerencie isso via botão da Navbar
 *
 * // Estrutura de exemplo para o @Input() items
 * menuItems: SidebarItem[] = [
 * { label: 'Dashboard', icon: 'fa-home', route: '/dashboard', active: true },
 * { label: 'Usuários', icon: 'fa-users', route: '/usuarios' },
 * {
 * label: 'Configurações',
 * icon: 'fa-cog',
 * children: [
 * { label: 'Perfil', route: '/config/perfil' },
 * { label: 'Segurança', route: '/config/seguranca' }
 * ]
 * }
 * ];
 *
 * onMenuSelect(item: SidebarItem) {
 * console.log('Navegando para:', item.route);
 * }
 * }
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  /** Lista de itens do menu */
  @Input() items: SidebarItem[] = [];

  /** Indica se a sidebar está recolhida (modo mini) */
  @Input() collapsed: boolean = false;

  /** Indica se a sidebar está visível (usado principalmente em mobile) */
  @Input() visible: boolean = true;

  /** Evento disparado ao clicar em um item */
  @Output() itemClick = new EventEmitter<SidebarItem>();

  /** Evento disparado quando o estado de colapso muda */
  @Output() collapsedChange = new EventEmitter<boolean>();

  /** Evento disparado quando a visibilidade muda (mobile overlay) */
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Largura da tela para controle de responsividade */
  private screenWidth: number = 1200; // Default para SSR

  /**
   * Construtor do componente.
   * Inicializa a detecção de largura de tela para garantir responsividade no lado do cliente.
   * @param platformId Identificador da plataforma (SSR ou Navegador).
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      this.checkScreenSize();
    }
  }

  /**
   * Manipula o evento de redimensionamento da janela.
   * Atualiza o estado da sidebar para garantir que ela se comporte corretamente em diferentes resoluções.
   * @param event O evento de resize.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = event.target.innerWidth;
      this.checkScreenSize();
    }
  }

  /**
   * Alterna entre expandido e recolhido.
   */
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  /**
   * Fecha a sidebar (especialmente para modo mobile overlay).
   */
  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  /**
   * Abre a sidebar.
   */
  open(): void {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  /**
   * Manipula o clique em um item do menu.
   */
  onItemClick(item: SidebarItem): void {
    // Desativar outros itens se for uma navegação simples
    this.deactivateAll(this.items);
    item.active = true;

    this.itemClick.emit(item);

    // No mobile, fecha a sidebar ao clicar em um item de navegação final
    if (this.isMobile() && (!item.children || item.children.length === 0)) {
      this.close();
    }
  }

  /**
   * Verifica se o dispositivo é mobile baseado na largura da tela.
   */
  isMobile(): boolean {
    return this.screenWidth <= 768;
  }

  /**
   * Reseta o estado ativo de todos os itens (recursivo).
   */
  private deactivateAll(items: SidebarItem[]): void {
    items.forEach(item => {
      item.active = false;
      if (item.children) {
        this.deactivateAll(item.children);
      }
    });
  }

  /**
   * Verifica o tamanho da tela e ajusta o estado padrão da sidebar.
   * Em dispositivos móveis, a sidebar começa recolhida ou escondida.
   * @private
   */
  private checkScreenSize(): void {
    if (this.isMobile()) {
      this.collapsed = false;
      // Em mobile, ela começa escondida se não for explicitamente definida
      // (ajustável conforme necessidade)
    }
  }
}

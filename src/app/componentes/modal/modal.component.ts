import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ViewContainerRef, Type, ComponentRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Master de Modal que serve como container para outros componentes.
 * Gerencia o overlay, animações e estrutura básica (Header, Body, Footer).
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  /**
   * Título exibido no cabeçalho da modal.
   * Se não for fornecido, o cabeçalho não será renderizado.
   */
  @Input() title: string = '';

  /**
   * Define a largura da modal.
   * 'sm' (400px), 'md' (600px), 'lg' (900px), 'full' (tela cheia).
   * @default 'md'
   */
  @Input() size: 'sm' | 'md' | 'lg' | 'full' = 'md';

  /**
   * Define se a modal deve ser fechada ao clicar no backdrop (fundo escuro).
   * @default true
   */
  @Input() closeOnClickOutside: boolean = true;

  /**
   * Evento disparado quando a modal solicita o fechamento.
   * Emite qualquer dado passado para o método close().
   */
  @Output() closed = new EventEmitter<any>();

  /**
   * Container onde o componente dinâmico será injetado.
   * @internal
   */
  @ViewChild('modalContent', { read: ViewContainerRef, static: true })
  contentContainer!: ViewContainerRef;

  /**
   * Controla a visibilidade para disparar as animações de CSS.
   * @internal
   */
  isVisible: boolean = false;

  ngOnInit() {
    // Pequeno delay para garantir que o elemento foi renderizado antes de disparar a animação
    setTimeout(() => this.isVisible = true, 10);
  }

  /**
   * Inicia o processo de fechamento da modal.
   * Dispara a animação de saída antes de emitir o evento de fechamento real.
   * @param result Dado opcional para retornar a quem abriu a modal.
   *
   * @example
   * this.close({ success: true });
   */
  close(result?: any) {
    this.isVisible = false;
    // Aguarda o término da animação de saída (200ms) definida no SCSS
    setTimeout(() => {
      this.closed.emit(result);
    }, 200);
  }

  /**
   * Trata o clique no fundo escuro.
   * @internal
   */
  onBackdropClick() {
    if (this.closeOnClickOutside) {
      this.close();
    }
  }

  /**
   * Método de infraestrutura para injetar dinamicamente um componente.
   * Utilizado pelo ModalService.
   * @param component Classe do componente Angular a ser injetado.
   * @returns ComponentRef do componente injetado para manipulação posterior.
   * @internal
   */
  loadComponent<T>(component: Type<T>): ComponentRef<T> {
    this.contentContainer.clear();
    return this.contentContainer.createComponent(component);
  }
}

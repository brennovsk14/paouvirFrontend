import { Injectable, Type, ComponentRef, ApplicationRef, EnvironmentInjector, createComponent, createEnvironmentInjector, Injector } from '@angular/core';
import { ModalComponent } from '../componentes/modal/modal.component';

/**
 * Interface que define a configuração de uma modal.
 */
export interface ModalConfig {
  /** Título da modal */
  title?: string;
  /** Tamanho da modal: 'sm' | 'md' | 'lg' | 'full' */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Dados para passar para o componente dentro da modal */
  data?: any;
  /** Se deve fechar ao clicar no fundo escuro */
  closeOnClickOutside?: boolean;
}

/**
 * Referência para uma modal aberta, permitindo controle sobre ela.
 */
export class ModalRef {
  private _afterClosed: (result?: any) => void = () => {};

  constructor(public close: (result?: any) => void) {}

  /** Define um callback para ser executado quando a modal fechar */
  afterClosed(callback: (result?: any) => void) {
    this._afterClosed = callback;
  }

  /** @internal Chame o callback de fechamento */
  emitClose(result?: any) {
    this._afterClosed(result);
  }
}

/**
 * Serviço profissional de gerenciamento de modais (Overlays).
 * Suporta empilhamento de modais, passagem de dados e controle de ciclo de vida.
 *
 * @example
 * // 1. Abra uma modal com um componente
 * const modalRef = this.modalService.open(MeuComponente, {
 *   title: 'Edição de Perfil',
 *   size: 'md',
 *   data: { userId: 123 }
 * });
 *
 * // 2. Escute o fechamento
 * modalRef.afterClosed((result) => {
 *   console.log('Modal fechou com:', result);
 * });
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /** Pilha de modais abertas para suportar modais aninhadas */
  private modalStack: { containerRef: ComponentRef<ModalComponent>, modalRef: ModalRef }[] = [];

  /**
   * Construtor do serviço.
   * @param appRef Referência à aplicação para anexar views de componentes dinâmicos.
   * @param injector Injetor de ambiente para criação de componentes.
   */
  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Abre uma nova modal dinamicamente.
   *
   * @param component O componente Angular (Classe) a ser instanciado dentro da modal.
   * @param config Objeto de configuração para personalizar a modal (título, tamanho, dados).
   * @returns Uma instância de ModalRef para gerenciar a modal aberta.
   */
  open<T>(component: Type<T>, config: ModalConfig = {}): ModalRef {
    // 1. Cria a referência de controle que será retornada
    const modalRef = new ModalRef((result?: any) => this.close(result));

    // 2. Cria o Container Master (ModalComponent)
    // Usamos createComponent para anexar o componente programaticamente ao ApplicationRef
    const containerRef = createComponent(ModalComponent, {
      environmentInjector: this.injector
    });

    // Configura as propriedades do container baseadas na config fornecida
    containerRef.instance.title = config.title || '';
    containerRef.instance.size = config.size || 'md';
    containerRef.instance.closeOnClickOutside = config.closeOnClickOutside !== false;

    // Escuta o evento 'closed' emitido pelo ModalComponent (geralmente após a animação de saída)
    containerRef.instance.closed.subscribe((result) => {
      this.destroyModal(containerRef, modalRef, result);
    });

    // 3. Injeta o componente de conteúdo solicitado pelo usuário dentro do container
    const contentRef = containerRef.instance.loadComponent(component);

    // Passa os dados iniciais para o componente injetado (via @Input ou propriedades públicas)
    if (config.data) {
      Object.assign(contentRef.instance as any, config.data);
    }

    // 4. Anexa a visualização ao ApplicationRef do Angular para que o ciclo de vida funcione
    this.appRef.attachView(containerRef.hostView);

    // Adiciona o elemento físico ao final do <body>
    document.body.appendChild(containerRef.location.nativeElement);

    // Adiciona à pilha para gerenciamento de empilhamento
    this.modalStack.push({ containerRef, modalRef });

    return modalRef;
  }

  /**
   * Fecha a modal que está no topo da pilha (a última aberta).
   * @param result Dado opcional que será enviado de volta para o chamador da modal.
   */
  close(result?: any) {
    const modalEntry = this.modalStack[this.modalStack.length - 1];
    if (modalEntry) {
      // Chama o método close() do componente para disparar a animação de saída
      modalEntry.containerRef.instance.close(result);
    }
  }

  /**
   * Realiza a limpeza completa da modal do DOM e do Angular.
   * Remove da pilha, emite eventos de fechamento e destrói as referências de componentes.
   * @param containerRef Referência do container master da modal.
   * @param modalRef Referência de controle da modal.
   * @param result Dado opcional de retorno.
   * @internal
   */
  private destroyModal(containerRef: ComponentRef<ModalComponent>, modalRef: ModalRef, result?: any) {
    // Remove da pilha de controle
    this.modalStack = this.modalStack.filter(m => m.modalRef !== modalRef);

    // Notifica o callback de fechamento (afterClosed)
    modalRef.emitClose(result);

    // Desanexa do ApplicationRef e destrói o componente
    this.appRef.detachView(containerRef.hostView);
    containerRef.destroy();
  }

  /**
   * Fecha todas as modais abertas simultaneamente.
   */
  closeAll() {
    // Percorre a pilha fechando uma por uma de trás para frente
    while (this.modalStack.length > 0) {
      this.close();
    }
  }
}

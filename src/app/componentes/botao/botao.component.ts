import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Botão do Design System.
 * Peça fundamental para interação do usuário, com suporte a múltiplos tamanhos,
 * variantes de cores, estados e ícones.
 *
 * @description
 * O botão segue as diretrizes visuais do Figma, utilizando tokens de cores e espaçamento.
 * Pode ser usado tanto com a propriedade `label` quanto projetando conteúdo (ng-content).
 *
 * @usageNotes
 *
 * ### Cenário 1: Ação Principal de Salvar
 * ```html
 * <app-button variant="primary" prefixIcon="fa fa-save" (click)="salvar()">
 *   Salvar Alterações
 * </app-button>
 * ```
 *
 * ### Cenário 2: Botão de Cancelamento (Contorno)
 * ```html
 * <app-button variant="secondary" (click)="cancelar()">
 *   Cancelar
 * </app-button>
 * ```
 *
 * ### Cenário 3: Ação Destrutiva (Excluir)
 * ```html
 * <app-button variant="danger" prefixIcon="fa fa-trash">
 *   Excluir Registro
 * </app-button>
 * ```
 *
 * ### Cenário 4: Botão Circular apenas com Ícone
 * ```html
 * <app-button prefixIcon="fa fa-plus" [onlyIcon]="true" size="lg"></app-button>
 * ```
 *
 * @example
 * <app-button label="Clique aqui"></app-button>
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /** Texto do botão (opcional, pode ser passado via ng-content também) */
  @Input() label: string = '';

  /** Variantes de estilo: 'primary' (azul), 'secondary' (cinza/contorno) ou 'danger' (vermelho) */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  /** Tamanhos: 'sm' (pequeno), 'md' (médio), 'lg' (grande) */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  /** Define se o botão está desabilitado */
  @Input() disabled: boolean = false;

  /** Classe CSS do ícone a ser exibido ANTES do texto */
  @Input() prefixIcon: string = '';

  /** Classe CSS do ícone a ser exibido DEPOIS do texto */
  @Input() suffixIcon: string = '';

  /** Define se o botão contém apenas um ícone (ajusta o padding para ser circular/quadrado) */
  @Input() onlyIcon: boolean = false;
}

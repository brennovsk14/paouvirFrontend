import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Card para agrupar conteúdo relacionado.
 *
 * @example
 * <app-card title="Título do Card" subtitle="Subtítulo informativo">
 *   Conteúdo principal do card aqui.
 *   <div footer>Ações do rodapé</div>
 * </app-card>
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-component.html',
  styleUrls: ['./card-component.scss']
})
export class CardComponent {
  /** Título do card */
  @Input() title?: string;

  /** Subtítulo do card */
  @Input() subtitle?: string;

  /** URL da imagem de topo */
  @Input() image?: string;

  /** Texto alternativo da imagem */
  @Input() alt?: string = 'Imagem do card';

  /** Define se o card deve ter efeito de hover */
  @Input() hoverable: boolean = false;

  /** Define se o card tem bordas arredondadas (padrão: true) */
  @Input() rounded: boolean = true;

  /**
   * Retorna as classes CSS dinâmicas do card.
   */
  get cardClasses(): any {
    return {
      'ds-card--hoverable': this.hoverable,
      'ds-card--rounded': this.rounded
    };
  }
}

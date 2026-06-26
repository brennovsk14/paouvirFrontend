import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common'; // Importado NgTemplateOutlet explicitamente

@Component({
  selector: 'app-carrossel',
  standalone: true,
  // Certificamos que o NgTemplateOutlet está declarado nos imports do componente standalone
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    <div
      class="carrossel-container"
      #carrosselRef
      (mousedown)="onMouseDown($event)"
      (mouseleave)="onMouseLeave()"
      (mouseup)="onMouseUp()"
      (mousemove)="onMouseMove($event)">

      @for (item of listaItens; track $index) {
        <div>
          <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
        </div>
      }

    </div>
  `,
  styles: [`
    .carrossel-container {
      display: flex;
      flex-direction: row;
      gap: 24px;
      overflow-x: auto;
      scroll-behavior: smooth;
      width: 100%;
      max-width: 100%;
      margin: 1rem 0 1rem 0;
      cursor: grab;
      user-select: none;

      &:active {
        cursor: grabbing;
      }

      &::-webkit-scrollbar { display: none; }
      scrollbar-width: none;
    }
  `]
})
export class CarrosselComponent implements AfterViewInit, OnDestroy {
  @Input() listaItens: any[] = [];
  @Input() itemTemplate!: TemplateRef<any>;

  @Input() maxVisibleItems: number = 7;
  @Input() delay: number = 3000;

  @ViewChild('carrosselRef') carrosselRef!: ElementRef;

  private timer: any;
  private isDown = false;
  private startX = 0;
  private scrollLeftStart = 0;

  ngAfterViewInit(): void {
    this.iniciarAutoScroll();
  }

  ngOnDestroy(): void {
    this.pararAutoScroll();
  }

  private obterLarguraDoCardComGap(): number {
    const elemento = this.carrosselRef.nativeElement;
    const primeiroCard = elemento.firstElementChild as HTMLElement;

    if (primeiroCard) {
      const larguraCard = primeiroCard.getBoundingClientRect().width;
      const estiloComputado = window.getComputedStyle(elemento);
      const gapValue = parseFloat(estiloComputado.gap) || 0;
      return larguraCard + gapValue;
    }
    return 324;
  }

  private iniciarAutoScroll() {
    if (this.listaItens && this.listaItens.length > this.maxVisibleItems) {
      this.timer = setInterval(() => this.scroll(), this.delay);
    }
  }

  private pararAutoScroll() {
    if (this.timer) clearInterval(this.timer);
  }

  private scroll() {
    const elemento = this.carrosselRef.nativeElement;
    const passoScroll = this.obterLarguraDoCardComGap();

    elemento.scrollBy({ left: passoScroll, behavior: 'smooth' });

    setTimeout(() => {
      if (!elemento) return;
      elemento.style.scrollBehavior = 'auto';
      this.rotacionarListaInterna();
      elemento.scrollLeft -= passoScroll;
      elemento.style.scrollBehavior = 'smooth';
    }, 500);
  }

  private rotacionarListaInterna() {
    if (this.listaItens && this.listaItens.length > 0) {
      const primeiroItem = this.listaItens.shift();
      this.listaItens.push(primeiroItem);
    }
  }

  // --- LÓGICA PARA ARRASTAR COM O MOUSE (DRAG TO SCROLL) ---

  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    this.pararAutoScroll();
    const elemento = this.carrosselRef.nativeElement;
    elemento.style.scrollBehavior = 'auto';
    this.startX = e.pageX - elemento.offsetLeft;
    this.scrollLeftStart = elemento.scrollLeft;
  }

  onMouseLeave() {
    if (!this.isDown) return;
    this.resetDrag();
  }

  onMouseUp() {
    if (!this.isDown) return;
    this.isDown = false;

    const elemento = this.carrosselRef.nativeElement;
    const passoScroll = this.obterLarguraDoCardComGap();
    const cardProximo = Math.round(elemento.scrollLeft / passoScroll);

    elemento.style.scrollBehavior = 'smooth';
    elemento.scrollTo({ left: cardProximo * passoScroll });

    this.iniciarAutoScroll();
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    const elemento = this.carrosselRef.nativeElement;
    const x = e.pageX - elemento.offsetLeft;
    const walk = (x - this.startX) * 1.3;
    elemento.scrollLeft = this.scrollLeftStart - walk;
  }

  private resetDrag() {
    this.isDown = false;
    this.iniciarAutoScroll();
  }
}

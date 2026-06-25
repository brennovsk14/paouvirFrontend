import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCadastroComponent } from './card-cadastro.component';

describe('CardCadastroComponent', () => {
  let component: CardCadastroComponent;
  let fixture: ComponentFixture<CardCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBandaComponent } from './cadastro-banda.component';

describe('CadastroBandaComponent', () => {
  let component: CadastroBandaComponent;
  let fixture: ComponentFixture<CadastroBandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroBandaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroBandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

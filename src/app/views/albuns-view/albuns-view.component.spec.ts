import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbunsViewComponent } from './albuns-view.component';

describe('AlbunsViewComponent', () => {
  let component: AlbunsViewComponent;
  let fixture: ComponentFixture<AlbunsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbunsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbunsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

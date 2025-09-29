import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Servico } from './servico';

describe('Servico', () => {
  let component: Servico;
  let fixture: ComponentFixture<Servico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Servico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Servico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

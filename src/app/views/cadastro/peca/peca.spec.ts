import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Peca } from './peca';

describe('Peca', () => {
  let component: Peca;
  let fixture: ComponentFixture<Peca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Peca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Peca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

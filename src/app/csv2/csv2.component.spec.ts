import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Csv2Component } from './csv2.component';

describe('Csv2Component', () => {
  let component: Csv2Component;
  let fixture: ComponentFixture<Csv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Csv2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Csv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

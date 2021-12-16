import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauProduitsComponent } from './nouveau-produits.component';

describe('NouveauProduitsComponent', () => {
  let component: NouveauProduitsComponent;
  let fixture: ComponentFixture<NouveauProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPinComponent } from './btn-pin.component';

describe('BtnPinComponent', () => {
  let component: BtnPinComponent;
  let fixture: ComponentFixture<BtnPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

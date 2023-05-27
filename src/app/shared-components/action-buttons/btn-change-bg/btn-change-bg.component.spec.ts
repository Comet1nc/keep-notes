import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnChangeBgComponent } from './btn-change-bg.component';

describe('BtnChangeBgComponent', () => {
  let component: BtnChangeBgComponent;
  let fixture: ComponentFixture<BtnChangeBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnChangeBgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnChangeBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

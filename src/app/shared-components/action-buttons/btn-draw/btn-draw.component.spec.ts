import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDrawComponent } from './btn-draw.component';

describe('BtnDrawComponent', () => {
  let component: BtnDrawComponent;
  let fixture: ComponentFixture<BtnDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnDrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

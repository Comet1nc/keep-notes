import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUnarchiveComponent } from './btn-unarchive.component';

describe('BtnUnarchiveComponent', () => {
  let component: BtnUnarchiveComponent;
  let fixture: ComponentFixture<BtnUnarchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnUnarchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnUnarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

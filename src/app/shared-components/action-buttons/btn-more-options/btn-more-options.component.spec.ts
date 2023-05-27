import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMoreOptionsComponent } from './btn-more-options.component';

describe('BtnMoreOptionsComponent', () => {
  let component: BtnMoreOptionsComponent;
  let fixture: ComponentFixture<BtnMoreOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnMoreOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnMoreOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

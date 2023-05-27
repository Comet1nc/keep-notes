import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddImageComponent } from './btn-add-image.component';

describe('BtnAddImageComponent', () => {
  let component: BtnAddImageComponent;
  let fixture: ComponentFixture<BtnAddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnAddImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDeleteForeverComponent } from './btn-delete-forever.component';

describe('BtnDeleteForeverComponent', () => {
  let component: BtnDeleteForeverComponent;
  let fixture: ComponentFixture<BtnDeleteForeverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnDeleteForeverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnDeleteForeverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRestoreComponent } from './btn-restore.component';

describe('BtnRestoreComponent', () => {
  let component: BtnRestoreComponent;
  let fixture: ComponentFixture<BtnRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnRestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

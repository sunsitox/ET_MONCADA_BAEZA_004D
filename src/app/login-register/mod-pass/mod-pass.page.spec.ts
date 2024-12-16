import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModPassPage } from './mod-pass.page';

describe('ModPassPage', () => {
  let component: ModPassPage;
  let fixture: ComponentFixture<ModPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

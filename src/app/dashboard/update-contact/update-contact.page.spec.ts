import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateContactPage } from './update-contact.page';

describe('UpdateContactPage', () => {
  let component: UpdateContactPage;
  let fixture: ComponentFixture<UpdateContactPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

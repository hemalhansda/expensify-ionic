import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModalPage } from './post-modal.page';

describe('PostModalPage', () => {
  let component: PostModalPage;
  let fixture: ComponentFixture<PostModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

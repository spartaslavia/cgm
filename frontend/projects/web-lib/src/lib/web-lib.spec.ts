import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLib } from './web-lib';

describe('WebLib', () => {
  let component: WebLib;
  let fixture: ComponentFixture<WebLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

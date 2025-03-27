import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIconicComponent } from './ngx-iconic.component';

describe('NgxIconicComponent', () => {
  let component: NgxIconicComponent;
  let fixture: ComponentFixture<NgxIconicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxIconicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxIconicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

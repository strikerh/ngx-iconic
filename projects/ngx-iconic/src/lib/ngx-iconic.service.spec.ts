import { TestBed } from '@angular/core/testing';

import { NgxIconicService } from './ngx-iconic.service';

describe('NgxIconicService', () => {
  let service: NgxIconicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIconicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

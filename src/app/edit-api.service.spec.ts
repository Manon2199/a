import { TestBed } from '@angular/core/testing';

import { EditAPIService } from './edit-api.service';

describe('EditAPIService', () => {
  let service: EditAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

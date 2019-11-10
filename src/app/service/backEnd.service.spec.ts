import { TestBed } from '@angular/core/testing';

import { GlobalBackEndService } from './backEnd.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalBackEndService = TestBed.get(GlobalBackEndService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Aws.CognitoService } from './aws.cognito.service';

describe('Aws.CognitoService', () => {
  let service: Aws.CognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aws.CognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

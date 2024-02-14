import { TestBed } from '@angular/core/testing';

import { PopupStoreService } from './popup-store.service';

describe('PopupStoreService', () => {
  let service: PopupStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

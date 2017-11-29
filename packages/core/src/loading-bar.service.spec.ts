import { TestBed, inject, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { LoadingBarService } from './loading-bar.service';

describe('LoadingBarService', () => {
  let loader: LoadingBarService;
  let progessValue: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingBarService]
    });
  });

  beforeEach(inject([LoadingBarService], (loaderService: LoadingBarService) => {
    loader = loaderService;
    loaderService.progress$.subscribe(v => progessValue = v);
  }));

  it('should ignore complete if not started', fakeAsync(() => {
    loader.complete();
    expect(progessValue).toBeUndefined();
  }));

  it('should complete after all pending requests is completed', fakeAsync(() => {
    loader.start();
    loader.start();

    loader.complete();
    tick();
    expect(progessValue).toBe(2);

    loader.complete();
    tick();
    expect(progessValue).toBe(100);

    tick(500);
  }));

  it('should take account of start during complete', fakeAsync(() => {
    loader.start();
    loader.complete();
    loader.start();

    tick(500);
    expect(progessValue).toBe(2);


    loader.complete();
    tick(500);
  }));

  it('should auto increment value after calling `start`', fakeAsync(() => {
    loader.start();
    tick();
    expect(progessValue).toBe(2);

    tick(251);
    expect(progessValue > 2 && progessValue < 10).toBeTruthy();

    loader.complete();
    tick();
    expect(progessValue).toBe(100);

    tick(500);
    expect(progessValue).toBe(0);
  }));
});

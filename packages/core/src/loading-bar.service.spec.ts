import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { LoadingBarService } from './loading-bar.service';
import { Subscription } from 'rxjs';
import { ɵPLATFORM_SERVER_ID } from '@angular/common';

describe('LoadingBarService', () => {
  let loader: LoadingBarService;
  let progessValue: number;
  let progressSubscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingBarService]
    });
  });

  beforeEach(inject([LoadingBarService], (loaderService: LoadingBarService) => {
    loader = loaderService;
    progressSubscription = loaderService.progress$.subscribe(v => progessValue = v);
  }));

  afterEach(() => {
    progressSubscription.unsubscribe();
  });

  it('should ignore complete if not started', fakeAsync(() => {
    loader.complete();
    expect(progessValue).toEqual(0);
  }));

  it('should not start if in server platform', fakeAsync(() => {
    loader = new LoadingBarService(ɵPLATFORM_SERVER_ID);
    loader.start();
    tick();
    expect(progessValue).toEqual(0);

    loader.set(10);
    tick();
    expect(progessValue).toEqual(0);
  }));

  it('should prevent start when the timer is not triggered yet', fakeAsync(() => {
    loader = new LoadingBarService(ɵPLATFORM_SERVER_ID);
    loader.start();
    loader.complete();
    expect(progessValue).toEqual(0);


    loader.start();
    loader.stop();
    expect(progessValue).toEqual(0);

    tick();
    expect(progessValue).toEqual(0);
  }));

  it('should allow setting an initial starter value', fakeAsync(() => {
    loader.start(50);
    tick();
    expect(progessValue).toEqual(50);
    loader.complete();

    tick(500);
  }));

  it('should allow set custom progress value after start', fakeAsync(() => {
    loader.start();
    loader.set(60);
    tick();
    expect(progessValue).toEqual(60);
    loader.complete();

    tick(500);
  }));

  it('should take account of the set value when started', fakeAsync(() => {
    loader.set(50);
    loader.start();
    tick();
    expect(progessValue).toEqual(50);
    loader.complete();

    tick(500);
  }));

  it('should not auto increment if not started', fakeAsync(() => {
    loader.set(50);
    loader.increment(10);
    tick();
    expect(progessValue).toEqual(60);
    tick(250);
    expect(progessValue).toEqual(60);

    tick(500);
  }));

  it('should auto increment the progress value when started', fakeAsync(() => {
    loader.set(50);
    loader.start();
    loader.increment(10);
    tick();
    expect(progessValue).toEqual(60);
    tick(250);
    expect(progessValue).toBeGreaterThan(60);
    loader.complete();

    tick(500);
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

  it('should stop all pending requests', fakeAsync(() => {
    loader.start();
    loader.start();
    tick();

    loader.stop();
    tick();
    expect(progessValue).toBe(100);

    tick(500);
  }));

  it('should take account of start during complete', fakeAsync(() => {
    loader.start();
    loader.complete();
    loader.start();

    tick(500);
    expect(progessValue).toBeGreaterThan(2);


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

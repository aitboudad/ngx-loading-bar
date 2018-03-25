import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { LoadingBarComponent } from './loading-bar.component';
import { LoadingBarService } from './loading-bar.service';

describe('LoadingBarComponent', () => {
  let component: LoadingBarComponent,
    fixture: ComponentFixture<LoadingBarComponent>,
    loader: MockLoadingBarService;
  const getElement: (selector: string) => HTMLDivElement = (selector) => fixture.elementRef.nativeElement.querySelector(selector);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingBarComponent],
      providers: [
        { provide: LoadingBarService, useClass: MockLoadingBarService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([LoadingBarService], (loaderService: MockLoadingBarService) => {
    fixture = TestBed.createComponent(LoadingBarComponent);
    component = fixture.componentInstance;
    loader = loaderService;
    fixture.detectChanges();
  }));

  it('should be visible when new value is emitted', () => {
    expect(getElement('#loading-bar')).toBeNull();

    loader.progress$.next(1);
    fixture.detectChanges();

    expect(getElement('#loading-bar')).toBeDefined();
    expect(getElement('#loading-bar-spinner')).toBeDefined();
  });

  it('should set the width by the emitted value', () => {
    loader.progress$.next(10);
    fixture.detectChanges();

    expect(getElement('#loading-bar .bar').style.width).toEqual('10%');
  });

  it('should allow to set custom color', () => {
    loader.progress$.next(10);
    component.color = 'red';
    fixture.detectChanges();

    expect(getElement('#loading-bar').style.color).toEqual('red');
    expect(getElement('#loading-bar-spinner').style.color).toEqual('red');
  });

  it('should hide spinner using `includeSpinner` input', () => {
    loader.progress$.next(10);
    component.includeSpinner = false;
    fixture.detectChanges();

    expect(getElement('#loading-bar-spinner')).toBeNull();
  });

  it('sould use value input if set', () => {
    loader.progress$.next(10);
    component.value = 50;
    fixture.detectChanges();

    expect(getElement('#loading-bar .bar').style.width).toEqual('50%');
  });

  it('should hide bar using `includeBar` input', () => {
    loader.progress$.next(10);
    component.includeBar = false;
    fixture.detectChanges();

    expect(getElement('#loading-bar')).toBeNull();
  });
});

export class MockLoadingBarService {
  progress$ = new Subject<number>();
}

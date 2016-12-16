import { Inject, Component, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgLoadingBarHttp } from './loading-bar.http';

@Component({
    selector: 'ng-loading-bar',
    template: `
        <div id="loading-bar-spinner" #loadingBarSpinner><div class="spinner-icon"></div></div>
        <div id="loading-bar" #loadingBarContainer><div class="bar" #loadingBar><div class="peg"></div></div></div>
    `,
})
export class NgLoadingBarComponent implements AfterViewInit {
    @ViewChild('loadingBarSpinner') _spinner: any;
    @ViewChild('loadingBarContainer') _loadingBarContainer: any;
    @ViewChild('loadingBar') _loadingBar: any;

    private _autoIncrement: boolean = true;
    private _includeSpinner: boolean = true;
    private _includeBar: boolean = true;
    private _latencyThreshold: number = 10;
    private _startSize: number = 0.02;

    private _started: boolean = false;
    private _status: number = 0;

    private _incTimeout: any;
    private _completeTimeout: any;

    private _startTimeout: any;

    constructor(private _renderer: Renderer, @Inject(Http) http: NgLoadingBarHttp) {
        if (http instanceof NgLoadingBarHttp) {
            http.pending.subscribe((progress: any) => {
                if (progress.started) this.start();
                if (progress.completed) this.complete();
            });
        }
    }

    ngAfterViewInit() {
        this.hide(this._loadingBarContainer);
        this.hide(this._spinner);
    }

    /**
     * Inserts the loading bar element into the dom, and sets it to 2%
     */
    private start(): void {
        this._startTimeout = setTimeout(() => {

            clearTimeout(this._completeTimeout);

            // do not continually broadcast the started event:
            if (this._started) { return; }

            this._started = true;
            this._status = 0;

            if (this._includeBar) {
                this.show(this._loadingBarContainer);
            }

            if (this._includeSpinner) {
                this.show(this._spinner);
            }

            this.set(this._startSize);
        }, this._latencyThreshold);
    }
    /**
     * Set the loading bar's width to a certain percent.
     *
     * @param n any value between 0 and 1
     */
    private set(n): void {
        if (!this._started) { return; }
        const pct = (n * 100) + '%';
        this.setElementStyle(this._loadingBar, 'width', pct);
        this._status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        if (this._autoIncrement) {
            clearTimeout(this._incTimeout);
            this._incTimeout = setTimeout(() => {
                this.inc();
            }, 250);
        }
    }

    private complete(): void {

        this.set(1);

        clearTimeout(this._completeTimeout);
        clearTimeout(this._startTimeout);

        // Attempt to aggregate any start/complete calls within 500ms:
        this._completeTimeout = setTimeout(() => {
            this._started = false;
            this.hide(this._loadingBarContainer);
            this.hide(this._spinner);
        }, 500);
    }

    /**
     * Increments the loading bar by a random amount
     * but slows down as it progresses
     */
    private inc(): void {
        if (this._status >= 1) {
            return;
        }

        let rnd = 0;
        let stat = this._status;
        if (stat >= 0 && stat < 0.25) {
            // Start out between 3 - 6% increments
            rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
            // increment between 0 - 3%
            rnd = (Math.random() * 3) / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
            // increment between 0 - 2%
            rnd = (Math.random() * 2) / 100;
        } else if (stat >= 0.9 && stat < 0.99) {
            // finally, increment it .5 %
            rnd = 0.005;
        } else {
            // after 99%, don't increment:
            rnd = 0;
        }

        let pct = this._status + rnd;
        this.set(pct);
    }

    private show(el: any): void {
        this.setElementStyle(el, 'display', 'block');
    }
    private hide(el: any): void {
        this.setElementStyle(el, 'display', 'none');
    }
    private setElementStyle(el: any, styleName: string, styleValue: string): void {
        this._renderer.setElementStyle(el.nativeElement, styleName, styleValue);
    }
}

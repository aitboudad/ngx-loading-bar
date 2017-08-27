import { Component, Input } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';

@Component({
    selector: 'ng-loading-bar, ngx-loading-bar',
    template: `
    <ng-container *ngIf="started">
        <div id="loading-bar-spinner" *ngIf="includeSpinner"><div class="spinner-icon"></div></div>
        <div id="loading-bar"><div class="bar" [style.width]="progressWidth"><div class="peg"></div></div></div>
    </ng-container>
    `,
})
export class LoadingBarComponent {
    @Input() includeSpinner = true;

    started = false;
    progressWidth = '0';

    private _latencyThreshold = 10;
    private _startSize = 0.02;
    private _status = 0;

    private _incTimeout: any;
    private _completeTimeout: any;
    private _startTimeout: any;

    constructor(loadingBarService: LoadingBarService) {
        loadingBarService.pending.subscribe((progress) => {
            if (progress.started) this.start();
            if (progress.completed) this.complete();
        });
    }

    /**
     * Inserts the loading bar element into the dom, and sets it to 2%
     */
    private start() {
        this._startTimeout = setTimeout(() => {

            clearTimeout(this._completeTimeout);

            // do not continually broadcast the started event:
            if (this.started) {
                return;
            }

            this.started = true;
            this._status = 0;

            this.set(this._startSize);
        }, this._latencyThreshold);
    }

    /**
     * Set the loading bar's width to a certain percent.
     *
     * @param n any value between 0 and 1
     */
    private set(n) {
        if (!this.started) {
            return;
        }

        const pct = (n * 100) + '%';
        this.progressWidth = pct;
        this._status = n;

        // increment loadingbar to give the illusion that there is always
        // progress but make sure to cancel the previous timeouts so we don't
        // have multiple incs running at the same time.
        clearTimeout(this._incTimeout);
        this._incTimeout = setTimeout(() => this.inc(), 250);
    }

    private complete() {
        setTimeout(() => {
            this.set(1);

            clearTimeout(this._completeTimeout);
            clearTimeout(this._startTimeout);

            // Attempt to aggregate any start/complete calls within 500ms:
            this._completeTimeout = setTimeout(() => this.started = false, 500);
        }, this._latencyThreshold);
    }

    /**
     * Increments the loading bar by a random amount
     * but slows down as it progresses
     */
    private inc() {
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

        this.set(this._status + rnd);
    }
}

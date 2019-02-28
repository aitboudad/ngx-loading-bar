# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="4.2.0"></a>
# [4.2.0](https://github.com/aitboudad/ngx-loading-bar/compare/v4.1.1...v4.2.0) (2019-02-28)


### Features

* 🎸 add RTL support ([#119](https://github.com/aitboudad/ngx-loading-bar/issues/119)) ([a93b7d0](https://github.com/aitboudad/ngx-loading-bar/commit/a93b7d0)), closes [#118](https://github.com/aitboudad/ngx-loading-bar/issues/118)



<a name="4.1.1"></a>
## [4.1.1](https://github.com/aitboudad/ngx-loading-bar/compare/v4.1.0...v4.1.1) (2019-01-18)


### Bug Fixes

* **router:** ensure currentNavigation is defined ([#116](https://github.com/aitboudad/ngx-loading-bar/issues/116)) ([eb72642](https://github.com/aitboudad/ngx-loading-bar/commit/eb72642))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/aitboudad/ngx-loading-bar/compare/v4.0.0...v4.1.0) (2019-01-18)


### Features

* allow ignoring loading-bar for particular router ([#115](https://github.com/aitboudad/ngx-loading-bar/issues/115)) ([c00b16e](https://github.com/aitboudad/ngx-loading-bar/commit/c00b16e))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/aitboudad/ngx-loading-bar/compare/v4.0.0-alpha.0...v4.0.0) (2019-01-01)



<a name="4.0.0-alpha.0"></a>
# [4.0.0-alpha.0](https://github.com/aitboudad/ngx-loading-bar/compare/v3.0.0...v4.0.0-alpha.0) (2019-01-01)


### Features

* move [@ngx-loading-bar](https://github.com/ngx-loading-bar)/core to peerDependencies ([#113](https://github.com/aitboudad/ngx-loading-bar/issues/113)) ([64bb66c](https://github.com/aitboudad/ngx-loading-bar/commit/64bb66c)), closes [#111](https://github.com/aitboudad/ngx-loading-bar/issues/111)
* remove deprecated forRoot ([#112](https://github.com/aitboudad/ngx-loading-bar/issues/112)) ([51e450a](https://github.com/aitboudad/ngx-loading-bar/commit/51e450a))


### BREAKING CHANGES

* `@ngx-loading-bar/core` has been moved to peerDependencies which require to install the dependency by yourself:

Before:
```bash
npm install @ngx-loading-bar/http-client --save
```

After:
```bash
npm install @ngx-loading-bar/core @ngx-loading-bar/http-client --save
```

* the `forRoot` method on `LoadingBarModule` has been removed.



<a name="3.0.0"></a>
# [3.0.0](https://github.com/aitboudad/ngx-loading-bar/compare/v2.2.0...v3.0.0) (2018-11-22)


### Features

* deprecate forRoot calls ([#109](https://github.com/aitboudad/ngx-loading-bar/issues/109)) ([546db1e](https://github.com/aitboudad/ngx-loading-bar/commit/546db1e))
* set peerDependency to angular >=7.0 ([#108](https://github.com/aitboudad/ngx-loading-bar/issues/108)) ([7e72b38](https://github.com/aitboudad/ngx-loading-bar/commit/7e72b38))


### BREAKING CHANGES

* The library now requires Angular 7



<a name="2.2.0"></a>
# [2.2.0](https://github.com/aitboudad/ngx-loading-bar/compare/v2.1.2...v2.2.0) (2018-08-25)


### Features

* **core:** disable loading progress on server side ([#103](https://github.com/aitboudad/ngx-loading-bar/issues/103)) ([3810c06](https://github.com/aitboudad/ngx-loading-bar/commit/3810c06))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/aitboudad/ngx-loading-bar/compare/v2.1.1...v2.1.2) (2018-07-22)


### Bug Fixes

* **core:** add complete call to force stop loading-bar ([b82ffc1](https://github.com/aitboudad/ngx-loading-bar/commit/b82ffc1))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/aitboudad/ngx-loading-bar/compare/v2.1.0...v2.1.1) (2018-07-10)


### Bug Fixes

* **core:** set view encapsulation to emulated ([#94](https://github.com/aitboudad/ngx-loading-bar/issues/94)) ([2f5d29a](https://github.com/aitboudad/ngx-loading-bar/commit/2f5d29a)), closes [#93](https://github.com/aitboudad/ngx-loading-bar/issues/93)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/aitboudad/ngx-loading-bar/compare/v2.0.0...v2.1.0) (2018-06-02)


### Bug Fixes

* **core:** avoid relying on first-child when targting spinner. ([#86](https://github.com/aitboudad/ngx-loading-bar/issues/86)) ([48e4ca9](https://github.com/aitboudad/ngx-loading-bar/commit/48e4ca9)), closes [#85](https://github.com/aitboudad/ngx-loading-bar/issues/85)


### Features

* **core:** add stop method to force close the loader ([#87](https://github.com/aitboudad/ngx-loading-bar/issues/87)) ([3a21b9d](https://github.com/aitboudad/ngx-loading-bar/commit/3a21b9d)), closes [#74](https://github.com/aitboudad/ngx-loading-bar/issues/74)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.6.0...v2.0.0) (2018-05-06)


### Features

* **core:** remove loading-bar.css ([446d76b](https://github.com/aitboudad/ngx-loading-bar/commit/446d76b))
* **core:** Upgrade to Rxjs 6 and drop support of angular v4. ([38eb2c3](https://github.com/aitboudad/ngx-loading-bar/commit/38eb2c3)), closes [#70](https://github.com/aitboudad/ngx-loading-bar/issues/70)


### BREAKING CHANGES

* **core:** The file `loading-bar.css` has been removed and not required anymore.
* **core:** droped Angular 4 support + rxjs version should be updated into

`5.6.0-forward-compat` or `6.0`.



<a name="2.0.0-alpha.1"></a>
# [2.0.0-alpha.1](https://github.com/aitboudad/ngx-loading-bar/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2018-04-05)



<a name="2.0.0-alpha.0"></a>
# [2.0.0-alpha.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.5.0...v2.0.0-alpha.0) (2018-03-25)


### Features

* **core:** remove loading-bar.css ([df82056](https://github.com/aitboudad/ngx-loading-bar/commit/df82056))
* **core:** Upgrade to Rxjs 6 and drop support of angular v4. ([2d5ba05](https://github.com/aitboudad/ngx-loading-bar/commit/2d5ba05)), closes [#70](https://github.com/aitboudad/ngx-loading-bar/issues/70)


### BREAKING CHANGES

* **core:** The file `loading-bar.css` has been removed and not required anymore.
* **core:** droped Angular 4 support + rxjs version should be updated into `6.0`.


<a name="1.6.0"></a>
# [1.6.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.5.1...v1.6.0) (2018-04-05)


### Features

* **core:** add `value` input to manually set value of the progress bar. ([#77](https://github.com/aitboudad/ngx-loading-bar/issues/77)) ([7e32956](https://github.com/aitboudad/ngx-loading-bar/commit/7e32956))



<a name="1.5.1"></a>
## [1.5.1](https://github.com/aitboudad/ngx-loading-bar/compare/v1.5.0...v1.5.1) (2018-04-05)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.4.0...v1.5.0) (2018-03-23)


### Features

* **core:** make set and increment public + allow setting inital value for start. ([#71](https://github.com/aitboudad/ngx-loading-bar/issues/71)) ([08ee17c](https://github.com/aitboudad/ngx-loading-bar/commit/08ee17c)), closes [#68](https://github.com/aitboudad/ngx-loading-bar/issues/68)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.3.1...v1.4.0) (2018-03-21)


### Features

* **code:** allow disabling fixed position (top-screen). ([#69](https://github.com/aitboudad/ngx-loading-bar/issues/69)) ([2f3a5e8](https://github.com/aitboudad/ngx-loading-bar/commit/2f3a5e8))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/aitboudad/ngx-loading-bar/compare/v1.3.0...v1.3.1) (2018-03-07)


### Bug Fixes

* **http-client:** ensure starting when using async interceptor. ([#66](https://github.com/aitboudad/ngx-loading-bar/issues/66)) ([63e2431](https://github.com/aitboudad/ngx-loading-bar/commit/63e2431)), closes [#65](https://github.com/aitboudad/ngx-loading-bar/issues/65)



<a name="1.3.0"></a>
# [1.3.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.2.0...v1.3.0) (2018-02-28)


### Features

* **core:** allow setting height and diameter for loading bar/spinner. ([#63](https://github.com/aitboudad/ngx-loading-bar/issues/63)) ([d1112d5](https://github.com/aitboudad/ngx-loading-bar/commit/d1112d5)), closes [#62](https://github.com/aitboudad/ngx-loading-bar/issues/62)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.1.2...v1.2.0) (2018-02-21)


### Features

* **http:** allow ignore loadingBar through header. ([#60](https://github.com/aitboudad/ngx-loading-bar/issues/60)) ([b655547](https://github.com/aitboudad/ngx-loading-bar/commit/b655547))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/aitboudad/ngx-loading-bar/compare/v1.1.1...v1.1.2) (2018-02-21)


### Bug Fixes

* **http:** ensure start loading-bar on subscribe. ([#59](https://github.com/aitboudad/ngx-loading-bar/issues/59)) ([fb210bc](https://github.com/aitboudad/ngx-loading-bar/commit/fb210bc))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/aitboudad/ngx-loading-bar/compare/v1.1.0...v1.1.1) (2018-02-02)


### Bug Fixes

* disable OnPush change detection. ([#56](https://github.com/aitboudad/ngx-loading-bar/issues/56)) ([c240523](https://github.com/aitboudad/ngx-loading-bar/commit/c240523)), closes [#55](https://github.com/aitboudad/ngx-loading-bar/issues/55)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.1...v1.1.0) (2018-01-12)


### Features

* **http-client:** allow ignore loadingBar through header. ([#50](https://github.com/aitboudad/ngx-loading-bar/issues/50)) ([aef86ae](https://github.com/aitboudad/ngx-loading-bar/commit/aef86ae))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0...v1.0.1) (2017-12-29)


### Bug Fixes

* **http:** fixed Infinite loading when using Observable.zip. ([#44](https://github.com/aitboudad/ngx-loading-bar/issues/44)) ([060150a](https://github.com/aitboudad/ngx-loading-bar/commit/060150a)), closes [#43](https://github.com/aitboudad/ngx-loading-bar/issues/43)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-rc.3...v1.0.0) (2017-12-19)



<a name="1.0.0-rc.3"></a>
# [1.0.0-rc.3](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-rc.2...v1.0.0-rc.3) (2017-12-17)


### Bug Fixes

* **http-client:** ensure request is closed on unsubscribe. ([#41](https://github.com/aitboudad/ngx-loading-bar/issues/41)) ([9171ad8](https://github.com/aitboudad/ngx-loading-bar/commit/9171ad8)), closes [#40](https://github.com/aitboudad/ngx-loading-bar/issues/40)



<a name="1.0.0-rc.2"></a>
# [1.0.0-rc.2](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-rc.1...v1.0.0-rc.2) (2017-12-14)


### Features

* **style:** move css into loading-bar component ([5a1854e](https://github.com/aitboudad/ngx-loading-bar/commit/5a1854e))



<a name="1.0.0-rc.1"></a>
# [1.0.0-rc.1](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-rc.0...v1.0.0-rc.1) (2017-12-08)


### Features

* **core:** allow change bar color ([#38](https://github.com/aitboudad/ngx-loading-bar/issues/38)) ([2461d41](https://github.com/aitboudad/ngx-loading-bar/commit/2461d41)), closes [#37](https://github.com/aitboudad/ngx-loading-bar/issues/37)



<a name="1.0.0-rc.0"></a>
# [1.0.0-rc.0](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-alpha.18...v1.0.0-rc.0) (2017-12-07)


### Features

* **core:** remove deprecated property `LoadingBarService:pending` ([#36](https://github.com/aitboudad/ngx-loading-bar/issues/36)) ([3779ff9](https://github.com/aitboudad/ngx-loading-bar/commit/3779ff9))
* **demo:** deploy in gh-pages. ([#35](https://github.com/aitboudad/ngx-loading-bar/issues/35)) ([671ec93](https://github.com/aitboudad/ngx-loading-bar/commit/671ec93))



<a name="1.0.0-alpha.18"></a>
# [1.0.0-alpha.18](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2017-11-28)


### Bug Fixes

* **http:** ensure request is cancelled on unsuscribe. ([ecea4bf](https://github.com/aitboudad/ngx-loading-bar/commit/ecea4bf)), closes [#33](https://github.com/aitboudad/ngx-loading-bar/issues/33)


### BREAKING CHANGES

* **http:** http service observables doesn't use subscribe anymore to track request which means you must ensure to subscribe in order to load request

##### Before
```ts
  this.http.get('URL');
```
##### After
```ts
  this.http.get('URL').subscribe(v => {})
```



<a name="1.0.0-alpha.17"></a>
# [1.0.0-alpha.17](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2017-11-27)


### Bug Fixes

* **core:** add debounce to avoid ExpressionChangedAfterItHasBeenCheckedError ([a704544](https://github.com/aitboudad/ngx-loading-bar/commit/a704544)), closes [#32](https://github.com/aitboudad/ngx-loading-bar/issues/32)


### Features

* **core:** remove `ng-loading-bar` selector ([3489a4a](https://github.com/aitboudad/ngx-loading-bar/commit/3489a4a))



<a name="1.0.0-alpha.16"></a>
# [1.0.0-alpha.16](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2017-11-27)


### Bug Fixes

* **core:** avoid start during complete timeout ([000a94e](https://github.com/aitboudad/ngx-loading-bar/commit/000a94e))


### Features

* **core:** allow turn the loading bar off. ([2dc123b](https://github.com/aitboudad/ngx-loading-bar/commit/2dc123b))



<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2017-11-25)


### Features

* **core:** emit progress value instead of pending requests ([db382c7](https://github.com/aitboudad/ngx-loading-bar/commit/db382c7))
* **demo:** add material progress-bar example. ([e7ea934](https://github.com/aitboudad/ngx-loading-bar/commit/e7ea934))



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/aitboudad/ngx-loading-bar/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2017-11-01)


### Bug Fixes

* **#19:** complete on HttpEventType.Response. ([dda728f](https://github.com/aitboudad/ngx-loading-bar/commit/dda728f))



<a name="1.0.0-alpha.13"></a>
# 1.0.0-alpha.13 (2017-10-26)


### Bug Fixes

* **#20:** stop loading on HttpResponse. ([60e0f9d](https://github.com/aitboudad/ngx-loading-bar/commit/60e0f9d))
* **#21:** allow import loading-bar components in child modules. ([a6f95f5](https://github.com/aitboudad/ngx-loading-bar/commit/a6f95f5))
* **#22:** ensure using the shared http response. ([77ad23c](https://github.com/aitboudad/ngx-loading-bar/commit/77ad23c))
* **http-client:** add temporary way to ignore loading-bar. ([d53a7b1](https://github.com/aitboudad/ngx-loading-bar/commit/d53a7b1))
* **http-client:** avoid start twice when using retry operator. ([e926dc1](https://github.com/aitboudad/ngx-loading-bar/commit/e926dc1))


### Features

* remove tight coupling with http ([#13](https://github.com/aitboudad/ngx-loading-bar/issues/13)) ([6284a7a](https://github.com/aitboudad/ngx-loading-bar/commit/6284a7a))
* **demo:** use @angular/cli. ([68a7806](https://github.com/aitboudad/ngx-loading-bar/commit/68a7806))
* **loading-bar-service:** deprecated all methods in favor of start/complete. ([bfd1048](https://github.com/aitboudad/ngx-loading-bar/commit/bfd1048))
* **npm:** allow angular v5. ([415a78c](https://github.com/aitboudad/ngx-loading-bar/commit/415a78c))



# [0.0.4] (2016-12-15)

### Bug Fixes

* **core:** added support for AOT

### BREAKING CHANGES

* The `NgLoadingBarModule` module must be imported using the forRoot() method.

    Before:
    ```ts
    @NgModule({
      imports: [
        NgLoadingBarModule,
      ],
    })
    export class AppModule {}
    ```

    After:
    ```ts
    @NgModule({
      imports: [
        NgLoadingBarModule.forRoot(),
      ],
    })
    export class AppModule {}
    ```

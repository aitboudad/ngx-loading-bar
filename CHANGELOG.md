# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

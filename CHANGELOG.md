# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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

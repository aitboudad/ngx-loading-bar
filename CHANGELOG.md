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

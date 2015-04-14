# angular-error-logger
Server side error logger for Angular

# Install

```sh
bower install angular-error-logger --save
```

or just grab dist/angular-error-logger.js

# Usage

```javascript
//include it in your app
angular.module('myapp', ['angularErrorLogger']);

//Set url where to post error
angular.module('myapp')
.constant('ANGULAR_ERROR_LOGGER_CONFIG', {
     url: 'http://localhost:9000/error-logger'
});
```

# Development

## Install

```sh
npm install gulp-cli -g
npm install
```

## Build

```sh
gulp build
```
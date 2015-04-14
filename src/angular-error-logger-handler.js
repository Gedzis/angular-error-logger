angular.module('angularErrorLogger').provider("$exceptionHandler",
    {
        $get: function (angularErrorLoggerService) {
            'use strict';
            return angularErrorLoggerService;
        }
    });
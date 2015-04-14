angular.module('angularErrorLogger').factory(
    "angularErrorLoggerService",
    function ($log, $window, exceptionSender, ANGULAR_ERROR_LOGGER_CONFIG) {
        'use strict';
        function logErrorToServerSide(exception, cause) {
            var errorMessage = exception ? exception.toString() : "no exception",
                stackTrace =
                    exception ? (exception.stack ? exception.stack.toString() : "no stack") : "no exception",
                browserInfo = {
                    navigatorAppName: navigator.appName,
                    navigatorUserAgent: navigator.userAgent
                },
                data = angular.toJson({
                    errorUrl: $window.location.href,
                    errorMessage: errorMessage,
                    stackTrace: stackTrace,
                    cause: (cause || "no cause"),
                    browserInfo: browserInfo
                });
            if (ANGULAR_ERROR_LOGGER_CONFIG && ANGULAR_ERROR_LOGGER_CONFIG.url) {
                exceptionSender.sendException(ANGULAR_ERROR_LOGGER_CONFIG.url, data);
            }
        }

        function log(exception, cause) {
            $log.debug("errorLogService.log()");
            // Default behavior, log to browser console
            $log.error.apply($log, arguments);
            logErrorToServerSide(exception, cause);
        }

        return log;
    }
);

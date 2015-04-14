angular.module('angularErrorLogger').factory(
    "angularErrorLoggerService",
    function ($log, $window, $http) {

        'use strict';

        $log.info("errorLogService()");

        function logErrorToServerSide(exception, cause) {
            $log.info("logErrorToServerSide()");

            // Try to send stacktrace event to server

            // Not sure how portable this actually is
            var serviceUrl = "http://localhost:3000/error",
                errorMessage = exception ? exception.toString() : "no exception",
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
            $log.debug("logging error to server side: serviceUrl = " + serviceUrl);

            $log.debug("logging error to server side...", data);

            $http.post(serviceUrl, data).then(function () {
                $log.info("Error logged");
            }, function (loggingError) {
                $log.warn("Error logging to server side failed");
                $log.log(loggingError);
            });
        }

        function log(exception, cause) {
            $log.debug("errorLogService.log()");

            // Default behavior, log to browser console
            $log.error.apply($log, arguments);

            logErrorToServerSide(exception, cause);
        }

        // And return the logging function
        return log;
    }
);

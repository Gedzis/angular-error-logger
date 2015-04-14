angular.module('angularErrorLogger').factory("exceptionSender",
    function ($injector, $log) {
        'use strict';
        return {
            sendException: function (serviceUrl, data) {
                $log.debug("logging error to server side: serviceUrl = " + serviceUrl);
                $log.debug("logging error to server side...", data);

                var $http = $injector.get("$http");
                $http.post(serviceUrl, data).then(function () {
                    $log.info("Error logged");
                }, function (loggingError) {
                    $log.warn("Error logging to server side failed");
                    $log.log(loggingError);
                });
            }
        };
    });

(function () {
    angular
        .module('PRJ')
        .service('foodTruckSearchService', foodTruckSearchService);

    (function () {
        /*The following snippet of code belongs to a third party.
        Added the snippet of code to eliminate the CORS issue.
        The snippet is open source.*/
        var cors_api_host = 'cors-anywhere.herokuapp.com';
        var cors_api_url = 'https://' + cors_api_host + '/';
        var slice = [].slice;
        var origin = window.location.protocol + '//' + window.location.host;
        var open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var args = slice.call(arguments);
            var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
            if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                targetOrigin[1] !== cors_api_host) {
                args[1] = cors_api_url + args[1];
            }
            return open.apply(this, args);
        };
    })();

    function foodTruckSearchService($http) {
        this.findRegions = findRegions;
        this.findVendors = findVendors;
        this.searchByCity = searchByCity;
        this.searchByVendor = searchByVendor;

        function findVendors(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRegions(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchByVendor(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function searchByCity(url) {
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
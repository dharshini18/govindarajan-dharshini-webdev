(function () {
    angular
        .module('WAM')
        .service('websiteService', websiteService);

    function websiteService($http) {
        this.findAllWebsitesForUser = findAllWebsitesForUser;
        this.findWebsiteById = findWebsiteById;
        this.deleteWebsite = deleteWebsite;
        this.createWebsite = createWebsite;
        this.updateWebsite = updateWebsite;

        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

/*
            var website = findWebsiteById(websiteId);
            var index = websites.indexOf(website);
            websites.splice(index, 1);
*/
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
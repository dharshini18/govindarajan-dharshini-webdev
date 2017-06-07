/**
 * Created by Dharshini on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService',pageService);

    function pageService($http) {
        this.findAllPagesForWebsite = findAllPagesForWebsite;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        function updatePage(pageId, page) {
            var url = "/api/page/"+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(websiteId , page) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();

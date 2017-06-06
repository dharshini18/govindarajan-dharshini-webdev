/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('websiteNewController',websiteNewController);

    function websiteNewController($location, $routeParams,
                                   websiteService) {
    var model = this;
    model.userId = $routeParams['userId'];
    model.createWebsite = createWebsite;

    function init() {
        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(renderWebsites);
    }
    init();

    function renderWebsites(websites) {
        model.websites = websites;
    }

    function createWebsite(website) {
        return websiteService
            .createWebsite(model.userId, website)
            .then(function (website) {
                $location.url('/user/' +model.userId+ '/website');
            },function () {
                model.error = "Website Could not be created";
            })
    }
    }
})();
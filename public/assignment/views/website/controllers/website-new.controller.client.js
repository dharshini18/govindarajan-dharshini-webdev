/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('websiteNewController',websiteNewController);

    function websiteNewController($location, $routeParams,
                                   websiteService, currentUser) {
    var model = this;
    model.userId = currentUser._id;
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
        if (typeof website === 'undefined' || website === "" || website === null){
            model.error = "Website Name is required for creation";
            return;
        }
        return websiteService
            .createWebsite(model.userId, website)
            .then(function (website) {
                $location.url('/website');
            },function () {
                model.error = "Website Could not be created";
            })
    }
    }
})();
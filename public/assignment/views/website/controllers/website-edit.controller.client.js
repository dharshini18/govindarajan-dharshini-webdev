/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('websiteEditController',websiteEditController);

    function websiteEditController($location, $routeParams,
                                   websiteService) {
    var model = this;
    model.userId = $routeParams['userId'];
    model.websiteId = $routeParams['websiteId'];
    model.deleteWebsite = deleteWebsite;
    model.updateWebsite = updateWebsite;

    function init() {
        websiteService
            .findAllWebsitesForUser(model.userId)
            .then(renderWebsites);
        websiteService
            .findWebsiteById(model.websiteId)
            .then(renderWebsiteById);
    }
    init();
    
    function renderWebsiteById(website) {
        model.website = website;
    }

    function renderWebsites(websites) {
        model.websites = websites;
    }

    function updateWebsite(website) {
        return websiteService
            .updateWebsite(website._id, website)
            .then(function () {
                $location.url('/user/' +model.userId+ '/website');
            },function () {
                model.error = "Website Could not be updated";
            });
    }

    function deleteWebsite(websiteId) {
        return websiteService
            .deleteWebsite(websiteId)
            .then(function () {
                $location.url('/user/' +model.userId+ '/website');
            },function () {
                model.error = "Unable to delete website";
            })
        }
    }
})();
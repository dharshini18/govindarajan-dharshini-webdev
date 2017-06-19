/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('websiteEditController',websiteEditController);

    function websiteEditController($location, $routeParams,
                                   websiteService, currentUser) {
    var model = this;
    model.userId = currentUser._id;
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

        if (typeof website.name === 'undefined' || website.name === "" || website.name === null){
            model.error = "Website Name is required for updation";
            return;
        }
        return websiteService
            .updateWebsite(website._id, website)
            .then(function () {
                $location.url('/website');
            },function () {
                model.error = "Website Could not be updated";
            });
    }

    function deleteWebsite(websiteId) {
        return websiteService
            .deleteWebsite(websiteId)
            .then(function () {
                $location.url('/website');
            },function () {
                model.error = "Unable to delete website";
            })
        }
    }
})();
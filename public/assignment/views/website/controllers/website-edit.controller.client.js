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
        model.websites =
            websiteService.findAllWebsitesForUser(model.userId);
        model.website = websiteService.findWebsiteById(model.websiteId);
    }
    init();

    function updateWebsite(websiteId, website) {
        websiteService.updateWebsite(websiteId,website);
        $location.url('/user/' +model.userId+ '/website');
    }

    function deleteWebsite(websiteId) {
        websiteService.deleteWebsite(websiteId);
        $location.url('/user/' +model.userId+ '/website');
    }
    }
})();
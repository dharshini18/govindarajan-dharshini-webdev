/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('pageListController',pageListController);

    function pageListController($routeParams,
                                pageService, currentUser) {
    var model = this;
    model.userId = currentUser._id;
    model.websiteId = $routeParams['websiteId'];

    function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
    }
    init();

    function renderPages(pages) {
        model.pages = pages;
    }
    }
})();
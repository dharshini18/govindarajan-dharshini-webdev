/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('pageNewController',pageNewController);

    function pageNewController($location, $routeParams,
                                   pageService,currentUser) {
    var model = this;
    model.userId = currentUser._id;
    model.websiteId = $routeParams['websiteId'];
    model.createPage = createPage;

    function init() {
        pageService
            .findAllPagesForWebsite(model.websiteId)
            .then(renderPages);
    }
    init();

    function renderPages(pages) {
        model.pages = pages;
    }

    function createPage(page) {
        if (typeof page === 'undefined' || page === "" || page === null){
            model.error = "Page Name is required for creation";
            return;
        }
        return pageService
            .createPage(model.websiteId,page)
            .then(function () {
                $location.url('/website/' +model.websiteId+ '/page');
            },function () {
                model.error = "Sorry, New page could not be created";
            });
        }
    }
})();
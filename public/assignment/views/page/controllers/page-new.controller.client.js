/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('pageNewController',pageNewController);

    function pageNewController($location, $routeParams,
                                   pageService) {
    var model = this;
    model.userId = $routeParams['userId'];
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
        return pageService
            .createPage(model.websiteId,page)
            .then(function () {
                $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page');
            },function () {
                model.error = "Sorry, New page could not be created";
            });
    }
    }
})();
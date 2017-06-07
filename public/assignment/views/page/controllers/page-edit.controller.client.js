/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('pageEditController',pageEditController);

    function pageEditController($location, $routeParams,
                                   pageService) {
    var model = this;
    model.userId = $routeParams['userId'];
    model.websiteId = $routeParams['websiteId'];
    model.pageId = $routeParams['pageId'];
    model.deletePage = deletePage;
    model.updatePage = updatePage;

    function init() {
            pageService.findAllPagesForWebsite(model.websiteId)
                .then(renderPages);
            pageService.findPageById(model.pageId)
                .then(renderPage);
    }
    init();

    function renderPage(pages) {
        model.page = page;
    }

    function renderPages(pages) {
        model.pages = pages;
    }
    function deletePage(pageId) {
        return pageService
            .deletePage(pageId)
            .then(function () {
                $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page');
            },function () {
                model.error = "Page could not be deleted";
            });
    }

    function updatePage(page) {
        return pageService
            .updatePage(page._id, page)
            .then(function () {
                $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page');
            }, function () {
                model.error = "Page could not be updated";
            });
    }
    }
})();
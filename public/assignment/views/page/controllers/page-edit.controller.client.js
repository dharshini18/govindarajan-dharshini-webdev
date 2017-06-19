/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('pageEditController',pageEditController);

    function pageEditController($location, $routeParams,
                                   pageService,currentUser) {
    var model = this;
    model.userId = currentUser._id;
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

    function renderPage(page) {
        model.page = page;
    }

    function renderPages(pages) {
        model.pages = pages;
    }

    function deletePage(pageId) {
        return pageService
            .deletePage(pageId)
            .then(function () {
                $location.url('/website/' +model.websiteId+ '/page');
            },function () {
                model.error = "Page could not be deleted";
            });
    }

    function updatePage(page) {
        if (typeof page.name === 'undefined' || page.name === "" || page.name === null){
            model.error = "Page Name is required for updation";
            return;
        }
        return pageService
            .updatePage(page._id, page)
            .then(function () {
                $location.url('/website/' +model.websiteId+ '/page');
            }, function () {
                model.error = "Page could not be updated";
            });
        }
    }
})();
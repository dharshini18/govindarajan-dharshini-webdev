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
    model.deletePage = deletePage;
    model.updatePage = updatePage;

    function init() {
        model.pages =
            pageService.findPageByWebsiteId(model.websiteId);
    }
    init();

    function deletePage(pageId) {
        pageService.deletePage(pageId);
        $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page');
    }

    function updatePage(pageId,page) {
        pageService.updatePage(pageId,page);
        $location.url('/user/' +model.userId+ '/website/' +model.websiteId+ '/page');
    }
    }
})();
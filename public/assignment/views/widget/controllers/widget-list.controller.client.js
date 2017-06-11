/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('widgetListController',widgetListController);

    function widgetListController($sce,
                                  $routeParams,
                                  widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.trust = trust;

        function init() {
                widgetService
                    .findAllWidgetsForPage(model.pageId)
                    .then(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        function getYouTubeEmbedUrl(linkUrl) {
            console.log("Inside Embed Url");
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();
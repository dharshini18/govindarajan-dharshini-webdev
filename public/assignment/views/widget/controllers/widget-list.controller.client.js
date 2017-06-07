/**
 * Created by Dharshini on 5/27/2017.
 */
(function (){
    angular
        .module('WAM')
        .controller('widgetListController',widgetListController);

    function widgetListController($sce,$routeParams,
                                   widgetService,$location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetUrl = widgetUrl;
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
        
        function widgetUrl(widget) {
            var url = 'views/widget/templates/type/widget-'+widget.widgetType+'.view.client.html';
            var url = 'views/widget/templates/type/widget-'+widget.widgetType+'.view.client.html';
            return url;
        }

        function getYouTubeEmbedUrl(linkUrl) {
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
/** * Created by Dharshini on 5/27/2017. */
(function (){
    angular
        .module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($sce,$routeParams,
                                  widgetService,$location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
                widgetService
                    .findAllWidgetsForPage(model.pageId)
                    .then(renderWidgets);
                widgetService
                    .findWidgetById(model.widgetId)
                    .then(renderWidget);
                widgetService
                    .findWidgetType(model.widgetId)
                    .then(renderType);
        }
        init();

        function renderType(type) {
            model.type = type;
        }
        function renderWidget(widget) {
            model.widget = widget;
        }

        function renderWidgets(widgets) {
            model.widgets = widgets;
        }
        
        function updateWidget(widget) {
            return widgetService
                .updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                },function () {
                    model.error = "Sorry, the widget could not be updated";
                })
        }
        
        function deleteWidget(widgetId) {
            return widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                },function () {
                    model.error = "Sorry, the widget could not be deleted";
                })
        }
    }
})();
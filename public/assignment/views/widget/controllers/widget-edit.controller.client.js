/** * Created by Dharshini on 5/27/2017. */
(function (){
    angular
        .module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($sce,$routeParams,
                                  widgetService,$location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
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
            if (typeof widget.name === 'undefined' || widget.name === "" || widget.name === null){
                model.error = "Widget Name is required for creation";
                return;
            }
            return widgetService
                .updateWidget(model.widgetId, widget)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                },function () {
                    model.error = "Sorry, the widget could not be updated";
                })
        }
        
        function deleteWidget(widgetId) {
            return widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                },function () {
                    model.error = "Sorry, the widget could not be deleted";
                })
        }
    }
})();
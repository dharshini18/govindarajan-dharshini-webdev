/**
 * Created by Dharshini on 5/27/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('widgetService',widgetService);

    function widgetService($http) {

        this.createWidget = createWidget;
        this.findAllWidgetsForPage = findAllWidgetsForPage;
        this.findWidgetType = findWidgetType;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.updateWidget = updateWidget;

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetType(widgetId) {
            var url = "/api/widget/type/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllWidgetsForPage(pageId){
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
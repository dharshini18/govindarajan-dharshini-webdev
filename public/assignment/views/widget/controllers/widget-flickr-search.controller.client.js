(function (){
    angular
        .module('WAM')
        .controller('FlickrImageSearchController',FlickrImageSearchController);
    
    function FlickrImageSearchController(FlickrService,
                                         $routeParams,
                                         $location,
                                         widgetService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var websiteId = model.websiteId;
            var pageId = model.pageId;
            var widgetId = model.widgetId;
            var url = url;
            widgetService
                .updateFlickrWidget(websiteId, pageId, widgetId, url)
                .then(function (response) {
                    $location.url("/website/"+model.websiteId+"/page/"+model.pageId+"/widget/");
                });
        }
    }

})();
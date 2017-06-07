/**
 * Created by Dharshini on 6/7/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('FlickrService',FlickrService);

    function FlickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "aa985452b0083967bafdb4b9314486fa";
        var secret = "36cf3524bcd8167f";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);

        }
    }
})();
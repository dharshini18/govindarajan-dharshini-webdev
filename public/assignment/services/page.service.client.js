/**
 * Created by Dharshini on 5/28/2017.
 */
(function () {
    angular
        .module('WAM')
        .service('pageService',pageService);

    function pageService() {
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.createPage = createPage;

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "123", "name": "Post 1", "websiteId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Post 2", "websiteId": "123", "description": "Lorem" },
            { "_id": "987", "name": "Post 3", "websiteId": "123", "description": "Lorem" },
            { "_id": "098", "name": "Post 1", "websiteId": "890", "description": "Lorem" },
            { "_id": "980", "name": "Post 2", "websiteId": "567", "description": "Lorem" }
        ];

        function createPage(websiteId , page) {
            page.websiteId = websiteId + "";
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var results = [];
            for(var p in pages){
                if(pages[p].websiteId === websiteId){
                    pages[p].created = new Date();
                    pages[p].accessed = new Date();
                    results.push(pages[p]);
                }
            }
            return results;
        }
    }
})();

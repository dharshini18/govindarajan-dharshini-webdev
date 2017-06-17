/**
 * Created by Dharshini on 6/14/2017.
 */
(function () {
    angular
        .module('kaApp', [])
        .controller('kaController', kaController)

    function kaController() {
        var model = this;
        model.search = search;
        
        function search(inputTerm) {
         console.log(inputTerm);
        }
    }
})();
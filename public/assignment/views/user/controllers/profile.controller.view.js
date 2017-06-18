(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location,
                               currentUser,
                               userService) {
        var model = this;
        model.userId = currentUser._id;
        model.update = update;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;

        function init() {
            renderUser(currentUser);
        }
        init();
        
        function unregister() {
            userService.unregister()
                .then(function (status) {
                   $location.url('/');
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function () {
                    model.error = "Unable to unregister you";
                });
        }

        function update(user) {
            userService
                .update(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                });
        }

        function renderUser(user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }
    }
})();
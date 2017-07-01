(function () {
    angular
        .module('PRJ')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;

        function login(username, password) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }
            if(password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password is required';
                return;
            }
                userService
                    .login(username, password)
                    .then(function (found) {
                        if (found !== null) {
                            var role = found.roles['0'];
                            if(role === 'USER'){
                                $location.url('/profile');
                            }
                            if(role === 'ADMIN'){
                                $location.url('/admin');
                            }
                        } else {
                            model.message = "Sorry, " + username + " not found. please try again!";
                        }
                    },function (status) {
                        model.message = "Sorry, You could not be logged In!";
                    });
            }
    }
})();
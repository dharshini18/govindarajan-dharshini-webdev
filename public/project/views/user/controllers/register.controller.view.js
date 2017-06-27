(function () {
    angular
        .module('PRJ')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;
        model.register = register;

        function register
        (username, type, firstName, lastName, password, password2, email, phone ) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            if(password !== password2 || password === null || typeof password === 'undefined') {
                model.error = "Passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "Sorry, that username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password,
                            roles: type,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phone: phone
                        };
                        return userService
                            .register(newUser);
                    }
                )
                .then(function (user) {
                    $location.url('/profile');
                });
        }
    }
})();
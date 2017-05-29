/**
 * Created by Dharshini on 5/27/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        //Variable bound to the current instance of the controllers
        var model = this;
        model.register = register;

        function register(username,password,verifypassword) {

            if(username === null || username === '' || typeof username ==='undefined'){
                model.error = 'Username is required';
                return;
            }

            if(password !== verifypassword || password === null || typeof password === 'undefined'){
                model.error = "Passwords must match";
                return;
            }

            var found = userService.findUserByUsername(username);
             if(found != null){
                 model.error = "Sorry, that username is taken"
             }else{
                 var newUser = {
                     username: username,
                     password: password
                 };
                 newUser = userService.createUser(newUser);
                 $location.url('/user/' + newUser._id);
             }
        }
    }
})();
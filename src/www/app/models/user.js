System.register([], function(exports_1) {
    "use strict";
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, username, password) {
                    this.id = id;
                    this.username = username;
                    this.password = password;
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map
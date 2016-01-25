System.register(['angular2/core', '../models/user', '../services/session'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, session_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (session_1_1) {
                session_1 = session_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(_sessionService) {
                    this._sessionService = _sessionService;
                    this.model = new user_1.User(0, "", "");
                    this.result = null;
                }
                Login.prototype.submit = function () {
                    this._sessionService.login(this.model.username, this.model.password).then(function (res) {
                        console.log("hi");
                        console.log(res);
                    });
                };
                Login = __decorate([
                    core_1.Component({
                        templateUrl: '/app/templates/login.html',
                        providers: [session_1.Session]
                    }), 
                    __metadata('design:paramtypes', [session_1.Session])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.js.map
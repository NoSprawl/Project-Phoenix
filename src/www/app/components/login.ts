import {Component} from 'angular2/core';
import {User} from '../models/user';
import {NgForm} from 'angular2/common';
import {Session} from '../services/session';

@Component({
  templateUrl: '/app/templates/login.html',
  providers: [Session]
})
export class Login {
  constructor(private _sessionService: Session) { }

  model = new User(0, "", "");
  result = null;

  submit() {
    this._sessionService.login(this.model.username, this.model.password).then((res) => {
      console.log("hi")
      console.log(res);
    });

  }

}

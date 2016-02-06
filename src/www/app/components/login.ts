import {Component} from 'angular2/core';
import {User} from '../models/user';
import {NgForm} from 'angular2/common';
import {Session} from '../services/session';

@Component({
  templateUrl: '/app/templates/login.html',
  providers: [Session],
  selector: 'login'
})
export class Login {
  constructor(private sessionService: Session) { }
  model:User = new User();

  submit() {
    this.sessionService.login(this.model)
    .subscribe(
      user => this.model = <any>user
    );

  }

}

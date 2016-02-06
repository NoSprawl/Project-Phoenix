"use strict";
import {Component, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Identifier} from '../models/identifier';
import {User} from '../models/user';
import {Session} from '../services/session';

@Component({
  templateUrl: '/app/templates/login.html',
  providers: [Session],
  selector: 'login'
})
export class Login {
  constructor(private sessionService: Session) { }
  errorMessage = "";
  model = new User();
  sess = new Identifier();

  submit() {
    this.sessionService.login(this.model)
    .subscribe(
      identifier => this.sess = <any>identifier,
      error => this.errorMessage = <any>error
    );

  }

}

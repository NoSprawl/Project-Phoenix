"use strict";
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import {User} from '../models/user';
import {Identifier} from '../models/identifier';

@Injectable()
export class Session {
  constructor (private http: Http) {}
  private loginAttemptUrl = "/?login";

  login(user) {
    return this.http.post(this.loginAttemptUrl, JSON.stringify({user}))
                    .map(res => <Identifier[]> res.json().identifier)
  }

}

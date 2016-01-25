import {Injectable} from 'angular2/core';
import {Jsonp, Http} from 'angular2/http';

@Injectable()
export class Session {
  constructor(private jsonp: Jsonp) { }

  login(username, password) {
    return this.jsonp.request("/?login&callback=ng&username=mike&password=admin").map(res => {
      return res.json();
    }).toPromise();

  }

}

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Login} from './components/login';
import {Hubs} from './components/hubs';
import {Policies} from './components/policies';

@Component({
  selector: 'app',
  templateUrl: './app/templates/app.html',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/login',    name: 'Login',    component: Login},
  {path: '/hubs',     name: 'Hubs',     component: Hubs},
  {path: '/policies', name: 'Policies', component: Policies}
])
export class App { }

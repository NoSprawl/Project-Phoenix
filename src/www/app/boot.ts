"use strict";

import {bootstrap} from 'angular2/platform/browser'
import {App} from './app';
import {ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';

bootstrap(App, [ROUTER_PROVIDERS,
                HTTP_PROVIDERS,
                provide(LocationStrategy, {useClass: HashLocationStrategy})]);

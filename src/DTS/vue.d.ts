import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    $http: any;
    $message: (opt: any) => void;
    $router: VueRouter;
    $route: Route;
  }
}

declare global {
  interface Window {
    [propName: string]: any;
  }
}


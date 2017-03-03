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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var AdminService = (function () {
    function AdminService(http) {
        this.http = http;
        this.adminUrl = 'api/admin/'; // URL to web api
    }
    AdminService.prototype.resumeProduction = function () {
        var url = this.adminUrl + "production/resume";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "";
        return this.http.post(url, body, options).
            toPromise().then(function (response) { return response.status; });
    };
    AdminService.prototype.pauseProduction = function () {
        var url = this.adminUrl + "production/pause";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "";
        return this.http.post(url, body, options).
            toPromise().then(function (response) { return response.status; });
    };
    AdminService.prototype.startProcessing = function () {
        var url = this.adminUrl + "production/startConfirm";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = "";
        return this.http.post(url, body, options).
            toPromise().then(function (response) { return response.status; });
    };
    AdminService.prototype.setServiceMode = function (active) {
        var url = this.adminUrl + "pumps/service";
        var body = "false";
        if (active) {
            body = "true";
        }
        return this.http.post(url, body, null).
            toPromise().then(function (response) { return response.status; });
    };
    AdminService.prototype.getPumps = function () {
        var url = this.adminUrl + "pumps";
        return this.http
            .get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    AdminService.prototype.setPump = function (pumpId, componentId) {
        var url = this.adminUrl + "pumps/" + pumpId;
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        var body = componentId;
        return this.http.put(url, body, null).
            toPromise().then(function (response) { return response.status; });
    };
    AdminService.prototype.activatePump = function (pumpId, activate) {
        var url = this.adminUrl + "pumps/" + pumpId + "/active";
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        var body = activate ? 'true' : 'false';
        return this.http.post(url, body, null).
            toPromise().then(function (response) { return response.status; });
    };
    AdminService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AdminService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map
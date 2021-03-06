const logger = require('../../global/logger');
const CONFIG = require('../../config/config_loader');
const request = require('request');
const self = {};

function buildOptionsForRequest(method, protocol, host, port, path, qs) {

    return {
        method: method,
        url: protocol + '://' + host + ':' + port + path,
        qs: qs,
        headers: {}
    }
}


self.getContextForHsmId = function (hsmId, callback) {
    if (typeof(callback) !== 'function') {
        return logger.crit('[license_manager_adapter] missing callback');
    }

    if (!hsmId) {
        return logger.crit('[license_manager_adapter] missing function arguments');
    }

    const options = buildOptionsForRequest(
        'GET',
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PROTOCOL,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.HOST,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PORT,
        '/cmdongles/' + hsmId + '/context',
        {}
    );

    request(options, function (e, r, context) {
        const err = logger.logRequestAndResponse(e, options, r, context);

        callback(err, context);
    });
};

self.updateHsm = function (hsmId, update, callback) {
    if (typeof(callback) !== 'function') {
        return logger.crit('[license_manager_adapter] missing callback');
    }

    if (!hsmId || !update) {
        return logger.crit('[license_manager_adapter] missing function arguments');
    }

    const options = buildOptionsForRequest(
        'PUT',
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PROTOCOL,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.HOST,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PORT,
        '/cmdongles/' + hsmId + '/update',
        {}
    );

    options.headers['content-type'] = 'text/plain';
    options.headers['content-transfer-encoding'] = 'base64';

    options.body = update;

    request(options, function (e, r, data) {
        const err = logger.logRequestAndResponse(e, options, r, data);

        callback(err, data);
    });
};

self.getLicenseInformationForProductCodeOnHsm = function (productCode, hsmId, callback) {
    if (typeof(callback) !== 'function') {
        return logger.crit('[license_manager_adapter] missing callback');
    }

    if (!productCode) {
        return logger.crit('[license_manager_adapter] missing function arguments');
    }

    const options = buildOptionsForRequest(
        'GET',
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PROTOCOL,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.HOST,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PORT,
        '/cmdongles/' + hsmId + '/products/' + productCode + '/licensecount',
        {}
    );

    request(options, function (e, r, data) {
        const err = logger.logRequestAndResponse(e, options, r, data);

        callback(err, data);
    });
};

self.getHsmId = function (callback) {
    if (typeof(callback) !== 'function') {
        return logger.crit('[license_manager_adapter] missing callback');
    }

    const options = buildOptionsForRequest(
        'GET',
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PROTOCOL,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.HOST,
        CONFIG.HOST_SETTINGS.LICENSE_MANAGER.PORT,
        '/cmdongles',
        {}
    );

    options.json = true;

    request(options, function (e, r, data) {
        const err = logger.logRequestAndResponse(e, options, r, data);

        let hsmId = null;
        if (data && data.length) {
            hsmId = data[0];
        }

        callback(err, hsmId);
    });
};

module.exports = self;

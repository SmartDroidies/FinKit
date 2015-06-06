cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.admob.admobplugin/www/AdmobPlugin.js",
        "id": "com.admob.admobplugin.AdmobAd",
        "clobbers": [
            "window.admob"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.email-composer/www/email_composer.js",
        "id": "de.appplant.cordova.plugin.email-composer.EmailComposer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.admob.admobplugin": "2.0.1",
    "cordova-plugin-device": "1.0.1-dev",
    "nl.x-services.plugins.socialsharing": "4.3.18",
    "org.apache.cordova.inappbrowser": "0.6.0",
    "de.appplant.cordova.plugin.email-composer": "0.8.2"
}
// BOTTOM OF METADATA
});
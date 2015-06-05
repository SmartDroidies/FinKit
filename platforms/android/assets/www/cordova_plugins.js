cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.admob.admobplugin/www/AdmobPlugin.js",
        "id": "com.admob.admobplugin.AdmobAd",
        "clobbers": [
            "window.admob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.admob.admobplugin": "2.0.1"
}
// BOTTOM OF METADATA
});
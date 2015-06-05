//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {
	processAd();

	//Handle Menu 
	$( "#menu-cntrl" ).click(function() {
		if($("#mainmenu").is(":visible")) {
			hideMenu();
		} else {
			$("#mainmenu").show(500);
		}
	});

}

function hideMenu() {
	$("#mainmenu").hide(200);
}


function processAd() {
	console.log("init Interstitial Triggered");
	admob.initAdmob("ca-app-pub-9712377602849065/1562012633","ca-app-pub-9712377602849065/9085279431");
    document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
    document.addEventListener(admob.Event.onInterstitialFailedReceive,onReceiveFail, false);
    document.addEventListener(admob.Event.onBannerFailedReceive,onReceiveFail, false);

	//admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_CENTER, null);
	//showTestBanner();
}


function showTestBanner() {
	var admobParam = new admob.Params();
    //admobParam.extra={'keyword':"admob phonegame"};
    //admobParam.isForChild=true;
    admobParam.isTesting = true;
    admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_CENTER, admobParam);
}


//Load AdMob Interstitial Ad
function showInterstitial(){
    admob.isInterstitialReady(function(isReady){
        if(isReady){
            admob.showInterstitial();
        }
    });
}

function onInterstitialReceive (message) {
    alert(message.type + " ,you can show it now");
    admob.showInterstitial();//show it when received
}

function onReceiveFail (message) {
 	var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
    console.log("load fail: " + message.type + "  " + msg);
    //document.getElementById("alertdiv").innerHTML="load fail: "+message.type+"  "+msg;
}


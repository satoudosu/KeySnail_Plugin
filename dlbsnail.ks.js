var PLUGIN_INFO =
<KeySnailPlugin>
    <name>dlbsnail</name>
    <description>Work with Download Statusbar</description>
    <version>0.2.1</version>
    <updateURL>http://github.com/satoudosu/KeySnail_Plugin/raw/master/dlbsnail.ks.js</updateURL>
    <author>satoudosu</author>
    <license document="http://www.opensource.org/licenses/mit-license.php">The MIT License</license>
    <license lang="ja">MIT ライセンス</license>
    <minVersion>1.8.0</minVersion>
    <include>main</include>
    <provides>
    <ext>dlbsnail-show-file-list</ext>
    <ext>dlbsnail-all-clear</ext>
    <ext>dlbsnail-all-pause</ext>
    <ext>dlbsnail-all-resume</ext>
    <ext>dlbsnail-all-cancel</ext>
    <ext>dlbsnail-all-open</ext>
    <ext>dlbsnail-show-command-for-all</ext>
    <ext>dlbsnail-toggle-mode</ext>
    <ext>dlbsnail-open-preference</ext>
    <ext>dlbsnail-open-history</ext>
    </provides>
    <detail lang="ja"><![CDATA[
=== 使い方 ===

Download Statusbar https://addons.mozilla.org/ja/firefox/addon/download-statusbar/ のインストールがされていると，ダウンロードされたアイテムの操作が可能になります．

次のようにして任意のキーへコマンドを割り当てておくことも可能です．

>|javascript|
key.setViewKey('d', function (ev, arg) {
    ext.exec("dlbsnail-show-file-list", arg, ev);
}, 'Show Download Statusbar Items', true);
||<

上記のようなコードを .keysnail.js へ記述しておくことにより，ブラウズ画面において d キーを押すことでダウンロードしたアイテムの状態・ダウンロード進行状況・ファイル名・ソースを表示するプロンプトが立ち上がります．状態が "finished" のファイルを選択することで開くことができます．またそれ以外にもリネーム・URLのコピー・ステータスバーからの削除などができます．以下のようなコードを PRESERVE エリアへ貼り付けることでそれらの機能をキーに対応させることができます．

>|javascript|
plugins.options["dlbsnail.file_key_map"] = {
    "C-z"   : "prompt-toggle-edit-mode",
    "SPC"   : "prompt-next-page",
    "b"     : "prompt-previous-page",
    "j"     : "prompt-next-completion",
    "k"     : "prompt-previous-completion",
    "g"     : "prompt-beginning-of-candidates",
    "G"     : "prompt-end-of-candidates",
    "q"     : "prompt-cancel",
    // for finished file
    "o"     : "open-this-file",
    "O"     : "show-this-file",
    "R"     : "rename-this-file",
    // "C-D"   : "delete-this-file",
    "C"     : "clear-this-file",
    // for in progress or pause file
    // "C-C"   : "cancel-this-file",
    // for in progress file
    // "C-P"   : "pause-this-file",
    // for pause file
    "r"     : "resume-this-file",
    // for all file
    "c"     : "copy-url",
    "V"     : "visit-ref-website",
    "u"     : "undo-clear",
    "h"     : "refresh-file-list"
};
||<

また mooz さんの公開している Dark Theme ( https://github.com/mooz/keysnail/raw/master/plugins/_dark-theme.ks.js )をお使いの方は以下のように設定してみて，ここからお好みのスタイルに変更するといいかもしれません．

>|javascript|
plugins.options["dlbsnail.finished_style"]	 = "color:#7ad3f2";
plugins.options["dlbsnail.in progress_style"]	 = "color:#33ff33";
plugins.options["dlbsnail.paused_style"]	 = "color:red";
plugins.options["dlbsnail.default_style"]	 = "";
plugins.options["dlbsnail.name_style"]		 = "";
plugins.options["dlbsnail.source_style"]	 = style.prompt.url;
plugins.options["dlbsnail.command_style"]	 = "color:#7ad3f2;font-weight:bold";
plugins.options["dlbsnail.file_style"]		 = "font-weight:bold";
plugins.options["dlbsnail.description_style"]	 = "";
||<

=== 注意 ===

上記の設定では削除(delete-this-file)やキャンセル(cancel-this-file)などの不可逆的な操作に関してはコメントアウトしてあります．誤使用の恐れがあるからです．これらの機能で生じたいかなる事故に対して責任は負いかねますので，その覚悟のある方は適宣コメントアウトを外してください．

=== 一括操作 ===

ダウンロードしたファイルを一括に操作で操作するコマンドも用意しました．具体的にはそれぞれの操作が実行可能なファイルに対して，ステータスバーからの削除・一時停止・再開・キャンセル・開くことができます．それぞれのコマンドを任意のキーに割り当てることも可能です．上記の通りキャンセルは不可逆的な操作なので十分注意して使用してください．

>|javascript|
key.setViewKey('D', function (ev, arg) {
    ext.exec("dlbsnail-show-command-for-all", arg, ev);
}, 'dlbasnail-all系コマンド', true);
||<

また上記の設定を行うことで，ブラウズ画面において D キーを押すことで実行可能な全体操作を一覧で表示し，選択することで実行することもできます．       
	
    ]]></detail>
</KeySnailPlugin>;

// ChangeLog
// ==== 0.2.1(2011/03/19) ====
// 
// * fixed default style
// 
// ==== 0.2(2011/03/19) ====
// 
// * add various features
// 
// ==== 0.1.1(2011/03/18) ====
// 
// * add detail
// 
// ==== 0.1.0(2011/03/18) ====
// 
// * First release
// 

// TODO
// 
// 1. 個別ファイルに対して開く以外の操作(キャンセル・再開・キャンセル・削除等)ができるようにする -> 対応しました
// 
// 2. ダウンロード中のファイルに対して状態を%表示する -> 対応しました
// 
// 3. ファイルアイコンの追加 -> 対応しました
// 
// 4. 逐次的な更新(promptの仕様上無理な気がする) -> 力づくで対応しました
// 
// 5. プラグインのアイコンの作成

// Options {{ =============================================================== //
let pOptions = plugins.setupOptions("dlbsnail", {    
    "finished_style"	: { preset: "color:black;" },
    "in progress_style" : { preset: "color:black;" },
    "paused_style"	: { preset: "color:black;" },
    "default_style"	: { preset: "" },    
    "name_style"	: { preset: "" },
    "source_style"	: { preset: style.prompt.url },
    "command_style"	: { preset: "font-weight:bold;", },
    "file_style"	: { preset: "font-weight:bold;" },
    "description_style" : { preset: "" },
    "interval"          : {
	preset : 1*1*1000, // 1 seconds
	description: M({
	    ja: "更新間隔",
	    en: "Interval between updates"
	})
    },
    "file_key_map"      : {
	preset: {
            "C-z"   : "prompt-toggle-edit-mode",
            "SPC"   : "prompt-next-page",
            "b"     : "prompt-previous-page",
            "j"     : "prompt-next-completion",
            "k"     : "prompt-previous-completion",
            "g"     : "prompt-beginning-of-candidates",
            "G"     : "prompt-end-of-candidates",
            "q"     : "prompt-cancel",
	    // for finished file
	    "o"     : "open-this-file",
	    "O"     : "show-this-file",
	    "R"     : "rename-this-file",
	    // "C-D"   : "delete-this-file",
	    "C"     : "clear-this-file",
	    // for in progress or pause file
	    // "C-C"   : "cancel-this-file",
	    // for in progress file
	    // "C-P"   : "pause-this-file",
	    // for pause file
	    "r"     : "resume-this-file",
	    // for all file
	    "c"     : "copy-url",
	    "V"     : "visit-ref-website",
	    "u"     : "undo-clear",
	    "h"     : "refresh-file-list"
	},
	description: M({
	    ja: "個別操作用キーマップ",
	    en: "Local keymap for manipulation in single file list"
	})
    },
    "action_key_map"     : {
	preset: {
            "C-z"   : "prompt-toggle-edit-mode",
            "SPC"   : "prompt-next-page",
            "b"     : "prompt-previous-page",
            "j"     : "prompt-next-completion",
            "k"     : "prompt-previous-completion",
            "g"     : "prompt-beginning-of-candidates",
            "G"     : "prompt-end-of-candidates",
            "q"     : "prompt-cancel"
	},
	description: M({
	    ja: "全体アクション用キーマップ",
	    en: "Local keymap for manipulation for all file"
	})
    }
}, PLUGIN_INFO);

// }} ======================================================================= //
function allOpen() {
    var downbarelem = getDownbarelem();
    
    var comparray = downbarelem.getElementsByAttribute("state", "1");
    
    for (var i=0; i<comparray.length; i++) 
    	_dlbar_startOpenFinished(comparray[i].id);
}

var allActions = [
    [function () {
	_dlbar_clearAll();
	display.echoStatusBar("claer all", 2000);
    }, "Clear all finished items from statusbar",
     "allClear", ["1"]],

    [function () {
	_dlbar_pauseAll();
	display.echoStatusBar("pause all", 2000);
    }, "Pause all items which are in progress",
     "allPause", ["0"]],

    [function () {
	_dlbar_resumeAll();
	display.echoStatusBar("resume all", 2000);
    }, "Resume all items which are pause",
     "allResume", ["4"]],

    [function () {
	_dlbar_cancelAll();
	display.echoStatusBar("cancel all", 2000);
    }, "Cancel all items which are in progress or pause",
     "allCancel", ["0", "4"]],

    [function () {
	allOpen();	
	display.echoStatusBar("open all", 2000);
    }, "Open all items which are finished",
     "allOpen", ["1"]]
];

function getDownbarelem() {
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);   
    var e = wm.getEnumerator("navigator:browser");
    var win;
    win = e.getNext();
    var downbarelem = win.document.getElementById("downbar");

    return downbarelem;
}

function getState(stateString) {
    var state;
    switch(stateString) {
    case "-1":
	state = "not started";
	break;
    case "0":
	state = "in progress";
	break;
    case "1":
	state = "finished";
	break;
    case "4":
	state = "paused";
	break;
    case "5":
	state = "queued";
	break;
    case "6":
	state = "parental blocked";
	break;
    case "7":
	state = "av scanning";
	break;
    case "8":
	state = "av dirty";
	break;
    default:
	state = "unknown";
	break;
    }

    return state;
}		

function showFileList() {
    var downbarelem = getDownbarelem();

    var fileList = downbarelem.getElementsByAttribute("state", '*');

    if(fileList.length == 0)
	return void display.echoStatusBar("No items in Statusbar");

    var collectList = [];
    for(var i=0; i<fileList.length; i++) {
	var id = fileList[i].id;
	var dlElem = document.getElementById(id);
	var aDownload = _dlbar_gDownloadManager.getDownload(id.substring(3));
	
	var file = dlElem.getAttribute("name");
	var source = dlElem.getAttribute("source");
	var state = getState(dlElem.getAttribute("state"));
	var currpercent = aDownload.percentComplete + " %";

	const kExternalHelperAppServContractID = "@mozilla.org/uriloader/external-helper-app-service;1";	
	var mimeService = Components.classes[kExternalHelperAppServContractID].getService(Components.interfaces.nsIMIMEService);
	var contentType = mimeService.getTypeFromFile(aDownload.targetFile);
	var iconURL = "moz-icon:" + dlElem.getAttribute("target") + "?size=32&contentType=" + contentType;

	collectList.push([state, currpercent, iconURL, file, source, id]);
    }

    var refresher = window.setInterval(function() {
	var repeatFlag = false;
	for(var i=0; i<collectList.length; i++) {
	    if(collectList[i][0] != "finished") {
		repeatFlag = true;

		var newPercent = _dlbar_gDownloadManager.getDownload(collectList[i][5].substring(3)).percentComplete;
		collectList[i][1] = newPercent + " %";

		if(newPercent == 100)
		    collectList[i][0] = "finished";
	    }
	}

	if(!repeatFlag) {
	    window.clearInterval(refresher);
	    return;
	}

	prompt.refresh();
	
    }, pOptions["interval"]);

    prompt.selector(
	{
	    message : "downloaded items",
	    acyclic : false,
	    collection : collectList,
	    flags : [0, 0, ICON | IGNORE, 0, 0, HIDDEN],
	    header : ["State", "Percent", "File Name", "Source"],
	    style : ["", "", pOptions["name_style"], pOptions["source_style"]],
	    width : [10, 10, 50,  30],
	    keymap: pOptions["file_key_map"],
	    actions: [
		[function (aIndex) {
		    if(collectList[aIndex][0] == "finished") {
			_dlbar_startOpenFinished(collectList[aIndex][5]);
			prompt.finish();
		    }
		},		 
		 M({ja: "このファイルを開く",
		    en:"Open this file"}),
		 "open-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "finished") {
			_dlbar_startShowFile(collectList[aIndex][5]);
			_dlbar_clearAnimate(collectList[aIndex][5], 1, 125, "width", "clear");
			prompt.finish();
		    }
		},		 
		 M({ja: "このファイルを含むフォルダを開く",
		    en: "Show this file"}),
		 "show-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "finished") {
			_dlbar_renameFinished(collectList[aIndex][5]);
			collectList[aIndex][3] = document.getElementById(collectList[aIndex][5]).getAttribute("name");
			prompt.refresh();
		    }
		},
		 M({ja: "リネーム",
		    en: "Rename this file"}),
		 "rename-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "finished") {
			_dlbar_deleteAnimateCont(collectList[aIndex][5]);
			collectList.splice(aIndex, 1);
			if(collectList.length > 0) {
			    prompt.refresh();
			}
			else
			    prompt.finish();
		    }
		},
		 M({ja: "このファイルを削除",
		    en:"Delete this file"}),
		 "delete-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "finished") {
			_dlbar_clearAnimate(collectList[aIndex][5], 1, 125, "width", "clear");
			collectList.splice(aIndex, 1);
			if(collectList.length > 0)
			    prompt.refresh();
			else
			    prompt.finish();
		    }
		},
		 M({ja: "このファイルをステータスバーから取り除く",
		    en: "Clear this file"}),
		 "clear-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "in progress" || collectList[aIndex][0] == "pause") {
			_dlbar_cancelprogress(collectList[aIndex][5]);			
			collectList.splice(aIndex, 1);
			if(collectList.length > 0)
			    prompt.refresh();
			else
			    prompt.finish();
		    }
		},
		 M({ja: "ダウンロードのキャンセル",
		    en: "Cancel this file"}),
		 "cancel-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "in progress") {
			_dlbar_pause(collectList[aIndex][5]);
			collectList[aIndex][0] = "pause";
			prompt.refresh();
		    }
		},
		 M({ja: "一時停止",
		    en: "Pause this file"}),
		 "pause-this-file,c"],
		[function (aIndex) {
		    if(collectList[aIndex][0] == "pause") {
			_dlbar_resume(collectList[aIndex][5]);
			collectList[aIndex][0] = "in progress";
		    }
		},
		 M({ja: "ダウンロードの再開",
		    en: "Resume this file"}),
		 "resume-this-file,c"],
		[function (aIndex) {
		    _dlbar_copyURL(collectList[aIndex][5]);
		},
		 M({ja: "URL のコピー",
		    en: "Copy url"}),
		 "copy-url"],
		[function (aIndex) {
		    _dlbar_visitRefWebsite(collectList[aIndex][5]);
		},
		 M({ja: "ソールのウェブサイトを訪れる",
		    en: "Visit ref website"}),
		 "visit-ref-website"],
		[function (aIndex) {
		    _dlbar_undoClear();
		    showFileList();
		},
		 M({ja: "クリアのやり直し",
		    en: "Undo clear"}),
		 "undo-clear"],
		[function (aIndex) {
		    showFileList();
		},
		 M({ja: "リストの更新",
		    en: "Refresh file list"}),
		 "refresh-file-list"]
	    ],
	    stylist : function (args, n, current) {
		if (current !== collectList || (n !== 0 && n !== 1))
		    return null;
		let stateOption = args[0] + "_style";

		let stateStyle = stateOption in pOptions ? pOptions[stateOption] : pOptions["default_style"];

		return stateStyle;
	    }
	});    
}

function showAllActions(aEvent, aArg) {
    var downbarelem = getDownbarelem();
    
    var actionList = [];
    var dispList = [];
    
    for(var i=0; i<allActions.length; i++) {
	var count = 0;
	var targetList = allActions[i][3];
	for(var j=0; j<targetList.length; j++) {
	    count += downbarelem.getElementsByAttribute("state", targetList[j]).length;
	}

	if(count != 0) {
    	    actionList.push([allActions[i][2], count + " files", allActions[i][1], getState(targetList[0])]);
	    dispList.push(i);
	}
    }

    if(actionList.length == 0)
	return void display.echoStatusBar("No items in Statusbar");
    
    prompt.selector(
    	{
    	    message : "All Actions",
    	    collection : actionList,
	    flags: [0, 0, 0, HIDDEN],
    	    header : ["Name", "Target", "Description"],
    	    width : [15, 15, 70],
	    keymap: pOptions["action_key_map"],
	    style: ["", pOptions["file_style"], pOptions["description_style"]],	    
	    stylist : function (args, n, current) {
		if (current !== actionList || n !== 0)
		    return null;

		let targetState = args[3] + "_style";

		let sty = targetState in pOptions ? pOptions[targetState] : pOptions["default_style"];

		return sty;
	    },	     
    	    callback : function (i) {
    		if (i >= 0) {
    		    allActions[dispList[i]][0]();
    		}
    	    }
    	}
    );
}

// Add exts {{ ============================================================== //
ext.add("dlbsnail-show-file-list", function() {
    showFileList();
}, M({ja: "ファイルリストの表示",
      en: "Show File List"}));

ext.add("dlbsnail-all-clear", function () {
    allActions[0][0]();
}, M({ja: "ダウンロード完了したファイルをすべてクリア",
      en: "Download Statusbar All Clear"}));

ext.add("dlbsnail-all-pause", function () {
    allActions[1][0]();
}, M({ja: "進行途中のファイルをすべて一時停止",
      en: "Download Statusbar All Pause"}));

ext.add("dlbsnail-all-resume", function () {
    allActions[2][0]();
}, M({ja: "一時停止中のファイルをすべて再開",
      en: "Download Statusbar All Resume"}));

ext.add("dlbsnail-all-cancel", function () {
    allActions[3][0]();
}, M({ja: "進行途中のファイルをすべてキャンセル",
      en: "Download Statusbar All Cancel"}));

ext.add("dlbsnail-all-open", function () {
    allActions[4][0]();
}, M({ja: "ダウンロード完了したファイルをすべて開く",
      en: "Download Statusbar All Open"}));

ext.add("dlbsnail-show-command-for-all", function () {
    showAllActions();
}, M({ja: "全体操作のコマンド一覧",
      en: "Show Commands for All items"}));

ext.add("dlbsnail-toggle-mode", function() {
    _dlbar_modeToggle();
}, M({ja: "ミニモードのトグル",
      en: "Toggle Download Statusbar Mode"}));

ext.add("dlbsnail-open-preference", function() {
    window.open('chrome://downbar/content/downbarprefs.xul');
}, M({ja: "Download Statusbar の設定を開く",
      en: "Open Download Statusbar preference"}));

ext.add("dlbsnail-open-history", function() {
    _dlbar_openDownloadWindow();
}, M({ja: "ダウンロード履歴を見る",
      en: "Open Download History"}));
// }} ======================================================================= //
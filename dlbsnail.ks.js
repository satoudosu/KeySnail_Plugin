var PLUGIN_INFO =
<KeySnailPlugin>
    <name>dlbsnail</name>
    <description>Work with Download Statusbar</description>
    <version>0.1.1</version>
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

Download Statusbar https://addons.mozilla.org/ja/firefox/addon/download-statusbar/ のインストールがされていると，ダウンロードされたアイテムの操作(現段階では主に開くのみ)が可能になります．

次のようにして任意のキーへコマンドを割り当てておくことも可能です．

>|javascript|
key.setViewKey('d', function (ev, arg) {
    ext.exec("dlbsnail-show-file-list", arg, ev);
}, 'Show Download Statusbar Items', true);
||<

上記のようなコードを .keysnail.js へ記述しておくことにより，ブラウズ画面において d キーを押すことでダウンロードしたアイテムの状態・ファイル名・ソースを表示するプロンプトが立ち上がります．状態が "finished" のファイルを選択することで開くことができます．

またダウンロードしたファイルを一括に操作で操作するコマンドも用意しました．具体的にはそれぞれの操作が実行可能なファイルに対して，ステータスバーからの削除・一時停止・再開・キャンセル・開くことができます．それぞれのコマンドを任意のキーに割り当てることも可能です．

>|javascript|
key.setViewKey('D', function (ev, arg) {
    ext.exec("dlbsnail-show-command-for-all", arg, ev);
}, 'dlbasnail-all系コマンド', true);
||<

また上記の設定を行うことで，ブラウズ画面において D キーを押すことで実行可能な全体操作を一覧で表示し，選択することで実行することもできます．

=== TODO ===
やる気の問題もあるので実現するかはわかりませんが，やるとしたら以下のことに取り組む予定です．

1. 個別ファイルに対して開く以外の操作(キャンセル・再開・キャンセル・削除等)ができるようにする

2. ダウンロード中のファイルに対して状態を%表示する

3. ファイルアイコンの追加

4. 逐次的な更新(promptの仕様上無理な気がしている)

5. プラグインのアイコンの作成
	
    ]]></detail>
</KeySnailPlugin>;


// ChangeLog
// 
// ==== 0.1.1(2011/03/18) ====
// 
// * add detail
// 
// ==== 0.1.0(2011/03/18) ====
// 
// * First release
// 


// Options {{ =============================================================== //
let pOptions = plugins.setupOptions("dlbsnail", {
    /*
    "finished_style" : {	
        preset: "color:#7ad3f2;font-weight:bold;",
	description: "finished state style"
    },
    "in progress_style" : {
	preset: "color:#33ff33;font-weight:bold;",
	description: "in progress state style"
    },
    "paused_style" : {
	preset: "color:red;font-weight:bold;",
	description: "paused state style"
    },
    "default_style" : {
	preset: "font-weight:bold;",
	description: "default style"
    },
     */
    "state_style" : {
	preset: "color:#7ad3f2;font-weight:bold;",
	description: "state style"
    },
    "name_style" : {
	preset: "",
	description: "name style"
    },
    "source_style" : {
	preset: style.prompt.url,
	description: "source style"
    },
    "command_style" : {
	preset: "color:#7ad3f2;font-weight:bold;",
	descriptioin: "command style"
    },
    "file_style" : {
	preset: "font-weight:bold;",
	description: "file num style"	
    },
    "description_style" : {
	preset: "",
	description: "description style"
    },
    "key_map": {
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
	    ja: "個別操作用キーマップ",
	    en: "Local keymap for manipulation in single file list"
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
    }, "Clear all finished items",
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
     "allOpen", ["1"]],
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
	var dlElem = document.getElementById(fileList[i].id);
	
	var file = dlElem.getAttribute("name");
	var source = dlElem.getAttribute("source");
	var state = getState(dlElem.getAttribute("state"));

	collectList.push([state, file, source]);
    }

    prompt.selector(
	{
	    message : "downloaded items",
	    acyclic : false,
	    collection : collectList,
	    header : ["State", "File Name", "Source"],
	    style : [pOptions["state_style"], pOptions["name_style"], pOptions["source_style"]],
	    width : [10, 60, 30],
	    keymap: pOptions["key_map"],
	    /*
	    stylist : function (args, n, current) {
		if (current !== collectList)
		    return null;
		let stateOption = args[0] + "_style";

		let stateStyle = stateOption in pOptions ? pOptions[stateOption] : pOptions["default_style"];

		let style = [stateStyle, pOptions["name_style"], pOptions["source_style"]];

		return style;
	    },
	     */
	    callback : function (i) {
		if(i >= 0 & collectList[i][0] == "finished") {
		    _dlbar_startOpenFinished(fileList[i].id);
		    return void display.echoStatusBar("Opening " + document.getElementById(collectList[i].id).getAttribute("name"));
		}
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
    	    actionList.push([allActions[i][2], count + " files", allActions[i][1]]);
	    dispList.push(i);
	}
    }

    if(actionList.length == 0)
	return void display.echoStatusBar("No items in Statusbar");
    
    prompt.selector(
    	{
    	    message : "All Actions",
    	    collection : actionList,
    	    header : ["Name", "Target", "Description"],
    	    width : [15, 15, 70],
	    keymap: pOptions["key_map"],
	    style: [pOptions["command_style"], pOptions["file_style"], pOptions["description_style"]],
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
}, "Show File List");

ext.add("dlbsnail-all-clear", function () {
    allActions[0][0]();
}, "Download Statusbar All Clear");

ext.add("dlbsnail-all-pause", function () {
    allActions[1][0]();
}, "Download Statusbar All Pause");

ext.add("dlbsnail-all-resume", function () {
    allActions[2][0]();
}, "Download Statusbar All Resume");

ext.add("dlbsnail-all-cancel", function () {
    allActions[3][0]();
}, "Download Statusbar All Cancel");

ext.add("dlbsnail-all-open", function () {
    allActions[4][0]();
}, "Download Statusbar All Open");

ext.add("dlbsnail-show-command-for-all", function () {
    showAllActions();
}, "Show Commands for All items");

ext.add("dlbsnail-toggle-mode", function() {
    _dlbar_modeToggle();
}, "Toggle Download Statusbar Mode");

ext.add("dlbsnail-open-preference", function() {
    window.open('chrome://downbar/content/downbarprefs.xul');
}, "Open Download Statusbar preference");

ext.add("dlbsnail-open-history", function() {
    _dlbar_openDownloadWindow();
}, "Open Download History");
// }} ======================================================================= //
ace.require("ace/ext/language_tools");
ace.require("ace/range");

var editor = ace.edit("editor");

editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    scrollPastEnd: 0.5,
});

editor.setTheme("ace/theme/monokai");

editor.session.on('change', function(delta) {
    // delta.start, delta.end, delta.lines, delta.action
    localStorage.setItem(currentLanguage,editor.session.getValue());
});

if(!localStorage.getItem("editorWrap")){
wordWrap();
}

let currentLanguage = ""

//ace android
function settingShow() {
    //show the setting div
    document.getElementById("settings").style.display = 'block';
}

function settingHide() {
    //hide the setting div
    document.getElementById("settings").style.display = 'none';
}


function wordWrap() {
    isWarp = document.getElementById('Code Wrap')?.checked;
    localStorage.setItem("editorWrap", isWarp);
    editor.session.setUseWrapMode(isWarp);
}

function setLanguage(lang) {
    currentLanguage = lang
    editor.getSession().setMode(lang);
}


function setCode(code) {
    //alert("hi")
    if(localStorage.getItem(currentLanguage)){
        let codeFromLocal = localStorage.getItem(currentLanguage);
        editor.setValue(codeFromLocal);
    }else{
        let decodedString = atob(code);
        editor.setValue(decodedString);
        localStorage.setItem(currentLanguage,decodedString);
    }
}

function getCode() {
    //  editor.session.getValue();
    return btoa(editor.session.getValue());
    //or editor.getValue()
}


/********** Enabled Sites **********/

// UI references
const toggleList = document.getElementById("toggleList");
const redditSwitch = document.getElementById("redditSwitch");
const imgurSwitch = document.getElementById("imgurSwitch");
const twitterSwitch = document.getElementById("twitterSwitch");
const addOtherSites = document.getElementById("addOtherSites");
const globalSwitch = document.getElementById("globalSwitch");

const globalSwitchHandler = () => {
    if(globalSwitch.checked == true) {
        redditSwitch.checked = false;
        imgurSwitch.checked = false;
        twitterSwitch.checked = false;

        toggleList.style.pointerEvents = "none";
        toggleList.style.opacity = "50%";
    } else {
        toggleList.style.pointerEvents = "auto";
        toggleList.style.opacity = "100%";
    }
}

globalSwitch.onclick = globalSwitchHandler;


/********** Keywords **********/

// keywords data
var allowedWordsData = [
    "ukraine",
    "blm",
    "gas prices"
];

var blockedWordsData = [
    "trump",
    "terrorist"
];

//keywords cookie
const cookieName = "PolityCry";
//initialize cookie ( debug )
//setCookie(cookieName,blockedWordsData,365);
blockedWordsData = getCookie(cookieName);
console.log(blockedWordsData[0]);
////set cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

////get cookie;
function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(',');
ca[0] = ca[0].substring(name.length);
return ca;
};

// UI references
const allowedBtn = document.getElementById("allowedBtn");
const blockedBtn = document.getElementById("blockedBtn");
const tagList = document.getElementById("tagList");
const editTextField = document.getElementById("editTextField");
const manageTagListBtn = document.getElementById("manageTagListBtn");

// Helper:
const renderAllowedWords = () => {
    const max = 4;
    const numTagItems = allowedWordsData.length > max ? max : allowedWordsData.length;
    const numMoreResults=  allowedWordsData.length - numTagItems;

    let tagItems = "";
    const moreResults = numMoreResults > 0 ? `<div class=\"tag-results-item\">${numMoreResults} more</div>` : "";

    for (let i=0; i<numTagItems; i++) {
        tagItems += `<div class=\"tag-item\">${allowedWordsData[i]}</div>`;
    }
    tagList.innerHTML = tagItems + moreResults;
}

// Helper:
const renderBlockedWords = () => {
    const max = 4;
    const numTagItems = blockedWordsData.length > max ? max : blockedWordsData.length
    const numMoreResults=  blockedWordsData.length - numTagItems;

    let tagItems = "";
    const moreResults = numMoreResults > 0 ? `<div class=\"tag-results-item\">${numMoreResults} more</div>` : "";

    for (let i=0; i<numTagItems; i++) {
        tagItems += `<div class=\"tag-item\">${blockedWordsData[i]}</div>`;
    }
    tagList.innerHTML = tagItems + moreResults;
}

// Method:
const allowedBtnHandler = () => {
    manageTagListBtn.innerHTML = "Edit Allowed"
    allowedBtn.style.backgroundColor = "#2196F3"
    blockedBtn.style.backgroundColor = "#999999";
    renderAllowedWords();
}

// Method:
const blockedBtnHandler = () => {
    manageTagListBtn.innerHTML = "Edit Blocked"
    allowedBtn.style.backgroundColor = "#999999"
    blockedBtn.style.backgroundColor = "#2196F3";
    renderBlockedWords();
}

var isEdit = false;

//Mehtod:
const manageTagListBtnHandler = () => {
    if(!isEdit){
        isEdit = true;
        manageTagListBtn.innerHTML = "Add" + manageTagListBtn.innerHTML.substring(4);
        editTextField.style.opacity = "100%"
    }else{
        isEdit = false;
        manageTagListBtn.innerHTML = "Edit" + manageTagListBtn.innerHTML.substring(3);
        editTextField.style.opacity = "0%"
        const add = editTextField.value;
        //currently new item is just appended to cookie
        //new item needs validation.
        blockedWordsData.push(add);
        setCookie(cookieName,blockedWordsData,365);
        
    }
}

// assign buttons their respective functions
allowedBtn.onclick = allowedBtnHandler;
blockedBtn.onclick = blockedBtnHandler;
manageTagListBtn.onclick = manageTagListBtnHandler;

allowedBtnHandler();

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
const allowedWordsData = [
    "ukraine",
    "blm",
    "gas prices"
];

const blockedWordsData = [
    "trump",
    "terrorist",
    "communism",
    "racism",
    "isis",
    "pizza"
];

//keywords cookie
const cookieName = "PolityCry";
var cookieList = getCookie(cookieName);

////set cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

////stores cookie in cookielist;
function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i <ca.length; i++) {
  let c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
  }
}
};

// UI references
const allowedBtn = document.getElementById("allowedBtn");
const blockedBtn = document.getElementById("blockedBtn");
const tagList = document.getElementById("tagList");
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

// assign buttons their respective functions
allowedBtn.onclick = allowedBtnHandler;
blockedBtn.onclick = blockedBtnHandler;

allowedBtnHandler();

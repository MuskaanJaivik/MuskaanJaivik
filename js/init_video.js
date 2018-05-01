var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    var ww = window.innerWidth;
    player = new YT.Player("player", {
        width: ww,
        height: 0.5625*ww,
        videoId: "YWqyQSuxt3s",

        playerVars: { "autoplay": 1, "rel": 0, "disablekb": 1, "controls": 0, "showinfo": 0, "modestbranding": 1 },
        
        events: {
            "onStateChange": function(event) { if (event.data === YT.PlayerState.ENDED) player.playVideo(); }
        }

    });

    var cover = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(cover);
    cover.setAttribute("id", "video_cover");
    //cover.setAttribute("style", "position: absolute; left: " + GetAbsoluteOffset(document.getElementById("player")).left + "; top: " + GetAbsoluteOffset(document.getElementById("player")).top + "px; background-color: rgba(255, 0, 0, 0.5); width: " + document.getElementById("player").offsetWidth + "px; height: " + document.getElementById("player").offsetHeight + "px; z-index: 30;");
    cover.style.position = "absolute";
    cover.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cover.style.zIndex = document.getElementById("topnav_container").style.zIndex - 1;
    Conceal(cover);
    cover.click(function(event){event.stopPropagation();});
}

window.addEventListener("resize", function(){
    Conceal(document.getElementById("video_cover"));
});

function GetAbsoluteOffset(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

function Conceal(cover) {
    //var cover = document.getElementById("video_conver");
    cover.style.left = GetAbsoluteOffset(document.getElementById("player")).left + "px";
    cover.style.top = GetAbsoluteOffset(document.getElementById("player")).top + "px";
    cover.style.width = document.getElementById("player").offsetWidth + "px";
    cover.style.height = document.getElementById("player").offsetHeight + "px";
}
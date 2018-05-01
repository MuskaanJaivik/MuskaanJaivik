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
        width: document.getElementsByTagName("body")[0].offsetWidth,
        height: document.getElementsByTagName("body")[0].offsetWidth * 0.5625,
        videoId: "YWqyQSuxt3s",

        playerVars: { "autoplay": 1, "rel": 0, "disablekb": 1, "controls": 0, "showinfo": 0, "modestbranding": 1 },
        
        events: {
            "onStateChange": function(event) { if (event.data === YT.PlayerState.ENDED) player.playVideo(); }
        }

    });

    var cover = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(cover);
    cover.setAttribute("id", "video_cover");
    cover.style.position = "absolute";
    cover.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cover.style.zIndex = document.getElementById("topnav_container").style.zIndex - 1;
    Conceal(cover);
    cover.click(function(event){event.stopPropagation();});
    window.addEventListener("resize", VidResize);
}

function VidResize() {
    var vid = document.getElementById("player");
    vid.style.width = document.getElementsByTagName("body")[0].offsetWidth + "px";
    vid.style.height = document.getElementsByTagName("body")[0].offsetWidth * 0.5625 + "px";
    Conceal(document.getElementById("video_cover"));
}

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
    cover.style.left = GetAbsoluteOffset(document.getElementById("player")).left + "px";
    cover.style.top = GetAbsoluteOffset(document.getElementById("player")).top + "px";
    cover.style.width = document.getElementById("player").offsetWidth + "px";
    cover.style.height = document.getElementById("player").offsetHeight + "px";
}
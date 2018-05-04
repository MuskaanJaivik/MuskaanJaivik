var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    var ww = window.innerWidth * 0.9;
    player = new YT.Player("player", {
        width: window.innerWidth * 0.9,
        height: window.innerWidth * 0.9 * 0.5625,
        videoId: "YWqyQSuxt3s",

        playerVars: { "autoplay": 1, "rel": 0, "disablekb": 1, "controls": 0, "showinfo": 0, "modestbranding": 1 },
        
        events: {
            "onStateChange": OnPlayerStateChange
        }

    });

    document.getElementById("video_container").style.height = (window.innerHeight - document.getElementById("topnav_container").offsetHeight) * 0.9 + "px";
    var dif = (document.getElementById("player").offsetHeight - document.getElementById("video_container").offsetHeight) * 0.5;
    document.getElementById("player").style.transform = "translateY(-" + dif + "px)";
    document.getElementById("player").style.webkitTransform = "translateY(-" + dif + "px)";
    var container = document.getElementById("video_container");
    if (container.offsetHeight > document.getElementById("player").offsetHeight)
        container.style.height = document.getElementById("player").offsetHeight + "px";

    var cover = document.createElement("div");
    document.getElementById("hp_content").appendChild(cover);
    cover.setAttribute("id", "video_cover");
    cover.style.position = "absolute";
    cover.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cover.style.display = "none";
    cover.style.zIndex = document.getElementById("topnav_container").style.zIndex - 1;
    if (is_playing)
        cover.style.display = "initial";
    else
        cover.style.diplay = "none";
    Conceal(cover);
    cover.click(function(event){event.stopPropagation();});
    window.addEventListener("resize", VidResize);

    setTimeout(KeepPlaying, 3000);

}

var is_playing = false;
function OnPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            document.getElementById("video_cover").style.display = "initial";
            is_playing = true;
            break;
        case YT.PlayerState.PAUSED:
            document.getElementById("video_cover").style.display = "none";
            is_playing = false;
            player.playVideo();
            break;
        case YT.PlayerState.ENDED:
            player.playVideo();
            break;
    }
}

function KeepPlaying() {
    if (!is_playing)
        player.playVideo();
    setTimeout(KeepPlaying, 3000);
}

function VidResize() {
    var vid = document.getElementById("player");
    vid.style.width = window.innerWidth * 0.9 + "px";
    vid.style.height = window.innerWidth * 0.9 * 0.5625 + "px";
    document.getElementById("video_container").style.height = parseInt(vid.style.height, 10) + "px"//(window.innerHeight - document.getElementById("topnav_container").offsetHeight) * 0.9 + "px";
    var dif = (document.getElementById("player").offsetHeight - document.getElementById("video_container").offsetHeight) * 0.5;
    document.getElementById("player").style.transform = "translateY(-" + dif + "px)";
    document.getElementById("player").style.webkitTransform = "translateY(-" + dif + "px)";
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
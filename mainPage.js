videosTableLength = videosTable.length
const main = document.getElementById('main')
const loadingGif = document.getElementById('loading')
function mainPage(){
    videoPageDiv.innerHTML = ''
    main.innerHTML = ''
    let innerString
    for(let x=videosTableLength-1;x>videosTableLength-7;x--){
        innerString = "<div><div class='video-thumbnail-wrapper' onclick='videoPage(" + x + ")'>"
        innerString += "<div class='video-thumbnail__video-wrapper'><img id='test' src='video/" + x + ".mp4#t=2' class='video-thumbnail__video'><div class='shadow'></div></div>"
        innerString += "<p class='video-thumbnail__title'>" + videosTable[x][0] + "</p>" 
        innerString += "<p class='video-thumbnail__desc'>" + videosTable[x][2] + "</p>" 
        innerString += "</div></div>" 
        main.innerHTML += innerString
    }
    main.innerHTML += "<p class='loadmore' onclick='loadMore()'>Wczytaj więcej</p>"
    vidToImg()
    muteVideos()
}
let videosAmount = 6
function loadMore(){
    videosAmount+=6
    main.style.display = 'none'
    loadingGif.style.display = 'block'
    for(let x=videosTableLength-videosAmount+5;x>videosTableLength-videosAmount-1;x--){
        innerString = "<div><div class='video-thumbnail-wrapper' onclick='videoPage(" + x + ")'>"
        innerString += "<div class='video-thumbnail__video-wrapper'><img muted='true' src='video/" + x + ".mp4#t=2' class='video-thumbnail__video'><div class='shadow'></div></div>"
        innerString += "<p class='video-thumbnail__title'>" + videosTable[x][0] + "</p>" 
        innerString += "<p class='video-thumbnail__desc'>" + videosTable[x][2] + "</p>" 
        innerString += "</div></div>" 
        main.innerHTML += innerString
    }
    setTimeout(function() {
        main.style.display = 'grid'
        loadingGif.style.display = 'none'
    }, 2000)
    vidToImg()
    muteVideos()
}
function vidToImg(){
  Array.prototype.map.call(
    document.querySelectorAll('.video-thumbnail__video'),
    function(img){

      let src = img.src;
      img.src = null;

      img.addEventListener('error', function(){
        let video = document.createElement('video');

        video.muted = true
        video.autoplay = true
        video.loop = true
        video.playsInline = true

        for (
          let imgAttr = img.attributes, 
          len = imgAttr.length,
          i = 0; 
          i < len; 
          i++
        ) { 
          video.setAttribute(imgAttr[i].name,  imgAttr[i].value); 
        }

        img.parentNode.insertBefore(video, img);
        img.parentNode.removeChild(img);

      });
      
      img.src = src;
    });
  }
function muteVideos(){    
  let videoList = document.getElementsByClassName('video-thumbnail__video')
  len = videoList.length
  for(let x=0;x<len;x++){
    videoList[x].muted = true
  }
}

const videoPageDiv = document.getElementById('video-player-container')
function videoPage(videoId) {
  main.innerHTML = ''
  videoPageDiv.innerHTML = ''
  innerString = "<div class='video-player-wrapper' id='video-player-wrapper'>"
  innerString += "<video class='video-player__video' src='video/" + videoId + ".mp4' controls playsinline></video>"
  innerString += "<p class='video-player__title'>" + videosTable[videoId][0] + "</p>" 
  innerString += "<p class='video-player__desc'>" + videosTable[videoId][2] + "</p>" 
  innerString += "</div>"
  var arr = [];
  while(arr.length < 8){
    var r = Math.floor(Math.random() * videosTable.length);
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  innerString += "<div class='recommendations'>"
  for(let x=0;x<8;x++){
    innerString += "<div><div class='video-thumbnail-wrapper' onclick='videoPage(" + arr[x] + ")'>"
    innerString += "<div class='video-thumbnail__video-wrapper'><img muted='true' src='video/" + arr[x] + ".mp4#t=2' class='video-thumbnail__video'><div class='shadow'></div></div>"
    innerString += "<p class='video-thumbnail__title'>" + videosTable[arr[x]][0] + "</p>" 
    innerString += "</div></div>" 
  }
  innerString += "</div>"
  videoPageDiv.innerHTML += innerString
  vidToImg()
  muteVideos()
}
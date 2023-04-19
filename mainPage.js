function videoThumbnail(videoId) {
  
  const wrapper = document.createElement("div")
  wrapper.classList.add("video-thumbnail-wrapper")
  const func1 = "videoPage(" + videoId + ")"
  const func2 = "videoHover(" + videoId + ", 'play')"
  const func3 = "videoHover(" + videoId + ", 'pause')"
  wrapper.setAttribute("onclick", func1)
  wrapper.setAttribute("onmouseover", func2)
  wrapper.setAttribute("onmouseleave", func3)
  
  const videoWrapper = document.createElement("div")
  videoWrapper.classList.add("video-thumbnail__video-wrapper")
  
  const video = document.createElement("img")
  video.classList.add("video-thumbnail__video")
  const path = "video/" + videoId + ".mp4"
  video.setAttribute("src", path)
  video.setAttribute("id", videoId)
  
  const shadow = document.createElement("div")
  shadow.classList.add("shadow")
  
  const title = document.createElement("p")
  title.classList.add("video-thumbnail__title")
  const titleText = document.createTextNode(videosTable[videoId][0])
  title.appendChild(titleText)
  
  const desc = document.createElement("p")
  desc.classList.add("video-thumbnail__desc")
  const descText = document.createTextNode(videosTable[videoId][2])
  desc.appendChild(descText)
  
  videoWrapper.appendChild(video)
  videoWrapper.appendChild(shadow)
  wrapper.appendChild(videoWrapper)
  wrapper.appendChild(title)
  wrapper.appendChild(desc)

  return wrapper
}

function videoHover(videoId, status){
  const video = document.getElementById(videoId)
  if(status == 'play'){
    video.play()
  }
  else{
    video.pause()
  }
}

videosTableLength = videosTable.length
const main = document.getElementById('main')

function mainPage(){

  const videopage = document.getElementById("video-player-container")
  if(videopage){
    videopage.remove()
  }
  
  const main = document.createElement("div")
  main.classList.add("main")
  main.setAttribute("id", "main")

  document.body.appendChild(main)

  for(let x=videosTableLength-1;x>=0;x--){
    main.appendChild(videoThumbnail(x))
  }
  vidToImg()
}

function searchPage(){

  const videopage = document.getElementById("video-player-container")
  if(videopage){
    videopage.remove()
  }
  const oldmain = document.getElementById("main")
  if(oldmain){
    oldmain.remove()
  }

  const main = document.createElement("div")
  main.classList.add("main")
  main.setAttribute("id", "main")

  document.body.appendChild(main)

  const value = document.getElementById("search-input").value.toLowerCase()
  const videosArray = []

  for(let x=videosTableLength-1;x>=0;x--){
    if(videosTable[x][0].toLowerCase().includes(value) || videosTable[x][2].toLowerCase().includes(value)){
      videosArray.push(x)
    }
  }
  for(x in videosArray){
    main.appendChild(videoThumbnail(videosArray[x]))
  }
  vidToImg()
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

function videoPage(videoId) {

  const main = document.getElementById("main")
  if(main){
    main.remove()
  }

  const videoContainer = document.getElementById("video-player-container")
  if(videoContainer){
    videoContainer.remove()
  }

  const container = document.createElement("div")
  container.classList.add("video-player-container")
  container.setAttribute("id", "video-player-container")
  
  const wrapper = document.createElement("div")
  wrapper.classList.add("video-player-wrapper")
  
  const video = document.createElement("video")
  video.classList.add("video-player__video")
  video.setAttribute("controls", true)
  video.setAttribute("playsinline", true)
  
  const source = document.createElement("source")
  const path = "video/" + videoId + ".mp4"
  source.setAttribute("src", path)
  source.setAttribute("type", "video/mp4")

  const track = document.createElement("track")
  const trackPath = "subtitles/" + videoId + ".vtt"
  track.setAttribute("src", trackPath)
  track.setAttribute("default", true)

  video.appendChild(source)
  video.appendChild(track)

  const title = document.createElement("p")
  title.classList.add("video-player__title")
  const titleText = document.createTextNode(videosTable[videoId][0])
  title.appendChild(titleText)

  const desc = document.createElement("p")
  desc.classList.add("video-player__desc")
  const descText = document.createTextNode(videosTable[videoId][2])
  desc.appendChild(descText)

  wrapper.appendChild(video)
  wrapper.appendChild(title)
  wrapper.appendChild(desc)

  const recommendations = document.createElement("div")
  recommendations.classList.add("recommendations")

  let arr = [];
  while(arr.length < 8){
    let r = Math.floor(Math.random() * videosTable.length);
    if(arr.indexOf(r) === -1) arr.push(r);
  }

  for(let x=0;x<8;x++){
    recommendations.appendChild(videoThumbnail(arr[x]))
  }

  container.appendChild(wrapper)
  container.appendChild(recommendations)
  document.body.appendChild(container)

  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  })

  vidToImg()
}
function videoThumbnail(videoId) {
  // const main = document.getElementById('main')
  
  const wrapper = document.createElement("div")
  wrapper.classList.add("video-thumbnail-wrapper")
  const func = "videoPage(" + videoId + ")"
  wrapper.setAttribute("onclick", func)
  
  const videoWrapper = document.createElement("div")
  videoWrapper.classList.add("video-thumbnail__video-wrapper")
  
  const video = document.createElement("img")
  video.classList.add("video-thumbnail__video")
  const path = "video/" + videoId + ".mp4"
  video.setAttribute("src", path)
  
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

videosTableLength = videosTable.length
const main = document.getElementById('main')

const loadingGif = document.getElementById('loading')

function mainPage(){

  const videopage = document.getElementById("video-player-container")
  videopage.remove()
  
  const main = document.createElement("div")
  main.classList.add("main")
  main.setAttribute("id", "main")

  const loadmore = document.createElement("p")
  loadmore.classList.add("loadmore")
  const titleText = document.createTextNode("Wczytaj więcej")
  loadmore.appendChild(titleText)
  loadmore.setAttribute("onclick", "loadMore()")
  main.appendChild(loadmore)

  document.body.appendChild(main)

  for(let x=videosTableLength-1;x>videosTableLength-7;x--){
    main.appendChild(videoThumbnail(x))
  }
  vidToImg()
}

let videosAmount = 6
function loadMore(){
    videosAmount+=6
    const main = document.getElementById("main")
    for(let x=videosTableLength-videosAmount+5;x>videosTableLength-videosAmount-1;x--){
      main.appendChild(videoThumbnail(x))
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

function videoPage(videoId) {

  const main = document.getElementById("main")
  main.remove()

  const container = document.createElement("div")
  container.classList.add("video-player-container")
  container.setAttribute("id", "video-player-container")
  
  const wrapper = document.createElement("div")
  wrapper.classList.add("video-player-wrapper")
  
  const video = document.createElement("video")
  video.classList.add("video-player__video")
  const path = "video/" + videoId + ".mp4"
  video.setAttribute("src", path)
  video.setAttribute("controls", true)
  video.setAttribute("playsinline", true)

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

  vidToImg()
}
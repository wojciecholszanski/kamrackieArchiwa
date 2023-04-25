
async function videoPage(videoId) {

    const response = await fetch('./assets/data/videos.json')
    const res = await response.json()
    videosTableLength = res.length
    videoData = await res.filter(el => el.id == videoId)[0]
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
    const path = "./assets/videos/" + videoData.id + ".mp4"
    source.setAttribute("src", path)
    source.setAttribute("type", "video/mp4")
  
    const track = document.createElement("track")
    const trackPath = "./assets/subtitles/" + videoData.id + ".vtt"
    track.setAttribute("src", trackPath)
    track.setAttribute("default", true)
  
    video.appendChild(source)
    video.appendChild(track)
  
    const title = document.createElement("p")
    title.classList.add("video-player__title")
    const titleText = document.createTextNode(videoData.name)
    title.appendChild(titleText)
  
    const desc = document.createElement("p")
    desc.classList.add("video-player__desc")
    const descText = document.createTextNode(videoData.text)
    desc.appendChild(descText)
  
    wrapper.appendChild(video)
    wrapper.appendChild(title)
    wrapper.appendChild(desc)
  
    const recommendations = document.createElement("div")
    recommendations.classList.add("recommendations")
  
    let arr = [];
    while(arr.length < 8){
      let r = Math.floor(Math.random() * videosTableLength);
      if(arr.indexOf(r) === -1) arr.push(r);
    }
    recommData = await res.filter(el => arr.includes(el.id))
    for(let x of recommData){
        recommendations.appendChild(videoThumbnail(x))
        console.error(x)
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
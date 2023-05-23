function videoThumbnail(videoData) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("video-thumbnail-wrapper");
  const func1 = "document.location.href = '?id=" + videoData.id + "'";
  const func2 = "videoHover(" + videoData.id + ", 'play')";
  const func3 = "videoHover(" + videoData.id + ", 'pause')";
  wrapper.setAttribute("onclick", func1);
  wrapper.setAttribute("onmouseover", func2);
  wrapper.setAttribute("onmouseleave", func3);

  const videoWrapper = document.createElement("div");
  videoWrapper.classList.add("video-thumbnail__video-wrapper");

  const video = document.createElement("img");
  video.classList.add("video-thumbnail__video");
  const path = "./assets/videos/" + videoData.id + ".mp4";
  video.setAttribute("src", path);
  video.setAttribute("id", videoData.id);

  const shadow = document.createElement("div");
  shadow.classList.add("shadow");

  const title = document.createElement("p");
  title.classList.add("video-thumbnail__title");
  const titleText = document.createTextNode(videoData.name);
  title.appendChild(titleText);

  const desc = document.createElement("p");
  desc.classList.add("video-thumbnail__desc");
  const descText = document.createTextNode(videoData.text);
  desc.appendChild(descText);

  videoWrapper.appendChild(video);
  videoWrapper.appendChild(shadow);
  wrapper.appendChild(videoWrapper);
  wrapper.appendChild(title);
  wrapper.appendChild(desc);

  return wrapper;
}

function videoHover(videoId, status) {
  const video = document.getElementById(videoId);
  if (status == "play") {
    video.play();
  } else {
    video.pause();
  }
}

const main = document.getElementById("main");

const queryParams = new URLSearchParams(window.location.search);
const paramsMap = {};
for (const [key, value] of queryParams.entries()) {
  paramsMap[key] = value;
}
if (paramsMap.id) {
  videoPage(paramsMap.id);
} else if (paramsMap.search) {
  searchPage(paramsMap.search);
} else {
  mainPage();
}

async function data(start, end) {
  const response = await fetch("./assets/data/videos.json");
  let videoData = await response.json();
  videoData = await videoData.sort((a, b) => {
    return b.id - a.id;
  });
  videoData = videoData.slice(start, end);
  return videoData;
}

let videosTable;

async function mainPage() {
  videosTable = await data();
  videosTableLength = videosTable.length;
  videosTable = await data(0, 6);
  videosShown = 6;
  const videopage = document.getElementById("video-player-container");
  if (videopage) {
    videopage.remove();
  }

  const oldmain = document.getElementById("main");
  if (oldmain) {
    oldmain.remove();
  }

  const main = document.createElement("div");
  main.classList.add("main");
  main.setAttribute("id", "main");

  document.body.appendChild(main);

  for (x of videosTable) {
    main.appendChild(videoThumbnail(x));
  }
  vidToImg();
  const showMoreButton = document.createElement("div");
  showMoreButton.classList.add("show-more-button");
  showMoreButton.setAttribute("id", "showMoreButton");
  showMoreButton.setAttribute("onclick", "showMore()");
  const showMoreButtonText = document.createElement("p");
  showMoreButtonText.classList.add("show-more-button__text");
  showMoreButtonText.appendChild(document.createTextNode("Pokaż więcej"));
  showMoreButton.appendChild(showMoreButtonText);
  main.appendChild(showMoreButton);
}
let videosShown = 6;
async function showMore() {
  const main = document.getElementById("main");
  videosTable = await data(videosShown, videosShown + 6);
  for (x of videosTable) {
    main.appendChild(videoThumbnail(x));
  }
  vidToImg();
  if (videosShown > videosTableLength - 6) {
    videosShown = videosTableLength;
    document.getElementById("showMoreButton").remove();
  } else {
    videosShown += 6;
  }
}

async function searchPage(search) {
  const videopage = document.getElementById("video-player-container");
  if (videopage) {
    videopage.remove();
  }
  const oldmain = document.getElementById("main");
  if (oldmain) {
    oldmain.remove();
  }

  const main = document.createElement("div");
  main.classList.add("main");
  main.setAttribute("id", "main");

  document.body.appendChild(main);
  let value;
  if (search) {
    value = search;
  } else {
    value = document.getElementById("search-input").value.toLowerCase();
    document.location.href = '?search="' + value + '"';
  }

  const response = await fetch("./assets/data/videos.json");
  let videoData = await response.json();
  videoData = await videoData.sort((a, b) => {
    return b.id - a.id;
  });
  value = value.substring(1);
  value = value.slice(0, -1);
  videoData = await videoData.filter(
    (el) => el.name.includes(value) || el.text.includes(value)
  );
  console.warn(value);
  if (videoData.length != 0) {
    for (x of videoData) {
      main.appendChild(videoThumbnail(x));
    }
    vidToImg();
  } else {
    if (!document.getElementById("not-found")) {
      const container = document.createElement("div");
      container.classList.add("not-found");
      container.setAttribute("id", "not-found");

      const img = document.createElement("img");
      img.setAttribute("src", "assets/img/not-found.jpg");
      container.appendChild(img);

      const p = document.createElement("p");
      p.classList.add("not-found__text");
      const text = document.createTextNode("Kamracie, brak wyników");
      p.appendChild(text);
      container.appendChild(p);

      document.body.appendChild(container);
    }
  }
}

function vidToImg() {
  Array.prototype.map.call(
    document.querySelectorAll("img.video-thumbnail__video"),
    function (img) {
      let src = img.src;
      img.src = null;

      img.addEventListener("error", function () {
        let video = document.createElement("video");

        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        for (
          let imgAttr = img.attributes, len = imgAttr.length, i = 0;
          i < len;
          i++
        ) {
          video.setAttribute(imgAttr[i].name, imgAttr[i].value);
        }

        img.parentNode.insertBefore(video, img);
        img.parentNode.removeChild(img);
      });

      img.src = src;
    }
  );
}

import React from "react";
import * as THREE from "three";
import useStore from "./useStore";

const loadingManager = new THREE.LoadingManager();

let finalTimeout = null;
let lastPercent = 0;

function clearFinalTimeout() {
  if (finalTimeout) {
    clearTimeout(finalTimeout);
    finalTimeout = null;
  }
}

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  const percent = Math.round((itemsLoaded / itemsTotal) * 100);
  lastPercent = percent;

  setTimeout(() => useStore.getState().setLoadProgress(percent), 0);

  // console.log("onProgress", url, itemsLoaded, itemsTotal, percent);

  if (percent >= 100) {
    clearFinalTimeout();
    finalTimeout = setTimeout(() => {
      if (useStore.getState().loadProgress >= 100 || lastPercent >= 100) {
        setTimeout(() => useStore.getState().setSceneLoaded(true), 0);
      }
      clearFinalTimeout();
    }, 100);
  }
};

loadingManager.onLoad = () => {
  console.log("onLoad: manager finished current queue");
  setTimeout(() => useStore.getState().setLoadProgress(100), 0);
};

export default loadingManager;

//   const handleLoad = () => {
//     console.log("✅ Loading complete — setting sceneLoaded = true");
//   };

//   const handleProgress = (url, itemsLoaded, itemsTotal) => {
//     console.log(`Progress: ${itemsLoaded}/${itemsTotal} (${url})`);
//   };
//   console.log("added");
//   loadingManager.onLoad = handleLoad;
//   loadingManager.onProgress = handleProgress;

//   return () => {
//     // cleanup handlers
//     loadingManager.onLoad = null;
//     loadingManager.onProgress = null;
//   };

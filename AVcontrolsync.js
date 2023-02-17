"use strict";
var GLOBAL_VOLUME;
let mediaElements = [];

document.addEventListener("DOMContentLoaded", () => {

    mediaElements = Array.from(document.getElementsByTagName("audio"));
    mediaElements.push(...Array.from(document.getElementsByTagName("video")));
    mediaElements = mediaElements.filter((el) => {
        return el.controls;
    });

    console.log(`AVControlSync: Watching ${mediaElements.length} media elements`);
    mediaElements.forEach((el) => {
        el.addEventListener("volumechange", (e) => {
            updateGlobalVolume(e.target.volume);
        });
        el.addEventListener("play", (e) => {
            stopAllOtherMedia(e.target);
        });
    });

    const cookie = document.cookie;
    if (cookie) {
        const volume = JSON.parse(document.cookie).vol;
        updateGlobalVolume(volume);
    }
}
);

function stopAllOtherMedia(playingElement) {
    mediaElements.forEach((el) => {
        if (el === playingElement) {
            return;
        }
        el.pause();
    });
}

function updateGlobalVolume(newVolume) {
    GLOBAL_VOLUME = newVolume;
    mediaElements.forEach((el) => {
        el.volume = GLOBAL_VOLUME;
    });
    document.cookie = `{\"vol\":${GLOBAL_VOLUME}}; SameSite=None; Secure`;
}
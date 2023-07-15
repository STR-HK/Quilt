export function loadArrayFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem('music');
        if (data) {
          return JSON.parse(data);
        }
        return Array(6);
    } else {
        return Array(6);

    }
  
}

// export let music = loadArrayFromLocalStorage();

function saveArrayToLocalStorage(music) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('music', JSON.stringify(music));

    }
}

function prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
  }

export function addMusicToLocalStorage(music, musicId) {
    if (music.length >= 6) {
        music.pop();
    }
    music = prepend(musicId, music);
    // music.prepend(musicId);
    saveArrayToLocalStorage(music);
    return music;
}

export function removeMusicFromLocalStorage(music, musicId) {
    let newMusic = []
    music.forEach(storedId => {
        if (storedId !== musicId) newMusic.push(storedId)
        else newMusic.push(null)
    });
    saveArrayToLocalStorage(music);
    return newMusic
}

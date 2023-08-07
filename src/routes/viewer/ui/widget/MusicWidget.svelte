<script>
  // @ts-nocheck

  import {
    addMusicToLocalStorage,
    loadArrayFromLocalStorage,
    removeMusicFromLocalStorage,
  } from "./musicLocalStorage";
  import { fade, slide } from "svelte/transition";

  let audio = {
    play: () => {},
  };
  if (typeof Audio != "undefined") {
    audio = new Audio();
  }
  audio.preload = "metadata";

  let music = loadArrayFromLocalStorage();

  let playlistThumbnail = "";
  let playlistTitle = "제목";
  let playlistAuthorName = "작성자";
  let playlistTotalItems = "0 videos";

  let bIsPlaying = false;
  let bIsPaused = false;
  let bIsShuffled = false;
  let bIsLooped = false;
  let bIsOneLooped = false;
  let bIsStopped = true;

  function doPlay() {
    if (bIsPlaying) {
      bIsPlaying = false;
      bIsPaused = true;
    } else {
      bIsPlaying = true;
      bIsPaused = false;
      bIsStopped = false;
    }
    audio.play();
    setInterval(() => {
      playtimeCurrent = audio.currentTime;
    }, 1000);
  }
  function doPause() {
    if (bIsPaused) {
      bIsPaused = false;
      bIsPlaying = true;
    } else {
      bIsPaused = true;
      bIsPlaying = false;
    }
    audio.pause();
  }
  function doStop() {
    bIsStopped = true;
    bIsPlaying = false;
    bIsPaused = false;

    audio.pause();
    audio.currentTime = 0;
  }

  function doGoNext() {
    return new Promise((resolve, reject) => {
      if (playlistCurrent < playlistMax - 1) {
        doStop();
        playlistCurrent += 1;

        loadItem(playlistData[playlistCurrent])
          .then(() => {
            resolve();
          })
          .catch(() => {
            doGoNext().then(() => {
              resolve();
            });
          });
      } else {
        doStop();
        playlistCurrent = 0;
        loadItem(playlistData[playlistCurrent])
          .then(() => {
            resolve();
          })
          .catch(() => {
            doGoNext().then(() => {
              resolve();
            });
          });
      }
    });
  }
  function doGoPrev() {
    return new Promise((resolve, reject) => {
      if (playlistCurrent > 0) {
        doStop();
        playlistCurrent -= 1;

        loadItem(playlistData[playlistCurrent])
          .then(() => {
            resolve();
          })
          .catch(() => {
            doGoPrev().then(() => {
              resolve();
            });
          });
      } else {
        doStop();
        playlistCurrent = playlistMax - 1;
        loadItem(playlistData[playlistCurrent])
          .then(() => {
            resolve();
          })
          .catch(() => {
            doGoPrev().then(() => {
              resolve();
            });
          });
      }
    });
  }

  let playlistCurrent = 0;
  let playlistMax = 1;

  let playtimeCurrent = 0;
  let playtimeMax = 0;

  function toHumanTime(seconds) {
    let hours = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    let minutes = Math.floor((seconds - hours * 3600) / 60)
      .toString()
      .padStart(2, "0");
    let secs = Math.floor(seconds - hours * 3600 - minutes * 60)
      .toString()
      .padStart(2, "0");
    if (hours > 0) {
      return `${hours}:${minutes}:${secs}`;
    } else {
      return `${minutes}:${secs}`;
    }
  }

  audio.onTimeUpdate = () => {
    playtimeCurrent = audio.currentTime;
  };

  audio.onloadedmetadata = () => {
    playtimeMax = audio.duration;
  };

  audio.onended = () => {
    doGoNext().then(() => {
      doPlay();
    });
  };

  // 이벤트 리스너 테스트

  audio.onAbort = () => {
    console.log("onAbort");
  };

  audio.onError = () => {
    console.log("onError");
  };

  audio.onPause = () => {
    console.log("onPause");
  };

  audio.onVolumeChange = () => {
    console.log("onVolumeChange");
  };

  // 이벤트 리스너 테스트 종료 구간

  let playlistCurrentVideoName = "음원 제목";

  let playlistData = [
    {
      type: "PlaylistVideo",
      id: "h56nbajrx5w",
      index: {
        text: "1",
      },
      title: {
        runs: [
          {
            text: "[브금브금] 사이버펑크 '시스템에러' 다크테크노 인더스트리얼 하드 일렉트로 게임 트레일러 가상공간 전독시 배경음악 OST cyberpunk BGM",
            bold: false,
            italics: false,
            strikethrough: false,
          },
        ],
        text: "[브금브금] 사이버펑크 '시스템에러' 다크테크노 인더스트리얼 하드 일렉트로 게임 트레일러 가상공간 전독시 배경음악 OST cyberpunk BGM",
      },
      author: {
        id: "UCHrN-GVrYSdxeJS62GyMBaw",
        name: "브금브금 BGMBGM",
        thumbnails: [],
        endpoint: {
          type: "NavigationEndpoint",
          payload: {
            browseId: "UCHrN-GVrYSdxeJS62GyMBaw",
            canonicalBaseUrl: "/@bgmbgm1",
          },
          metadata: {
            url: "/@bgmbgm1",
            page_type: "WEB_PAGE_TYPE_CHANNEL",
            api_url: "browse",
          },
        },
        badges: [],
        is_moderator: false,
        is_verified: false,
        is_verified_artist: false,
        url: "https://www.youtube.com/@bgmbgm1",
      },
      thumbnails: [
        {
          url: "https://i.ytimg.com/vi/h56nbajrx5w/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB1AaAAuADigIMCAAQARhdIEcoZTAP&rs=AOn4CLAlDIv7rQR2cB2MJBfcabP8cLY6kA",
          width: 336,
          height: 188,
        },
        {
          url: "https://i.ytimg.com/vi/h56nbajrx5w/hqdefault.jpg?sqp=-oaymwE2CPYBEIoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB1AaAAuADigIMCAAQARhdIEcoZTAP&rs=AOn4CLC4XDhngDLDlALY7T0s7YyPvDjGXw",
          width: 246,
          height: 138,
        },
        {
          url: "https://i.ytimg.com/vi/h56nbajrx5w/hqdefault.jpg?sqp=-oaymwE1CMQBEG5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AHUBoAC4AOKAgwIABABGF0gRyhlMA8=&rs=AOn4CLAjfxUyf8eISRkPU8Bs_RC89OiVZA",
          width: 196,
          height: 110,
        },
        {
          url: "https://i.ytimg.com/vi/h56nbajrx5w/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AHUBoAC4AOKAgwIABABGF0gRyhlMA8=&rs=AOn4CLDaz7mON9HyugIofjwBdehLEJVUsQ",
          width: 168,
          height: 94,
        },
      ],
      thumbnail_overlays: [
        {
          type: "ThumbnailOverlayTimeStatus",
          text: "34:33",
          style: "DEFAULT",
        },
        {
          type: "ThumbnailOverlayNowPlaying",
          text: "Now playing",
        },
      ],
      endpoint: {
        type: "NavigationEndpoint",
        payload: {
          videoId: "h56nbajrx5w",
          playlistId: "PL51ZcnHEUhFAN9QCucQSE7faq4uPK4n57",
          index: 0,
          params: "OAI%3D",
          playerParams: "iAQB8AUB",
          loggingContext: {
            vssLoggingContext: {
              serializedContextData:
                "GiJQTDUxWmNuSEVVaEZBTjlRQ3VjUVNFN2ZhcTR1UEs0bjU3",
            },
          },
          watchEndpointSupportedOnesieConfig: {
            html5PlaybackOnesieConfig: {
              commonConfig: {
                url: "https://rr2---sn-ab02a0nfpgxapox-jioe.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=879ea76da8ebc79c&ip=112.151.179.200&initcwndbps=2426250&mt=1688816448&oweuc=&pxtags=Cg4KAnR4EggyNDU1NDA2Ng&rxtags=Cg4KAnR4EggyNDU1NDA2Mw%2CCg4KAnR4EggyNDU1NDA2Ng",
              },
            },
          },
        },
        metadata: {
          url: "/watch?v=h56nbajrx5w&list=PL51ZcnHEUhFAN9QCucQSE7faq4uPK4n57&index=1&pp=iAQB8AUB",
          page_type: "WEB_PAGE_TYPE_WATCH",
          api_url: "/player",
        },
      },
      is_playable: true,
      menu: {
        type: "Menu",
        items: [
          {
            type: "MenuServiceItem",
            text: "Add to queue",
            icon_type: "ADD_TO_QUEUE_TAIL",
            endpoint: {
              type: "NavigationEndpoint",
              payload: {
                signal: "CLIENT_SIGNAL",
                actions: [
                  {
                    clickTrackingParams:
                      "CNsBEP6YBBgGIhMIovmqtoX__wIV_wl7Bx3K5wBp",
                    addToPlaylistCommand: {
                      openMiniplayer: true,
                      videoId: "h56nbajrx5w",
                      listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
                      onCreateListCommand: {
                        clickTrackingParams:
                          "CNsBEP6YBBgGIhMIovmqtoX__wIV_wl7Bx3K5wBp",
                        commandMetadata: {
                          webCommandMetadata: {
                            sendPost: true,
                            apiUrl: "/youtubei/v1/playlist/create",
                          },
                        },
                        createPlaylistServiceEndpoint: {
                          videoIds: ["h56nbajrx5w"],
                          params: "CAQ%3D",
                        },
                      },
                      videoIds: ["h56nbajrx5w"],
                    },
                  },
                ],
              },
              metadata: {
                send_post: true,
              },
            },
          },
          {
            type: "MenuServiceItemDownload",
            has_separator: false,
            endpoint: {
              type: "NavigationEndpoint",
              payload: {
                videoId: "h56nbajrx5w",
                onAddCommand: {
                  clickTrackingParams:
                    "CNoBENGqBRgHIhMIovmqtoX__wIV_wl7Bx3K5wBp",
                  getDownloadActionCommand: {
                    videoId: "h56nbajrx5w",
                    params: "CAI%3D",
                  },
                },
              },
              metadata: {},
            },
          },
          {
            type: "MenuServiceItem",
            text: "Share",
            icon_type: "SHARE",
            endpoint: {
              type: "NavigationEndpoint",
              payload: {
                serializedShareEntity: "CgtoNTZuYmFqcng1dw%3D%3D",
                commands: [
                  {
                    clickTrackingParams:
                      "CNgBEMY0GAAiEwii-aq2hf__AhX_CXsHHcrnAGk=",
                    openPopupAction: {
                      popup: {
                        unifiedSharePanelRenderer: {
                          trackingParams:
                            "CNkBEI5iIhMIovmqtoX__wIV_wl7Bx3K5wBp",
                          showLoadingSpinner: true,
                        },
                      },
                      popupType: "DIALOG",
                      beReused: true,
                    },
                  },
                ],
              },
              metadata: {
                api_url: "share/get_share_panel",
                send_post: true,
              },
            },
          },
        ],
        top_level_buttons: [],
        label: "Action menu",
      },
      video_info: {
        runs: [
          {
            text: "19K views",
            bold: false,
            italics: false,
            strikethrough: false,
          },
          {
            text: " • ",
            bold: false,
            italics: false,
            strikethrough: false,
          },
          {
            text: "2 years ago",
            bold: false,
            italics: false,
            strikethrough: false,
          },
        ],
        text: "19K views • 2 years ago",
      },
      accessibility_label:
        "[브금브금] 사이버펑크 '시스템에러' 다크테크노 인더스트리얼 하드 일렉트로 게임 트레일러 가상공간 전독시 배경음악 OST cyberpunk BGM by 브금브금 BGMBGM 2 years ago 34 minutes 19,806 views",
      duration: {
        text: "34:33",
        seconds: 2073,
      },
    },
  ];

  let playlistCurrentItem = playlistData[0];

  // let pl =
  // "https://www.youtube.com/watch?v=h56nbajrx5w&list=PL51ZcnHEUhFAN9QCucQSE7faq4uPK4n57";
  // let pl =
  // "https://www.youtube.com/playlist?list=PLaMl2_KLT866jLWN01_NuOcovzfYoxrJY";

  // let pl =
  // "https://www.youtube.com/watch?v=l9XL5lFccq8&list=PLiyHrD1Lz34zv1RWtp1VV8MBK9w2SWGvC";
  // try {
  //   let audio = new Audio();
  // } catch (e) {}

  let pl =
    "https://www.youtube.com/watch?v=CO3nlhnsBBc&list=PLDvevvei7LEbvg1irIST5CLGl7kditVea";

  function loadItem(item) {
    return new Promise((resolve, reject) => {
      if (item) {
        fetch("http://asphodel.kro.kr:5173/viewer/api/yt/audio/play", {
          method: "POST",
          body: JSON.stringify({
            url: `https://www.youtube.com/watch?v=${item.id}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res === "") {
              reject();
            } else {
              audio.src = res;
              playlistCurrentVideoName = item.title.runs[0].text;
              playlistThumbnail = item.thumbnails[0].url;
              resolve(res);
            }
          });
      } else {
        playlistCurrentVideoName = "사용할 수 없는 음악";
        reject();
      }
    });
  }

  function fetchPost() {
    doStop();
    fetch("http://asphodel.kro.kr:5173/viewer/api/yt/playlist/items", {
      method: "POST",
      body: JSON.stringify({
        url: pl,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        playlistData = res;
        playlistCurrentItem = playlistData[0];
        loadItem(playlistCurrentItem);
      });

    return fetch("http://asphodel.kro.kr:5173/viewer/api/yt/playlist/info", {
      method: "POST",
      body: JSON.stringify({
        url: pl,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        let playlistInfo = res.info;
        playlistThumbnail = playlistInfo.thumbnails[0].url;
        playlistTitle = playlistInfo.title;
        playlistAuthorName = playlistInfo.author.name;
        playlistTotalItems = playlistInfo.total_items;
        playlistMax = parseInt(playlistTotalItems);
      });
  }

  function thumbnail(id) {
    return new Promise((resolve, reject) => {
      if (id && typeof window !== "undefined") {
        fetch("http://asphodel.kro.kr:5173/viewer/api/yt/playlist/info", {
          method: "POST",
          body: JSON.stringify({
            url: `https://www.youtube.com/playlist?list=${id}`,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res === "") {
              reject();
            } else {
              resolve(res);
            }
          });
      } else {
        reject();
      }
    });
  }

  let timingCnt = 0;
  function timing() {
    timingCnt += 1;
    return new Promise((resolve, reject) => {
      thumbnail("PLaMl2_KLT866jLWN01_NuOcovzfYoxrJY")
        .then((res) => {
          resolve(res);
        })
        .catch(() => {});
    });
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="widget widen text-xl flex-col flex items-center justify-center"
  style="padding: 0;"
>
  <div
    class="bg-[#E85C66] h-[57.5%] w-full flex flex-col px-[0.65rem] pt-[0.65rem] pb-[0.35rem] gap-[0.2rem] justify-between"
    style="border-top-left-radius: 0.675rem; border-top-right-radius: 0.675rem;"
  >
    <div class="flex flex-row items-center gap-[0.4rem] overflow-hidden">
      <button
        class="cursor-pointer thumbnail"
        on:click={() => {
          if (confirm("정말로 재생목록을 삭제하시겠습니까?")) {
            const listId = new URL(pl).searchParams.get("list");
            music = removeMusicFromLocalStorage(music, listId);

            playlistTitle = "제목";
            playlistAuthorName = "작성자";
            playlistCurrentVideoName = "음원 제목";
            playtimeCurrent = 0;
            playtimeMax = 0;
            playlistMax = 1;
            playlistCurrent = 0;
            playlistThumbnail = "";
            if (typeof audio !== "undefined") {
              audio.pause();
              audio.currentTime = 0;
              audio.src = "";
            }
          }
        }}
        style="border-radius: 0.375rem; background-color: #d44852; background-position: center; background-size: cover; background-image: url({playlistThumbnail});"
      />

      <div
        class="flex flex-col gap-[0.2rem] w-[100%] overflow-hidden"
        style="line-height: normal;"
      >
        <div class="flex flex-row items-end gap-[0.2rem]">
          <div
            class="text-[0.5rem] font-bold h-[0.55rem] max-w-[60%]"
            style="line-height: 0.55rem; overflow: hidden;"
          >
            {playlistTitle}
          </div>
          <div
            class="text-[0.45rem] font-semibold h-[0.5rem] max-w-[45%]"
            style="line-height: 0.5rem; overflow: hidden;"
          >
            ({playlistCurrent + 1} / {playlistMax})
          </div>
          <div
            class="text-[0.35rem] font-semibold max-w-[45%] h-[0.4rem] overflow-hidden"
            style="line-height: 0.4rem; "
          >
            {playlistAuthorName}
          </div>
        </div>
        <div
          class="text-[0.4rem] max-h-[1rem] overflow-hidden max-w-[100%]"
          style="line-height: 0.5rem;"
        >
          {playlistCurrentVideoName}
        </div>
      </div>
    </div>

    <div
      class="text-[0.5rem] font-bold flex gap-[0.2rem] h-fit w-full justify-center items-center"
    >
      <div class="playtooltip">{toHumanTime(playtimeCurrent)}</div>
      <button class="playtool" on:click={doGoPrev}>􀊍</button>
      {#if !bIsPlaying}
        <button class="playtool" on:click={doPlay}>􀊃</button>
      {:else}
        <button class="playtool" on:click={doPause}>􀊅</button>
      {/if}
      <button class="playtool" on:click={doStop}>􀛶</button>
      <!--{#if bIs}-->
      <!--<button class="playtool">􀊞</button>-->
      <!--  {:else if bIsOneLooped}-->

      <button class="playtool" on:click={doGoNext}>􀊏</button>
      <!--      <button class=playtool>􀊟</button>-->
      <!--      <button class=playtool>􀊝</button>-->
      <!--      <button class=playtool>􀣁</button>-->
      <div class="playtooltip">{toHumanTime(playtimeMax)}</div>
    </div>
  </div>

  <!-- svelte-ignore a11y-missing-attribute -->
  <div
    class="bg-[#D34748] h-[42.5%] w-full flex flex-row items-center pl-[0.65rem] gap-[0.4rem]"
    style="border-bottom-left-radius: 0.675rem; border-bottom-right-radius: 0.675rem;"
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    {#each music as musicId}
      {#if musicId}
        {#await thumbnail(musicId) then result}
          <button
            class="cover"
            style="background-image: url({result.info.thumbnails[0]
              .url}); background-position: center; background-size: cover;"
            transition:fade
            on:click={() => {
              pl = `https://www.youtube.com/playlist?list=${musicId}`;
              fetchPost();
            }}
            on:dblclick={() => {
              let playlistCodeInput = prompt(
                "재생목록 코드 배열을 입력해주세요."
              );
              playlistCodeInput = JSON.parse(playlistCodeInput);
              playlistCodeInput.forEach((playlistCode) => {
                music = addMusicToLocalStorage(music, playlistCode);
              });
            }}
          />
        {/await}
      {:else}
        {#await timing() then result}
          <button
            class="cover"
            transition:fade
            on:click={() => {
              let playlistUrlInput = prompt(
                "유튜브 재생목록 주소를 입력해주세요."
              );
              music = addMusicToLocalStorage(
                music,
                new URL(playlistUrlInput).searchParams.get("list")
              );
            }}
          >
            +
          </button>
        {/await}
      {/if}
    {/each}
  </div>
</div>

<style>
  .thumbnail {
    border-radius: 0.675rem;
    width: 1.75rem;
    height: 1.75rem;
    min-width: 1.75rem;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    font-size: 0.7rem;
  }
  .playtool {
    /*background-color: #4F46E5;*/
    border-radius: 0.2rem;
    padding: 0.2rem;
    width: 1rem;
    height: 1rem;
    line-height: normal;
    font-family: "SF Pro";
    font-weight: 550;
  }
  .playtooltip {
    /* background-color: #4f46e5; */
    border-radius: 0.2rem;
    padding: 0.2rem;
    padding-top: 0.28rem;
    /* height: 1rem; */
    width: fit-content;
    line-height: 0.3rem;
    font-size: 0.3rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .playtool:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .playtool:active {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .cover {
    background-color: #bd3030;
    width: 1.92rem;
    aspect-ratio: 1;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    font-size: 0.75rem;

    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
</style>

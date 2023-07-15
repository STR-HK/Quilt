<script>
  import { blur, fade } from "svelte/transition";

  // @ts-nocheck

  import { data, colorSet } from "../data.js";
  import NotifyTime from "./ui/NotifyTime.svelte";
  import SearchModal from "./ui/SearchModal.svelte";
  import StatusBar from "./ui/StatusBar.svelte";
  import DdayWidget from "./ui/widget/DdayWidget.svelte";
  import GalleryWidget from "./ui/widget/GalleryWidget.svelte";
  import MusicWidget from "./ui/widget/MusicWidget.svelte";
  import ViewerWidget from "./ui/widget/ViewerWidget.svelte";
  import WeatherWidget from "./ui/widget/WeatherWidget.svelte";

  function prepend(value, array) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
  }
  let modifiedData = prepend(
    ["시작", "0840", "0840", colorSet.lu],
    JSON.parse(JSON.stringify(data))
  );
  modifiedData.push(["종료", "2237", "2238", colorSet.dn]);

  let digit = "0000";
  let time = new Date();

  function calculate() {
    newData = getNext();
    futureData = getFuture();
    leftCount = getLeftCount();
    renderDateTime();
    if (notifyOn) {
      if (newData?.data) {
        if (newData?.data[1] === digit) {
          if (ignoreNotify !== digit) {
            notifyTarget = newData.data[0];
            if (typeof Audio != "undefined") {
              visible = true;
              setTimeout(() => {
                visible = false;
              }, 1000 * 60);
              let audio = new Audio("/src/lib/sounds/sms-received1.ogg");
              audio
                .play()
                .then(() => {
                  // console.log("played");
                })
                .catch((e) => {
                  // console.log(e);
                });
            }
          }
        }
      }
    }
    if (updateOn) {
      if (newData?.data) {
        if (newData?.data[1] === digit) {
          if (ignoreUpdate !== digit) {
            updateSignal();
            // setTimeout(() => {
            // updateSignal = !updateSignal;
            // }, 1000 * 61);
            ignoreUpdate = digit;
            setTimeout(() => {
              ignoreUpdate = NaN;
            }, 1000 * 60 * 2);
          }
        }
      }
    }
  }

  let newData = { data: [] };
  let futureData = { data: [] };
  let leftCount = 22;

  let renderedDate = "6월 10일 토요일";
  let renderedTime = "09:41";
  let renderedYear = "2023년";
  let renderedMonth = "11월";
  let renderedDay = "25일";
  let renderedDayNumber = "25";
  let renderedDayOfWeek = "수요일";

  let notifyOn = false;
  let updateOn = false;
  let updateSignal = false;
  let ignoreUpdate = NaN;
  let ignoreNotify = NaN;
  let notifyTarget = "과목";

  function renderDateTime() {
    let date = new Date();
    date = time;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    renderedYear = date.toLocaleDateString("ko-KR", { year: "numeric" });
    renderedMonth = date.toLocaleDateString("ko-KR", { month: "long" });
    renderedDay = date.toLocaleDateString("ko-KR", { day: "numeric" });
    renderedDayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "long" });
    renderedDayNumber = date.getDate().toString();

    renderedDate =
      month +
      "월 " +
      day +
      "일 " +
      date.toLocaleDateString("ko-KR", { weekday: "long" });
    renderedTime =
      hour.toString().padStart(2, "0") +
      ":" +
      minute.toString().padStart(2, "0");
    //

    // +
    // ":" +
    // date.getSeconds().toString().padStart(2, "0");
  }

  function getNext() {
    for (let i = 0; i < modifiedData.length; i++) {
      if (parseInt(modifiedData[i][2]) > parseInt(digit)) {
        return { data: modifiedData[i] };
      }
    }
    return {};
  }
  function getFuture() {
    for (let i = 0; i < modifiedData.length; i++) {
      if (parseInt(modifiedData[i][2]) > parseInt(digit)) {
        return { data: modifiedData[i + 1] };
      }
    }
    return {};
  }
  function getLeftCount() {
    for (let i = 0; i < modifiedData.length; i++) {
      if (parseInt(modifiedData[i][2]) > parseInt(digit)) {
        return modifiedData.length - i - 2;
      }
    }
    return 0;
  }

  // 기본 업데이터 함수부
  //
  function update() {
    digit =
      new Date().getHours().toString().padStart(2, "0") +
      new Date().getMinutes().toString().padStart(2, "0");
    time = new Date();
    calculate();
  }
  setInterval(update, 1000);
  update();
  //
  // \기본 업데이터 함수부

  let showModal = false;

  let visible = false;

  if (typeof localStorage === "object") {
    function loadNotify() {
      if (localStorage.getItem("notifyOn") == "true") {
        notifyOn = true;
      } else {
        notifyOn = false;
      }
    }

    function loadUpdate() {
      if (localStorage.getItem("updateOn") == "true") {
        updateOn = true;
      } else {
        updateOn = false;
      }
    }

    loadNotify();
    loadUpdate();
  }

  // time = new Date("2023-07-07 08:39:57");
  // function devUpdate() {
  //   digit =
  //     time.getHours().toString().padStart(2, "0") +
  //     time.getMinutes().toString().padStart(2, "0");
  //   time.setSeconds(time.getSeconds() + 1);
  //   calculate();
  // }
  // setInterval(devUpdate, 1000);
  // devUpdate();

  // time = new Date("2023-07-07 07:36:50");
  // setInterval(() => {
  //   time.setMinutes(time.getMinutes() + 1);
  //   digit =
  //     time.getHours().toString().padStart(2, "0") +
  //     time.getMinutes().toString().padStart(2, "0");
  //   // 처리부
  //   calculate();
  // }, 50);

  import redWinter from "$lib/images/winter/230616-aespa-Winter-Lotte-Duty-Free-Family-Concert-documents-3.jpeg.jpg";
  import flowerWinter from "$lib/images/winter/20230220_234955.jpg";
  import profileWinter from "$lib/images/profile.gif";
  import boomerangWinter from "$lib/images/boomerang.gif";
  import CheckWidget from "./ui/widget/CheckWidget.svelte";
  import CheckWidgetFrame from "./ui/widget/CheckWidgetFrame.svelte";
  import { onMount } from "svelte";
  import StatusWidget from "./ui/widget/StatusWidget.svelte";
  import CalendarWidget from "./ui/widget/CalendarWidget.svelte";

  let booted = false;

  let splashScreen = true;
  let mainScreen = true;

  let renderMainScreen = false;
  let mainScreenRenderUpdater = () => {
    renderMainScreen = !renderMainScreen;
  };
  let splashScreenUpdater = () => {
    splashScreen = !splashScreen;
  };

  export function loadCheck() {
    fetch("http://asphodel.kro.kr:5173/viewer/api/check/register", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        for (let nameCount = 0; nameCount < checkName.length; nameCount++) {
          let success = false;
          res.forEach((element) => {
            if (element.name === checkName[nameCount]) {
              checkStatus[nameCount] = true;
              checkTime[nameCount] = element.time;
              success = true;
            }
          });
          if (!success) {
            checkStatus[nameCount] = false;
            checkTime[nameCount] = "-";
          }
        }
      })
      .catch((e) => {
        for (let nameCount = 0; nameCount < checkName.length; nameCount++) {
          checkStatus[nameCount] = false;
          checkTime[nameCount] = "-";
        }
      });
  }

  setInterval(loadCheck, 1000 * 5);

  let checkStatus = [true, true];
  let checkTime = ["8:21", "7:10"];
  let checkName = ["SEO", "LEE"];

  // onMount(() => {
  //   splashScreen = false;
  //   mainScreen = false;
  //   renderMainScreen = true;
  //   setTimeout(() => {
  //     mainScreen = true;
  //   }, 400);
  // });
  loadCheck();
</script>

<!-- style="background-image: url({profileWinter}); background-position: -33px -9px; background-size: 200%; background-repeat: no-repeat; border-radius: 50%;" -->

{#if splashScreen}
  <div
    class="w-full min-h-full h-[100vh] flex flex-col justify-center items-center gap-[0.3rem]"
    transition:blur
  >
    <div
      style="background-image: url({boomerangWinter}); background-position: center; background-size: 125%; background-repeat: no-repeat; border-radius: 50%;"
      class="w-[5rem] h-[5rem] cursor-pointer"
      on:click={() => {
        splashScreen = false;
        mainScreen = false;
        renderMainScreen = true;
        setTimeout(() => {
          mainScreen = true;
        }, 400);
      }}
    />
    <div class="text-white text-[1rem]" style="font-display: swap;">
      Quilter
    </div>
  </div>
{/if}

{#if mainScreen}
  <div
    class="w-full min-h-full h-full"
    transition:blur
    style="display: {renderMainScreen ? 'block' : 'none'};"
  >
    <StatusBar
      {renderedDate}
      {renderedTime}
      bind:showModal
      bind:splashScreen
      bind:mainScreen
      bind:renderMainScreen
      {mainScreenRenderUpdater}
      {splashScreenUpdater}
    />

    <SearchModal bind:showModal />

    <div class="flex flex-row h-full flex-wrap justify-between">
      <!-- 좌파트 -->
      <div
        class="p-[0.75rem] flex justify-start gap-[0.75rem] h-full min-w-[calc(7rem*4+0.75rem*3)] w-[calc(7rem*4+0.75rem*3)]"
      >
        <GalleryWidget bind:updateOn bind:updateSignal />
        <div class="flex flex-row gap-[0.75rem] flex-wrap">
          <WeatherWidget />
          <CalendarWidget />

          <CheckWidgetFrame>
            <!-- <StatusWidget /> -->
            <CheckWidget
              bind:status={checkStatus[0]}
              bind:name={checkName[0]}
              bind:time={checkTime[0]}
              {loadCheck}
            />
            <CheckWidget
              bind:status={checkStatus[1]}
              bind:name={checkName[1]}
              bind:time={checkTime[1]}
              {loadCheck}
            />
            <!-- <CheckWidget /> -->
            <!-- <CheckWidget /> -->
          </CheckWidgetFrame>
        </div>
      </div>

      <!-- 우파트 -->
      <div
        class="p-[0.75rem] flex justify-end gap-[0.75rem] min-w-[calc(7rem*2+0.75rem*3)] w-[calc(7rem*2+0.75rem*3)] flex-wrap"
      >
        <div class="flex justify-end gap-[0.75rem] flex-wrap">
          <!-- 디데이 위젯 -->
          <DdayWidget />

          <ViewerWidget
            {renderedYear}
            {renderedMonth}
            {renderedDayOfWeek}
            {renderedDayNumber}
            {digit}
            {newData}
            {futureData}
            {leftCount}
            bind:notifyOn
            bind:updateOn
          />

          <!-- 음악 위젯 -->
          <MusicWidget />
        </div>
        <div class="flex flex-wrap gap-[0.75rem]">
          <NotifyTime bind:ignoreNotify bind:visible {notifyTarget} {digit} />
        </div>
      </div>
    </div>
  </div>
{/if}

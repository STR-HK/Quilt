<script>
  import { onMount } from "svelte";
  import { data } from "../../../data";

  onMount(() => {});

  function prepareWidgets() {
    return new Promise((resolve, reject) => {
      fetch(`${location.origin}/viewer/api/ypt`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          let ms = res.ms;
          //   playedTime = ms[0].dl.sm;
          resolve(ms);
        })
        .catch((e) => {
          console.error("[LOAD GEO] /geo/1.0/direct", e);
          reject(e);
        });
    });
  }
  function deltaDigit(start = "0700", end = "0800") {
    let startHour = parseInt(start.slice(0, 2));
    let startMin = parseInt(start.slice(2, 4));
    let endHour = parseInt(end.slice(0, 2));
    let endMin = parseInt(end.slice(2, 4));

    let deltaHour = endHour - startHour;
    let deltaMin = endMin - startMin;

    while (deltaMin < 0) {
      deltaHour -= 1;
      deltaMin += 60;
    }

    return (
      deltaHour.toString().padStart(2, "0") +
      deltaMin.toString().padStart(2, "0")
    );
  }
  function addDigit(start = "0100", end = "0200") {
    let startHour = parseInt(start.slice(0, 2));
    let startMin = parseInt(start.slice(2, 4));
    let endHour = parseInt(end.slice(0, 2));
    let endMin = parseInt(end.slice(2, 4));

    let deltaHour = endHour + startHour;
    let deltaMin = endMin + startMin;

    while (deltaMin >= 60) {
      deltaHour += 1;
      deltaMin -= 60;
    }

    return (
      deltaHour.toString().padStart(2, "0") +
      deltaMin.toString().padStart(2, "0")
    );
  }

  function digitToMinutes(digit) {
    if (digit) {
      return parseInt(digit.slice(0, 2)) * 60 + parseInt(digit.slice(2, 4));
    } else {
      return 0;
    }
  }

  function getLossByPlayedTime(playedTime) {
    console.warn("");
    let absoluteTime = new Date();
    // let absoluteTime = new Date("2023-08-02 10:40:00.000000+09:00");
    let realTime = deltaDigit(
      "0840",
      absoluteTime.getHours().toString().padStart(2, "0") +
        absoluteTime.getMinutes().toString().padStart(2, "0")
    );
    console.log(
      absoluteTime.getHours().toString().padStart(2, "0") +
        absoluteTime.getMinutes().toString().padStart(2, "0")
    );
    console.log("실제경과시간:" + realTime + "시간과분");

    let falsedDelta = ["0015"];
    let falsedTotal = "0000";

    data.forEach((d) => {
      let startTimeCode = d[1];
      let currentTimeCode =
        absoluteTime.getHours().toString().padStart(2, "0") +
        absoluteTime.getMinutes().toString().padStart(2, "0");
      let endTimeCode = d[2];
      if (currentTimeCode >= endTimeCode) {
        if (d[4] == false) {
          let falsedStart = d[1];
          let falsedEnd = d[2];
          falsedDelta.push(deltaDigit(falsedStart, falsedEnd));
        }
      }
      if (startTimeCode <= currentTimeCode && currentTimeCode <= endTimeCode) {
        if (d[4] == false) {
          falsedDelta.push(deltaDigit(d[1], currentTimeCode));
        }
      }
    });
    if (falsedDelta.length > 1) {
      falsedTotal = falsedDelta.reduce((a, b) => {
        console.log(
          a.toString().padStart(4, "0"),
          b.toString().padStart(4, "0")
        );
        return addDigit(
          a.toString().padStart(4, "0"),
          b.toString().padStart(4, "0")
        );
      }, 0);
    } else {
      falsedTotal = falsedDelta[0];
    }
    console.log("허용쉬는시간:" + falsedTotal + "시간과분");

    let pureRealime = deltaDigit(falsedTotal, realTime);

    console.log("순공경과시간:" + pureRealime + "시간과분");

    let yptTime =
      Math.floor(playedTime / 1000 / 60 / 60)
        .toString()
        .padStart(2, "0") +
      Math.floor((playedTime / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");

    console.log("열품경과시간:" + yptTime + "시간과분");

    console.log(
      "열품손실시간:" + deltaDigit(yptTime, pureRealime) + "시간과분"
    );

    return deltaDigit(yptTime, pureRealime);
  }
  let renderedYPT = [];
  let renderedHRS = [];
  let renderedLOSS = [];
  onMount(() => {
    setInterval(() => {
      fetch(`${location.origin}/viewer/api/ypt`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          let ms = res.ms;
          for (let i = 0; i < ms.length; i++) {
            if (ms[i].dl) {
              renderedYPT[i] = ms[i].n;
              renderedHRS[i] = ms[i].dl.sm;
              //   renderedHRS[i] = 1 * 1000 * 60 * 60;
              renderedLOSS[i] = getLossByPlayedTime(renderedHRS[i]);
              renderedLOSS[i] = renderedLOSS[i] > 0 ? renderedLOSS[i] : "0000";
            }
          }
        })
        .catch((e) => {
          console.error("[LOAD GEO] /geo/1.0/direct", e);
          reject(e);
        });
    }, 5 * 1000);
  });
</script>

{#await prepareWidgets() then ms}
  {#each ms as m, n}
    {#if m.dl}
      <div
        class="widget text-xl flex-col flex items-start justify-center gap-[0.2rem] cursor-pointer"
      >
        <div
          class="w-[2.5rem] h-[2.5rem] bg-[#de3552] flex items-center justify-center"
          style="border-radius: 50%; margin-bottom: 0.2rem;"
        >
          <div
            class="w-[2rem] h-[2rem] flex items-center justify-center"
            style="border-radius: 50%; background-color: #1b1b1d;"
          >
            <div
              class="w-[1.8rem] h-[1.8rem] bg-[#bbfd55] flex items-center justify-center"
              style="border-radius: 50%;"
            >
              <div
                class="w-[1.3rem] h-[1.3rem] flex items-center justify-center"
                style="border-radius: 50%; background-color: #1b1b1d;"
              >
                <div
                  class="w-[1.1rem] h-[1.1rem] bg-[#75e4e8] flex items-center justify-center"
                  style="border-radius: 50%;"
                >
                  <div
                    class="w-[0.5rem] h-[0.5rem] flex items-center justify-center"
                    style="border-radius: 50%; background-color: #1b1b1d;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="text-[0.7rem] font-black text-[#de3552]"
          style="line-height: 0.75rem; letter-spacing: 0.05rem"
        >
          {digitToMinutes(renderedLOSS[n])}/98LOSS
        </div>
        <div
          class="text-[0.7rem] font-black text-[#bbfd55]"
          style="line-height: 0.75rem; letter-spacing: 0.05rem"
        >
          {Math.floor(renderedHRS[n] / (1000 * 60 * 60))}/{43200000 /
            (1000 * 60 * 60)}HRS
        </div>
        <div
          class="text-[0.7rem] font-black text-[#75e4e8]"
          style="line-height: 0.75rem; letter-spacing: 0.05rem; height: 0.75rem; overflow: hidden;"
        >
          {renderedYPT[n]}YPT
        </div>
      </div>
    {:else}
      <div
        class="widget text-xl flex-col flex items-center justify-center gap-[0.2rem] cursor-pointer"
      />
    {/if}
  {/each}
{/await}

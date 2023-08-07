<script>
  import { data } from "../../../data";

  let timings = [];
  function createTiming(start, end) {
    let startInfo = {
      hour: start.slice(0, 2),
      minute: start.slice(2, 4),
      full: start,
    };
    let endInfo = {
      hour: end.slice(0, 2),
      minute: end.slice(2, 4),
      full: end,
    };
    let timing = {
      start: startInfo,
      end: endInfo,
    };
    return timing;
  }
  data.forEach((datum) => {
    let timing = createTiming(datum[1], datum[2]);
    timing.origin = datum;
    registerTiming(timing);
  });

  function registerTiming(timing) {
    timings.push(timing);
    calculateTiming();
  }

  function calculateTiming() {
    let calculatedTimings = [];
    let tagedWithStartTime = {};
    let ascendingTimings = [];
    timings.forEach((timing) => {
      tagedWithStartTime[timing.start.full] = timing;
    });
    Object.keys(tagedWithStartTime)
      .sort()
      .forEach((key) => {
        ascendingTimings.push(tagedWithStartTime[key]);
      });

    function processFirst(ascendingTimings) {
      if (ascendingTimings[0].start.full !== "0000") {
        let interpolated = createTiming("0000", ascendingTimings[0].start.full);
        interpolated.origin = [""];
        calculatedTimings.push(interpolated);
      }
    }
    function processLast(ascendingTimings) {
      if (ascendingTimings[ascendingTimings.length - 1].end.full !== "2359") {
        let interpolated = createTiming(
          ascendingTimings[ascendingTimings.length - 1].end.full,
          "2359"
        );
        interpolated.origin = [""];
        calculatedTimings.push(interpolated);
      }
    }
    function process(ascendingTimings) {
      for (let i = 0; i < ascendingTimings.length; i++) {
        let current = ascendingTimings[i];
        let previous = ascendingTimings[i - 1];
        if (previous) {
          if (current.start.full !== previous.end.full) {
            let interpolated = createTiming(
              previous.end.full,
              current.start.full
            );
            // interpolated.type = 'interpolated'
            calculatedTimings.push(interpolated);
          }
        }
        calculatedTimings.push(current);
      }
    }

    processFirst(ascendingTimings);
    process(ascendingTimings);
    processLast(ascendingTimings);

    return calculatedTimings;
  }

  function breakByHour() {
    let calculatedTimings = calculateTiming();
    let breakedTimings = [];

    calculatedTimings.forEach((calculatedTiming) => {
      let startHour = calculatedTiming.start.hour;
      let endHour = calculatedTiming.end.hour;

      if (startHour !== endHour) {
        let delta = parseInt(endHour) - parseInt(startHour) + 1;

        let firstTiming = createTiming(
          calculatedTiming.start.full,
          calculatedTiming.start.hour + "59"
        );
        firstTiming.origin = calculatedTiming.origin;
        breakedTimings.push(firstTiming);

        for (let i = 0; i < delta - 2; i++) {
          let middleTiming = createTiming(
            (parseInt(startHour) + i + 1).toString().padStart(2, "0") + "00",
            (parseInt(startHour) + i + 1).toString().padStart(2, "0") + "59"
          );
          middleTiming.origin = calculatedTiming.origin;
          breakedTimings.push(middleTiming);
        }

        let lastTiming = createTiming(
          calculatedTiming.end.hour + "00",
          calculatedTiming.end.full
        );
        lastTiming.origin = calculatedTiming.origin;
        breakedTimings.push(lastTiming);
      } else {
        let oneTiming = calculatedTiming;
        oneTiming.one = true;
        breakedTimings.push(oneTiming);
      }
    });
    return breakedTimings;
  }

  function reorderBroken() {
    let broken = breakByHour();
    let orderingFirstPart = [];
    let orderingSecondPart = [];
    let reordered = [];
    broken.forEach((broken_item) => {
      if (parseInt(broken_item.start.hour) < 7) {
        orderingFirstPart.push(broken_item);
      } else {
        orderingSecondPart.push(broken_item);
      }
    });
    reordered = [
      ...orderingSecondPart,
      // ...orderingFirstPart,
    ];

    return reordered;
  }

  function getCounted() {
    let counted = [];

    let reordered = reorderBroken();

    reordered.forEach((item) => {
      counted[item.start.hour] = counted[item.start.hour]
        ? counted[item.start.hour] + 1
        : 1;
    });
    return counted;
  }

  let oneWidth = 5;
  let lineHeight = oneWidth * 3.18;

  let gap = 3;

  function getBlockWidth(timing) {
    return (
      (timing.end.minute -
        timing.start.minute +
        (1 / 60) * (timing.end.minute - timing.start.minute)) *
      oneWidth
    );
  }

  let fullHeight = lineHeight * 17 + lineHeight / 2;

  let currentTime = new Date();
  setInterval(() => {
    currentTime = new Date();
  }, 1000);

  // let t = 0;
  // let newTime = new Date("2023-07-24 08:30:10");
  // setInterval(() => {
  //   newTime.setSeconds(newTime.getSeconds() + t);
  //   t += 1;
  //   currentTime = new Date(
  //     "2023-07-24 " +
  //       newTime.getHours() +
  //       ":" +
  //       newTime.getMinutes() +
  //       ":" +
  //       newTime.getSeconds()
  //   );
  // }, 100);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
  class="widget widen hiden cursor-pointer bg-[#1c1c1e]"
  style="padding: 0; font-size: 13px;"
>
  <div class="p-[1em]">
    <!-- <div class="text-white p-3 font-bold text-xl">2023년도 여름방학 계획</div> -->
    <div class="flex gap-[3px]">
      <div class=" flex flex-col w-fit text-[#9E9E9E] justify-around gap-[3px]">
        {#each Array(17) as _, idx}
          <button
            class="flex items-center justify-center bg-[#2b2b2d] text-[0.8em]"
            style="height: {lineHeight}px; width: {lineHeight}px; border-radius: 0.4em ;"
          >
            {#if idx + 7 > 23}
              <h2 class="font-bold">{idx - 17}시</h2>
            {:else}
              <h2 class="font-bold">{idx + 7}시</h2>
            {/if}
          </button>
        {/each}
      </div>
      <div
        class="flex flex-wrap flex-row content-around gap-[3px] justify-center"
        style="width: {oneWidth * 60 + 1 + 9}px; height: {fullHeight +
          17 * 3}px;"
      >
        {#each reorderBroken() as timing}
          {#if getBlockWidth(timing) > 0}
            <button
              class="items-center justify-center flex {timing.one
                ? 'flex-col'
                : 'flex-row'}"
              style="
                          width: {getBlockWidth(timing) +
                (gap * (3 - getCounted()[timing.start.hour])) /
                  getCounted()[timing.start.hour]}px;
                          height: {lineHeight}px;
                          max-height: {lineHeight}px;
                background-color: #2b2b2d;
                border: {currentTime.getHours() >=
                parseInt(timing.start.hour) &&
              currentTime.getHours() <= parseInt(timing.end.hour) &&
              currentTime.getMinutes() >= parseInt(timing.start.minute) &&
              currentTime.getMinutes() <= parseInt(timing.end.minute)
                ? '1px'
                : '0px'} dashed #777777;
                border-radius: 0.5em ;
                      "
            >
              {#if timing.one}
                <h1
                  class="text"
                  style="font-size: 0.5em; color: {timing.origin[3]
                    ? timing.origin[3]
                    : '#2b2b2d'};"
                >
                  {timing.origin ? timing.origin[0] : ""}
                </h1>
              {/if}

              {#if !(timing.end.minute === "59")}
                {#if timing.one}
                  <h2
                    class="text"
                    style="font-size: 0.4em; color: {timing.origin[3]
                      ? timing.origin[3]
                      : '#2b2b2d'};"
                  >
                    {parseInt(timing.end.minute).toString()}분
                  </h2>
                {:else if getBlockWidth(timing) < 30}
                  <h2
                    class="text"
                    style="font-size: 0.4em; color: {timing.origin[3]
                      ? timing.origin[3]
                      : '#2b2b2d'};"
                  >
                    {parseInt(timing.end.minute).toString()}분
                  </h2>
                {:else}
                  <h2
                    class="text"
                    style="color: {timing.origin[3]
                      ? timing.origin[3]
                      : '#2b2b2d'};"
                  >
                    {parseInt(timing.end.minute).toString()}분
                  </h2>
                {/if}
              {:else}
                <h1
                  class="text"
                  style="font-size: {getBlockWidth(timing) < 60
                    ? '0.4em'
                    : ''}; color: {timing.origin[3]
                    ? timing.origin[3]
                    : '#2b2b2d'};"
                >
                  {timing.origin[0]}
                </h1>
              {/if}
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <style>
    div {
      box-sizing: border-box;
    }
    h1 {
      /*color: black;*/
      font-weight: bold;
      font-size: 0.7em;
    }
    h2 {
      /*color: black;*/
      text-align: center;
      font-size: 0.6em;
    }
  </style>
</div>

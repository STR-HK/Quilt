<script>
  import { data } from "./data.js";

  console.clear();
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

  let oneWidth = 5;
  let lineHeight = oneWidth * 7;

  function getBlockWidth(timing) {
    return (
      (timing.end.minute -
        timing.start.minute +
        (1 / 60) * (timing.end.minute - timing.start.minute)) *
      oneWidth
    );
  }

  let fullHeight = lineHeight * 17 + lineHeight / 2;
</script>

<div class="p-[1rem]">
  <div class="text-white p-3 font-bold text-xl">2023년도 여름방학 계획</div>
  <div class="flex">
    <div
      class="bg-[#272728] flex flex-col w-fit text-[#9E9E9E] justify-around border-x-[1px] border-x-[#272728]"
    >
      {#each Array(17) as _, idx}
        <div
          class="flex items-center justify-center bg-black"
          style="height: {lineHeight}px; width: {lineHeight}px;"
        >
          {#if idx + 7 > 23}
            <h2 class="font-bold">{idx - 17}시</h2>
          {:else}
            <h2 class="font-bold">{idx + 7}시</h2>
          {/if}
        </div>
      {/each}
    </div>
    <div
      class="bg-[#272728] flex flex-wrap flex-row content-around border-r-[0.1px] border-r-[#272728]"
      style="width: {oneWidth * 60 + 1}px; height: {fullHeight}px;"
    >
      {#each reorderBroken() as timing}
        {#if getBlockWidth(timing) > 0}
          <div
            class="items-center justify-center {getBlockWidth(timing) < 60
              ? 'p-0'
              : 'p-2'} flex {timing.one ? 'flex-col' : 'flex-row'}"
            style="
                    width: {getBlockWidth(timing)}px;
                    height: {lineHeight}px;
                    background-color: {timing.origin[3]
              ? timing.origin[3]
              : '#000000'};
                "
          >
            {#if timing.one}
              <h1 class="text" style="font-size: 0.55rem">
                {timing.origin ? timing.origin[0] : ""}
              </h1>
            {/if}

            {#if !(timing.end.minute === "59")}
              {#if timing.one}
                <h2 class="text" style="font-size: 0.5rem;">
                  {parseInt(timing.end.minute).toString()}분
                </h2>
              {:else if getBlockWidth(timing) < 30}
                <h2 class="text" style="font-size: 0.5rem">
                  {parseInt(timing.end.minute).toString()}분
                </h2>
              {:else}
                <h2 class="text">{parseInt(timing.end.minute).toString()}분</h2>
              {/if}
            {:else}
              <h1
                class="text"
                style="font-size: {getBlockWidth(timing) < 60 ? '0.4rem' : ''}"
              >
                {timing.origin[0]}
              </h1>
            {/if}
          </div>
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
    font-size: 0.7rem;
  }
  h2 {
    /*color: black;*/
    text-align: center;
    font-size: 0.6rem;
  }
</style>

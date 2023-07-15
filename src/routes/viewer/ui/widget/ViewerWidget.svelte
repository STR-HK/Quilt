<script>
  // @ts-nocheck

  export let renderedYear;
  export let renderedMonth;
  export let renderedDayOfWeek;
  export let renderedDayNumber;
  export let digit;
  export let newData;
  export let futureData;
  export let leftCount;
  export let notifyOn;
  export let updateOn;

  export function deltaDigit(start = "0700", end = "0800") {
    let startHour = parseInt(start.slice(0, 2));
    let startMin = parseInt(start.slice(2, 4));
    let endHour = parseInt(end.slice(0, 2));
    let endMin = parseInt(end.slice(2, 4));

    let deltaHour = endHour - startHour;
    let deltaMin = endMin - startMin;

    if (deltaMin < 0) {
      deltaHour -= 1;
      deltaMin += 60;
    }

    return (
      deltaHour.toString().padStart(2, "0") +
      deltaMin.toString().padStart(2, "0")
    );
  }

  export function digit2Human(digit) {
    if (parseInt(digit.slice(0, 2)) > 0) {
      return (
        parseInt(digit.slice(0, 2)).toString() +
        "시간 " +
        parseInt(digit.slice(2, 4)).toString() +
        "분"
      );
    } else {
      return parseInt(digit.slice(2, 4)).toString() + "분";
    }
  }

  function storeNotify() {
    localStorage.setItem("notifyOn", notifyOn);
  }

  function storeUpdate() {
    localStorage.setItem("updateOn", updateOn);
  }

  let notifyOnIcon = "􀋙";
  let notifyOffIcon = "􀋝";

  let updateOnIcon = "􀽰";
  let updateOffIcon = "􀽲";
</script>

<div class="widget">
  <div class="flex flex-col gap-[0.3rem]">
    <div class="flex flex-row justify-end">
      <div
        class="flex flex-row gap-[0.3rem] items-end leading-tight justify-end"
      >
        <div class="flex flex-col items-end">
          <div class="text-[0.5rem] leading-tight">
            {renderedYear}
            {renderedMonth}
          </div>
          <div class="text-[0.49rem] text-[#FFFFFF99]">
            {renderedDayOfWeek}
          </div>
        </div>
        <div
          class="text-[1.75rem] font-bold text-[#FFFFFFCC]"
          style="line-height: 1.5rem;"
        >
          {renderedDayNumber}
        </div>
      </div>
    </div>

    {#if newData?.data}
      <div class="flex flex-row gap-[0.3rem]">
        <div
          class="bg-neutral-300 w-[0.16rem] h-[1.4rem] rounded"
          style="background-color: {newData?.data[3]};"
        />
        <div class="flex flex-col">
          <div
            class="text-[0.5rem] font-semibold"
            style="content: {newData?.data[3]};"
          >
            {newData?.data[0]}
          </div>
          <div class="text-[0.4rem] text-[#BBBBBB] font-light">
            {digit2Human(deltaDigit(digit, newData?.data[2]))} 남음
          </div>
        </div>
      </div>
    {/if}
    {#if futureData?.data}
      <div class="flex flex-row gap-[0.3rem]">
        <div
          class="bg-neutral-400 w-[0.16rem] h-[1.4rem] rounded"
          style="background-color: {futureData?.data[3]};"
        />
        <div class="flex flex-col">
          <div
            class="text-[0.5rem] font-semibold"
            style="content: {futureData?.data[3]};"
          >
            {futureData?.data[0]}
          </div>
          <div class="text-[0.4rem] text-[#BBBBBB] font-light">
            {digit2Human(deltaDigit(newData?.data[2], futureData?.data[2]))} 진행
            예정
          </div>
        </div>
      </div>
    {/if}
    <div class="flex flex-row justify-{leftCount > 0 ? 'between' : 'end'}">
      {#if leftCount > 0}
        <div class="flex flex-row items-center gap-[0.2rem]">
          <div class="flex flex-row gap-[0.07rem]">
            <div
              class="bg-slate-500 w-[0.25rem] h-[0.25rem]"
              style="border-radius: 50%;"
            />
            <div
              class="bg-slate-400 w-[0.25rem] h-[0.25rem]"
              style="border-radius: 50%;"
            />
            <div
              class="bg-slate-300 w-[0.25rem] h-[0.25rem]"
              style="border-radius: 50%;"
            />
          </div>
          <div class="text-[0.4rem] text-[#BBBBBB] font-light">
            {leftCount} More
          </div>
        </div>
      {/if}
      <div class="flex flex-row gap-[0.3rem] items-center">
        <div class="flex items-start">
          <button
            class="text-[0.35rem] h-fit"
            style="font-family: 'SF Pro'"
            on:click={() => {
              updateOn = !updateOn;
              storeUpdate();
            }}>{updateOn ? updateOnIcon : updateOffIcon}</button
          >
        </div>
        <div class="flex items-start">
          <button
            class="text-[0.4rem] h-fit"
            style="font-family: 'SF Pro'"
            on:click={() => {
              notifyOn = !notifyOn;
              storeNotify();
            }}>{notifyOn ? notifyOnIcon : notifyOffIcon}</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .widget {
    padding: 0.7rem;
    border-radius: 0.675rem;
    background-color: #1b1b1d;

    width: 7rem;
    height: 7rem;

    color: white;
  }
</style>

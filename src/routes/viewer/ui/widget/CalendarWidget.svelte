<script>
  import { onMount } from "svelte";

  let date = new Date();
  let month = date.getMonth() + 1;

  let dayOfWeekListProto = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeekList = [];
  for (let i = 0; i < 7; i++) {
    dayOfWeekList.push({
      dayOfWeek: dayOfWeekListProto[i],
      dayOfMonth: dayOfWeekListProto[i],
      type: "dayOfWeek",
    });
  }
  function generateDateList() {
    let dateList = dayOfWeekList;
    let date = new Date();
    let dayOfWeek = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dayOfMonth = date.getDate();

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // insert zeros before the first day of the month
    for (let i = 0; i < new Date(year, month, 1).getDay(); i++) {
      dateList.push({
        dayOfMonth: 0,
        type: "dayOfMonth",
      });
    }
    for (let i = 0; i < daysInMonth; i++) {
      let datum = {
        dayOfMonth: i + 1,
        type: "dayOfMonth",
      };
      if (i + 1 === dayOfMonth) {
        datum.today = true;
      }
      if (dayOfWeek === 0) {
        datum.sunday = true;
      }
      if (i + 1 < dayOfMonth) {
        datum.past = true;
      }
      if (i + 1 > dayOfMonth) {
        datum.future = true;
      }
      dateList.push(datum);

      dayOfWeek += 1;

      if (dayOfWeek > 6) {
        dayOfWeek = 0;
      }
    }
    let cnt = 7 - (dateList.length % 7);
    for (let i = 0; i < cnt; i++) {
      dateList.push({
        dayOfMonth: 0,
        type: "dayOfMonth",
      });
    }

    return dateList;
  }
</script>

<div class="widget flex flex-col justify-between">
  <div class="text-[0.6rem] text-[#E65646]" style="line-height: normal;">
    {month}월
  </div>
  <div class="flex flex-row flex-wrap justify-between">
    {#each generateDateList() as data}
      <div
        class="flex text-[0.43rem] h-[0.73rem] w-[0.73rem] min-w-[0.73rem] max-w-[0.73rem] items-center justify-center {data.type ===
        'dayOfWeek'
          ? 'text-[#FFFFFF80]'
          : 'text-[#ffffff]'} {data.today
          ? 'bg-[#E65646]'
          : ''} {data.dayOfMonth == '0' ? 'text-transparent' : ''}"
        style="width: calc(5.8rem / 7); border-radius: 50%;"
      >
        {data.dayOfMonth}
      </div>
      <!-- {#if data.type === "dayOfWeek"}
        
      {:else if data.type === "dayOfMonth"}
        <div
          class="flex text-[0.5rem] items-center justify-center"
          style="width: calc(5.8rem / 7);"
        >
          {data.dayOfMonth}
        </div>
      {/if} -->
    {/each}
  </div>
</div>

<style>
</style>

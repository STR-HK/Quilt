<script>
  function getTime() {
    return new Date("2023-07-15 22:30:00");
  }

  const todayStart = getTime();
  todayStart.setHours(8);
  todayStart.setMinutes(40);

  function getDelta() {
    return getTime() - todayStart;
  }
  function getDeltaHour() {
    return Math.floor(getDelta() / 1000 / 60 / 60);
  }
  function getDeltaMin() {
    return Math.floor(getDelta() / 1000 / 60);
  }
</script>

<div
  class="smallWideWidget text-xl flex-row flex items-between justify-between gap-[0.2rem]"
>
  <div class="gap-[0.2rem] h-full flex-col flex justify-center">
    <div class="text-[0.5rem]" style="line-height: normal;">􀰑 MIN</div>
    <div class="text-[0.5rem]" style="line-height: normal;">􀆌 HOUR</div>
    <div class="text-[0.5rem]" style="line-height: normal;">􀄨 WEEK</div>
  </div>
  <div class="gap-[0.2rem] h-full flex-col flex justify-center pr-[0.5rem]">
    <div class="text-[0.5rem]" style="line-height: normal;">
      {getDelta() < 0
        ? (getTime().getDay() - 1) * 12 * 60
        : (getTime().getDay() - 1) * 12 * 60 + getDeltaMin()}/4320
    </div>
    <div class="text-[0.5rem]" style="line-height: normal;">
      {getDelta() < 0
        ? (getTime().getDay() - 1) * 12
        : (getTime().getDay() - 1) * 12 + getDeltaHour()}/72
    </div>
    <div class="text-[0.5rem]" style="line-height: normal;">
      {getTime().getDay() > 0 ? `${getTime().getDay()}/6` : `DAY OFF`}
    </div>
  </div>
</div>

<style>
  .smallWideWidget {
    padding: 0.475rem;
    border-radius: 0.475rem;
    background-color: #232316;

    width: 7rem;
    height: 3.2rem;

    color: white;
    box-shadow: rgba(0, 0, 0, 0.96) 0px 22px 70px 4px;
    cursor: pointer;
  }

  .smallWidget:active {
    background-color: rgb(7, 9, 7);
  }
</style>

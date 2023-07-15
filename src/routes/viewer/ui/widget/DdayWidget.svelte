<script>
  function dateDelta(currentDate, targetDate) {
    let delta = targetDate - currentDate;
    return Math.floor(delta / (1000 * 60 * 60 * 24));
  }
</script>

<div
  class="widget text-xl flex-col flex items-center justify-center gap-[0.2rem]"
>
  <div class="text-[0.6rem] pt-[0.1rem]" style="line-height: 0.5rem">
    방학식
  </div>
  <div class="text-[1.5rem]">
    D-{dateDelta(new Date(), new Date("2023-07-20"))}
  </div>
  <div class="text-[0.4rem] text-[#FFFFFF99]" style="line-height: 0.5rem">
    2023년 7월 20일
  </div>
</div>

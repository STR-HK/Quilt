<script>
  function dateDelta(currentDate, targetDate) {
    let delta = targetDate - currentDate;
    return Math.floor(delta / (1000 * 60 * 60 * 24));
  }

  let dday = "2023-08-09";
  let renderedDate = "2023년 8월 9일 (수)";
  let renderedDday = "20";

  function render() {
    renderedDate = new Date(dday).toLocaleDateString("ko-KR", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    renderedDday = dateDelta(new Date(), new Date(dday)).toString();
  }

  setInterval(render, 1000 * 60 * 5);
  render();
</script>

<div
  class="widget text-xl flex-col flex items-center justify-center gap-[0.2rem] cursor-pointer"
>
  <div class="text-[0.6rem] pt-[0.1rem]" style="line-height: 0.5rem">
    개학식
  </div>
  <div class="text-[1.5rem]">
    D-{renderedDday}
  </div>
  <div class="text-[0.4rem] text-[#FFFFFF99]" style="line-height: 0.5rem">
    <!-- 2023년 7월 20일 -->
    {renderedDate}
  </div>
</div>

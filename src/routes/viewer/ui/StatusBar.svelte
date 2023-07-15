<script>
  // @ts-nocheck

  export let renderedDate;
  export let renderedTime;
  export let showModal;

  export let splashScreen;
  export let mainScreen;
  export let renderMainScreen;

  export let mainScreenRenderUpdater;
  export let splashScreenUpdater;
</script>

<!-- 원래 BBBBBB -->

<div
  class="status_bar h-[1.8rem] w-full text-[0.8rem]
    flex flex-row items-center justify-between px-[0.28rem]"
>
  <div class="flex flex-row items-center font-bold">
    <div class="status_item">􀜎</div>
    <div class="status_item">Quilter</div>
  </div>
  <div class="flex flex-row items-center">
    <!-- <div class="status_item">􀛨</div> -->
    <!-- <div class="status_item">􀙇</div> -->
    <div class="status_item" on:click={() => (showModal = true)}>􀊫</div>
    <div class="status_item">􀜊</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="status_item"
      on:click={() => {
        mainScreen = false;
        mainScreenRenderUpdater();
        setTimeout(() => {
          mainScreen = true;
          splashScreenUpdater();
        }, 400);
      }}
    >
      􀆨
    </div>
    <div class="status_item">{renderedDate}</div>
    <div class="status_item">{renderedTime}</div>
  </div>
</div>

<style>
  .status_bar {
    /* background-color: #1515157F; */
    background-color: rgba(209, 209, 209, 0.498);

    backdrop-filter: saturate(500%) blur(20px);
    /* background: rgba(251, 251, 253, 0.8); */
  }

  .status_item {
    padding-left: 0.375rem;
    padding-right: 0.375rem;

    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    font-family: "SF Pro";

    font-size: 0.6rem;
    /* color: #bbbbbb; */
    color: #ffffff;
    border-radius: 0.375rem;
    cursor: pointer;
  }

  .status_item:hover {
    /* background-color: #6f6f795f; */
    /* background-color: #90909e5f; */
    backdrop-filter: saturate(500%) blur(20px);
  }
</style>

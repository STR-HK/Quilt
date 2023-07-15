<script>
  // @ts-nocheck

  import { fade, fly, slide } from "svelte/transition";

  export let ignoreNotify;
  export let visible;
  export let notifyTarget;
  export let digit;
</script>

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    transition:slide={{ axis: "x", duration: 500 }}
    class="widget widen notify text-xl flex-col flex items-start justify-start gap-[0.2rem] cursor-pointer"
    style="line-height: normal;"
    on:click={() => {
      ignoreNotify = digit;
      visible = false;
      setTimeout(() => {
        ignoreNotify = NaN;
      }, 1000 * 60 * 2);
    }}
  >
    <div class="flex flex-row justify-between w-full">
      <!-- svelte-ignore a11y-missing-attribute -->
      <div class="flex flex-row gap-[0.2rem] items-center">
        <!-- <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-reminders-2844893-2365242.png"
                  class="w-[0.7rem] cursor-pointer"
                  style="border-radius: 0.1rem;"
                /> -->
        <div
          class="text-[0.4rem] bg-[#00000070]"
          style="border-radius: 0.2rem; padding: 0.15rem; font-family: 'SF Pro';"
        >
          􀜎
        </div>
        <div class="uppercase text-[0.5rem]">Quilter</div>
      </div>
      <!-- <div class="text-[0.5rem]">7m ago</div> -->
    </div>
    <div
      class="text-[0.6rem] font-semibold flex flex-row"
      style="line-height: normal;"
    >
      {notifyTarget}이(가) 진행될 시간이에요
    </div>
    <div class="text-[0.5rem]" style="line-height: normal;">
      여기를 살짝 눌러 알림을 멈출 수 있어요
    </div>
  </div>
{/if}

<style>
  .widget {
    padding: 0.7rem;
    border-radius: 0.675rem;
    background-color: #1b1b1d;

    width: 7rem;
    height: 7rem;

    color: white;
  }
  .widen {
    width: 14.75rem;
  }
  .notify {
    background-color: #00000050;
    height: 3.5rem;
    padding: 0.5rem;
  }
</style>

<script>
  export let status;
  export let name;
  export let time;
  export let loadCheck;

  function call() {
    fetch("http://asphodel.kro.kr:5173/viewer/api/check/register", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        loadCheck();
      })
      .catch((e) => {
        console.error("[LOAD GEO] /geo/1.0/direct", e);
      });
  }

  function kill() {
    fetch("http://asphodel.kro.kr:5173/viewer/api/check/register", {
      method: "DELETE",
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        loadCheck();
      })
      .catch((e) => {
        console.error("[LOAD GEO] /geo/1.0/direct", e);
      });
  }
</script>

<div
  class="widget smallWidget text-xl flex-col flex items-center justify-center gap-[0.2rem]"
  on:click={status ? kill : call}
>
  <div
    class="bg-[#3e3d39] w-full h-full flex flex-col items-center justify-center active:bg-[#30302d] gap-[0.05rem]"
    style="border-radius: 50%; box-shadow: none; line-height: normal;"
  >
    <!-- <div class="text-[0.4rem]">{status ? "􀯧" : "􀯨"}</div> -->
    <div class="text-[0.35rem]" style="font-family:  'SF Pro';">
      {status ? "􀲏" : "􀯨"}
    </div>
    <div class="text-[0.6rem]">{time}</div>
    <div class="text-[0.35rem]">{name}</div>
  </div>
</div>

<style>
  .smallWidget {
    padding: 0.35rem;
    border-radius: 0.475rem;
    background-color: rgb(24, 24, 24);

    width: 3.2rem;
    height: 3.2rem;

    color: white;
    box-shadow: rgba(0, 0, 0, 0.96) 0px 22px 70px 4px;
    cursor: pointer;
  }

  .smallWidget:active {
    background-color: rgb(8, 8, 8);
  }
</style>

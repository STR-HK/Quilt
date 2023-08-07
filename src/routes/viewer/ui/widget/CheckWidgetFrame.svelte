<script>
</script>

<div
  class="frame text-xl flex-row flex flex-wrap gap-[0.6rem] content-between justify-between"
>
  <slot />
</div>

<style>
  .frame {
    padding: 0.6rem;
    border-radius: 0.675rem;
    background-color: #1b1b1d;

    width: 7rem;
    height: 7rem;

    color: white;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;

    background-color: transparent;
    padding: 0;
    box-shadow: none;
  }
</style>

<script>
  // @ts-nocheck
  export let showModal;
  let dialog;
  $: if (dialog && showModal) dialog.showModal();
  let value;
  let input;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation>
    <div class="searchBar">
      <!-- svelte-ignore a11y-autofocus -->
      <input
        placeholder="검색"
        bind:this={input}
        autofocus
        bind:value
        on:keypress={(e) => {
          if (e.key === "Enter") {
            value = "";
            input.blur();
            dialog.close();
          }
        }}
      />
    </div>
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
    background-color: transparent;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: translateY(2em);
    }
    to {
      transform: translateY(0);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }

  input {
    background: 0;
    border: 0;
    outline: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: black;
  }
  input::placeholder {
    color: #666666;
  }

  .searchBar {
    padding: 0.7rem;
    border-radius: 1rem;
    background-color: rgba(225, 225, 225, 0.7);

    width: 18rem;
    height: 3.5rem;

    margin-bottom: 60vh;

    color: white;
  }
</style>

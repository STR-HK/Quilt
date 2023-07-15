<script>
  // @ts-nocheck

  import saltyWinter from "$lib/images/winter/xJisFzNR_1x.jpg";
  import winterWinter from "$lib/images/winter/[22-12-28] CmtrRn8L_Nk_p2.jpg";
  import pcroomWinter from "$lib/images/winter/20230219_205033.jpg";
  import mvWinter from "$lib/images/winter/20230224_221926.jpg";
  import mvCaptureWinter from "$lib/images/winter/20230226_214516.jpg";
  import cherishWinter from "$lib/images/winter/FoImjFmagAAI2_d.jpeg";
  import effelWinter from "$lib/images/winter/Tumblr_l_15209115974144.jpg";

  import blueWinter from "$lib/images/winter/220707-aespa-Winter-documents-1.jpeg";
  import redWinter from "$lib/images/winter/230616-aespa-Winter-Lotte-Duty-Free-Family-Concert-documents-3.jpeg.jpg";
  import asmuseWinter from "$lib/images/winter/20230416_192104.jpg";
  import faceWinter from "$lib/images/winter/20230317_174408.jpg";
  import sideWinter from "$lib/images/winter/PSX_20230319_115030.jpg";

  import maskWinter from "$lib/images/winter/[22-08-26] 1562954287436533760_p1.jpg";
  import flowerWinter from "$lib/images/winter/20230220_234955.jpg";
  import stageWinter from "$lib/images/winter/20230220_234159.jpg";

  import yankeeWinter from "$lib/images/winter/230608-aespa-Winter-Yankee-Stadium-documents-2(1).jpeg";
  import airportmaskWinter from "$lib/images/winter/230625-aespa-Winter-at-Incheon-International-Airport-documents-1(1).jpeg";
  import musiccorepurpleWinter from "$lib/images/winter/230520-aespa-Winter-Spicy-Encore-Stage-at-Music-Core-documents-1.jpeg";
  import musiccoretrophyWinter from "$lib/images/winter/230520-aespa-Winter-Spicy-Encore-Stage-at-Music-Core-documents-3.jpeg";
  import whitehatWinter from "$lib/images/winter/230416-aespa-Winter-1st-Concert-SYNK-HYPER-LINE-in-Saitama-Day-2-documents-1(1).jpeg";
  import spicyWinter from "$lib/images/winter/230513-aespa-Winter-Spicy-Salty-Sweet-at-Music-Core-documents-2.jpeg";

  import goldWinter from "$lib/images/winter/220626-aespa-Winter-SYNK-in-LA-documents-3.jpeg";
  import goldDressWinter from "$lib/images/winter/220626-aespa-Winter-SYNK-in-LA-documents-4.jpeg";
  import newMaskWinter from "$lib/images/winter/220826-aespa-Winter-documents-2(1).jpeg";
  import greenWinter from "$lib/images/winter/230514-aespa-Winter-Spicy-at-Inkigayo-documents-2.jpeg";
  import orangeWinter from "$lib/images/winter/230514-aespa-Winter-Thirsty-at-Inkigayo-documents-5(1).jpeg";

  import blueUniversityWinter from "$lib/images/winter/230520-aespa-Winter-Yonsei-University-Festival-documents-2(2).jpeg";
  import peachWinter from "$lib/images/winter/Fq3Fi_paIAAA-iW.jpg";
  import clearEyeWinter from "$lib/images/winter/PSX_20230715_013020.jpg";
  import aeroportWinter from "$lib/images/winter/FyG1WuMaUAAIbtk.jpg";
  import rightSideWinter from "$lib/images/winter/FzNDvQpaEAA99RW.jpg";

  import { blur, fade } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { onMount } from "svelte";

  export let updateOn;
  export let updateSignal;

  let images = [
    saltyWinter,
    winterWinter,
    mvWinter,
    mvCaptureWinter,
    cherishWinter,
    effelWinter,
    blueWinter,
    redWinter,
    asmuseWinter,
    sideWinter,
    flowerWinter,
    stageWinter,
    yankeeWinter,
    airportmaskWinter,
    musiccorepurpleWinter,
    musiccoretrophyWinter,
    whitehatWinter,
    spicyWinter,
    goldWinter,
    goldDressWinter,
    newMaskWinter,
    greenWinter,
    orangeWinter,
    blueUniversityWinter,
    peachWinter,
    clearEyeWinter,
    aeroportWinter,
    rightSideWinter,
  ];
  let image_poses = [];
  image_poses[12] = "30px -40px";
  image_poses[16] = "-85px -10px";
  image_poses[26] = "-90px -10px";
  let image_sizes = [];
  image_sizes[12] = "cover";
  image_sizes[16] = "130%";
  image_sizes[26] = "130%";
  let counter = 0;
  let counterMax = images.length;

  function incremeng() {
    galleryUpdater = !galleryUpdater;
    counter += 1;
    if (counter >= counterMax) {
      counter = 0;
    }
    setTimeout(() => {
      galleryUpdater = !galleryUpdater;
    }, animeDuration / 2);
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    // console.log(images.length - 1);
    // return 26;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randormeng() {
    galleryUpdater = false;

    let beforeCounter = counter;
    counter = randomIntFromInterval(0, counterMax - 1);
    if (beforeCounter == counter) {
      return randormeng();
    }
    // galleryUpdater = !galleryUpdater;

    setTimeout(() => {
      galleryUpdater = true;
    }, animeDuration);

    // console.log(counter);
  }

  let galleryUpdater = false;
  let animeDuration = 500;

  updateSignal = () => {
    randormeng();
  };

  onMount(() => {
    counter = randomIntFromInterval(0, counterMax - 1);
    galleryUpdater = true;
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="widget widen hiden cursor-pointer" style="padding: 0;">
  {#if galleryUpdater}
    <div
      class="widget widen hiden"
      style="background-size: {image_sizes[counter]
        ? image_sizes[counter]
        : 'cover'}; background-position: {image_poses[counter]
        ? image_poses[counter]
        : 'center top'}; 
  background-image: url('{counter >= 0
        ? images[counter]
        : ''}'); filter: brightness(1.1); box-shadow: none;"
      on:click={randormeng}
      transition:fade={{ duration: animeDuration }}
    />
  {/if}
</div>

<script>
  // @ts-nocheck

  let saltyWinter = "./src/lib/images/winter/xJisFzNR_1x.jpg";
  let winterWinter = "./src/lib/images/winter/[22-12-28] CmtrRn8L_Nk_p2.jpg";
  let pcroomWinter = "./src/lib/images/winter/20230219_205033.jpg";
  let mvWinter = "./src/lib/images/winter/20230224_221926.jpg";
  let mvCaptureWinter = "./src/lib/images/winter/20230226_214516.jpg";
  let cherishWinter = "./src/lib/images/winter/FoImjFmagAAI2_d.jpeg";
  let effelWinter = "./src/lib/images/winter/Tumblr_l_15209115974144.jpg";

  let blueWinter =
    "./src/lib/images/winter/220707-aespa-Winter-documents-1.jpeg";
  let redWinter =
    "./src/lib/images/winter/230616-aespa-Winter-Lotte-Duty-Free-Family-Concert-documents-3.jpeg.jpg";
  let asmuseWinter = "./src/lib/images/winter/20230416_192104.jpg";
  let faceWinter = "./src/lib/images/winter/20230317_174408.jpg";
  let sideWinter = "./src/lib/images/winter/PSX_20230319_115030.jpg";

  let maskWinter =
    "./src/lib/images/winter/[22-08-26] 1562954287436533760_p1.jpg";
  let flowerWinter = "./src/lib/images/winter/20230220_234955.jpg";
  let stageWinter = "./src/lib/images/winter/20230220_234159.jpg";

  let yankeeWinter =
    "./src/lib/images/winter/230608-aespa-Winter-Yankee-Stadium-documents-2(1).jpeg";
  let airportmaskWinter =
    "./src/lib/images/winter/230625-aespa-Winter-at-Incheon-International-Airport-documents-1(1).jpeg";
  // let musiccorepurpleWinter = "./src/lib/images/winter/230520-aespa-Winter-Spicy-Encore-Stage-at-Music-Core-documents-1.jpeg";
  let musiccoretrophyWinter =
    "./src/lib/images/winter/230520-aespa-Winter-Spicy-Encore-Stage-at-Music-Core-documents-3.jpeg";
  let whitehatWinter =
    "./src/lib/images/winter/230416-aespa-Winter-1st-Concert-SYNK-HYPER-LINE-in-Saitama-Day-2-documents-1(1).jpeg";
  let spicyWinter =
    "./src/lib/images/winter/230513-aespa-Winter-Spicy-Salty-Sweet-at-Music-Core-documents-2.jpeg";

  let goldWinter =
    "./src/lib/images/winter/220626-aespa-Winter-SYNK-in-LA-documents-3.jpeg";
  let goldDressWinter =
    "./src/lib/images/winter/220626-aespa-Winter-SYNK-in-LA-documents-4.jpeg";
  let newMaskWinter =
    "./src/lib/images/winter/220826-aespa-Winter-documents-2(1).jpeg";
  let greenWinter =
    "./src/lib/images/winter/230514-aespa-Winter-Spicy-at-Inkigayo-documents-2.jpeg";
  let orangeWinter =
    "./src/lib/images/winter/230514-aespa-Winter-Thirsty-at-Inkigayo-documents-5(1).jpeg";

  let blueUniversityWinter =
    "./src/lib/images/winter/230520-aespa-Winter-Yonsei-University-Festival-documents-2(2).jpeg";
  let peachWinter = "./src/lib/images/winter/Fq3Fi_paIAAA-iW.jpg";
  let clearEyeWinter = "./src/lib/images/winter/PSX_20230715_013020.jpg";
  let aeroportWinter = "./src/lib/images/winter/FyG1WuMaUAAIbtk.jpg";
  let rightSideWinter = "./src/lib/images/winter/FzNDvQpaEAA99RW.jpg";

  let skyblueWinter =
    "./src/lib/images/winter/220624-aespa-Winter-documents-10.jpeg";
  let singingWinter =
    "./src/lib/images/winter/220627-aespa-Winter-documents-1(1).jpeg";
  let cuteWinter =
    "./src/lib/images/winter/220706-aespa-Winter-documents-1.jpeg";
  let travelWinter =
    "./src/lib/images/winter/220706-aespa-Winter-documents-4.jpeg";
  let pinkWinter =
    "./src/lib/images/winter/230401-aespa-Winter-1st-Concert-SYNK-HYPER-LINE-in-Tokyo-Day-1-documents-1(2).jpeg";

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
    skyblueWinter,
    singingWinter,
    cuteWinter,
    travelWinter,

    pinkWinter,
  ];
  let image_poses = [];
  image_poses[12] = "30px -40px";
  image_poses[16] = "-85px -10px";
  image_poses[25] = "-90px -10px";
  image_poses[26] = "-135px -10px";
  let image_sizes = [];
  image_sizes[12] = "cover";
  image_sizes[16] = "130%";
  image_sizes[25] = "130%";
  image_sizes[26] = "200%";
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

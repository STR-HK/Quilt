<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import {
    calcTimeState,
    clear_noon,
    forecastArraySample,
    getColorByIcon,
    getColorSet,
    getIcon,
    getText,
    weatherDataSample,
  } from "./weatherData";

  let weatherData = weatherDataSample;
  let forecastArray = forecastArraySample;

  let weatherIcon = "􀆮";
  let weatherText = "맑음";
  let weatherColor = "255, 255, 255";
  let locationName = "도시";

  let tempMin = 22;
  let tempMax = 23;

  let bIsDay = true;
  let timeState = "noon";

  let lat = 35.8412815;
  let lon = 127.1580072;
  let app = "bebf22a848b5175dac687029ba7c0164";

  let topColor = clear_noon.top;
  let middleColor = clear_noon.middle;
  let bottomColor = clear_noon.bottom;

  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          safeRefreshWeather();
        },
        // (error) => {
        //   console.error(error);
        // },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  } catch (e) {}

  let originalFetch = fetch;
  fetch = function (url, options) {
    return originalFetch(url, options)
      .catch((e) => {
        console.error("[FETCH]", e);
      })
      .catch((e) => {
        console.error("[FETCH]", e);
      });
  };

  // let delta = 0;
  // setInterval(() => {
  //   weatherData.dt = weatherData.dt + delta;
  //   delta += 1;
  //   // console.log(new Date(weatherData.dt * 1000).getUTCHours());
  //   let cs = calcTimeState(weatherData);
  //   console.log(cs);
  //   try {
  //     topColor = cs.top;
  //     middleColor = cs.middle;
  //     bottomColor = cs.bottom;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, 50);

  function refreshWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${app}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        weatherData = res;
        // console.error(res);
        // console.error(lat, lon);

        let dt = res?.dt;
        let sunrise = res?.sys?.sunrise;
        let sunset = res?.sys?.sunset;
        if (dt < sunrise || dt > sunset) {
          bIsDay = false;
        } else {
          bIsDay = true;
        }

        let weatherMain = res?.weather[0]?.main;
        let weatherDescription = res?.weather[0]?.description;
        weatherIcon = getIcon(weatherMain, weatherDescription, bIsDay);
        weatherText = getText(weatherMain, weatherDescription, bIsDay);
        weatherColor = getColorByIcon(weatherIcon);

        // let timeState = calcTimeState(weatherData);
        // let cs = getColorSet(weatherMain, timeState);
        // weatherData.dt = weatherData.dt + delta;
        // delta += 1;
        // console.log();
        let cs = calcTimeState(weatherData);
        topColor = cs.top;
        middleColor = cs.middle;
        bottomColor = cs.bottom;

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${app}&units=metric`
        )
          .then((res) => res.json())
          .then((res) => {
            let wl = res.list;
            let cnt = 0;

            tempMin = 273.15;
            tempMax = -273.15;

            function utcFormatDate(dateObject) {
              return `${dateObject.getUTCHours()}시 ${dateObject.getUTCMinutes()}분 ${dateObject.getUTCSeconds()}초`;
            }

            forecastArray = [];

            wl.forEach((weather) => {
              if (cnt < 6) {
                // console.warn(weatherData);
                console.log(
                  `응답생성시간: ${utcFormatDate(
                    new Date((weatherData.dt + weatherData.timezone) * 1000)
                  )}`
                );

                if (weather.dt > weatherData.dt + weatherData.timezone) {
                  // console.log({
                  //   f: weather.dt,
                  //   c: weatherData.dt + weatherData.timezone,
                  // });
                  console.warn(`예상시간: ${weather.dt_txt}`);
                  console.warn(
                    `예상시간: ${utcFormatDate(
                      new Date((weather.dt + weatherData.timezone) * 1000)
                    )}`
                  );

                  forecastArray.push(weather);

                  if (weather.main.temp_min < tempMin) {
                    tempMin = Math.round(weather.main.temp_min);
                  }

                  if (weather.main.temp_max > tempMax) {
                    tempMax = Math.round(weather.main.temp_max);
                  }

                  cnt += 1;
                } else {
                  console.error(`예상시간: ${weather.dt_txt}`);
                  console.error(
                    `예상시간: ${utcFormatDate(new Date(weather.dt * 1000))}`
                  );
                }
              }
            });

            for (let s = 0; s < forecastArray.length; s++) {
              console.log(new Date(weatherData.sys.sunrise * 1000).getHours());
            }
          })
          .catch((e) => {
            console.error("[FETCH] /data/2.5/forecast", e);
          });

        fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${weatherData.name}&limit=1&appid=${app}`
        )
          .then((res) => res.json())
          .then((res) => {
            let locale = res[0];

            if (locale) {
              if (locale.local_names) {
                let names = locale.local_names;
                if (names.ko) {
                  locationName = names.ko;
                } else if (names.en) {
                  locationName = names.en;
                } else {
                  locationName = names.feature_name;
                }
              } else {
                locationName = locale.name;
              }

              if (!locationName) {
                locationName = weatherData?.name;
              }

              if (locationName === "Wanju") {
                locationName = "전주시";
              }
            } else {
              locationName = weatherData?.name;
            }
          })
          .catch((e) => {
            console.error("[LANG CONVERT] /geo/1.0/direct", e);
          });
      })
      .catch((e) => {
        console.error("[FETCH] /data/2.5/weather", e);
      });
  }

  function safeRefreshWeather() {
    try {
      refreshWeather();
    } catch (e) {
      setTimeout(safeRefreshWeather, 1000 * 30);
    }
  }

  function loadByNameIfExist() {
    let name = localStorage.getItem("weatherName");

    if (name) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${app}`
      )
        .then((res) => res.json())
        .then((res) => {
          let locale = res[0];

          if (locale) {
            lat = locale.lat;
            lon = locale.lon;
          } else {
            alert('"' + name + '"을 찾을 수 없습니다.');
          }

          safeRefreshWeather();
        })
        .catch((e) => {
          console.error("[LOAD GEO] /geo/1.0/direct", e);
        });
    } else {
      safeRefreshWeather();
    }
  }

  onMount(() => {
    loadByNameIfExist();
  });
  setInterval(() => {
    // console.log("refreshing weather");
    safeRefreshWeather();
  }, 1000 * 60 * 5);

  let weatherNameViewer;
  let bIsEditingName = false;
  let inputWeatherName;

  function updateName() {
    localStorage.setItem("weatherName", locationName);
  }

  function changeLocationButton() {
    bIsEditingName = !bIsEditingName;
    if (!bIsEditingName) {
      updateName();
      loadByNameIfExist();
    }
  }
</script>

<div
  class="widget widen flex flex-col justify-between cursor-pointer"
  style="background: rgb({topColor});
background: linear-gradient(180deg, rgb({topColor}) 0%, rgb({middleColor}) 50%, rgb({bottomColor}) 100%);"
>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col" style="line-height: normal;">
      <div class="flex flex-row gap-[0.2rem] items-center">
        {#if !bIsEditingName}
          <div
            class="text-[0.6rem] font-semibold"
            bind:clientWidth={weatherNameViewer}
          >
            {locationName}
          </div>
        {/if}
        {#if bIsEditingName}
          <input
            class="text-[0.6rem] font-semibold"
            bind:value={locationName}
            on:change={changeLocationButton}
            style="width: 100%;"
          />
        {/if}
        <button
          class="text-[0.4rem] font-bold"
          style="font-family: 'SF Pro'"
          on:click={changeLocationButton}>{bIsEditingName ? "􀈟" : "􀈊"}</button
        >
      </div>
      <div
        class="text-[1.5rem]"
        style="line-height: 1.49rem; margin-left: -0.04rem"
      >
        {Math.round(weatherData?.main?.temp)}°
      </div>
    </div>
    <div class="flex flex-col items-end gap-[0.1rem]">
      <div
        class="text-[0.5rem] mb-[0.1rem]"
        style="font-family: 'SF Pro'; color: rgb({weatherColor});"
      >
        {weatherIcon}
      </div>
      <div class="text-[0.5rem]" style="line-height: normal;">
        {weatherText}
      </div>
      <div class="text-[0.5rem]" style="line-height: normal;">
        최고:{tempMax}° 최저:{tempMin}°
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-between">
    {#each Array(6) as _, idx}
      <div class="flex flex-col items-center text-[0.5rem] gap-[0.15rem]">
        <div class="font-light text-[0.4rem] transtext font-semibold">
          {new Date(
            (forecastArray[idx]?.dt + weatherData.timezone) * 1000
          ).getUTCHours()}시
        </div>
        <div
          class="text-[0.6rem]"
          style="font-family: 'SF Pro'; color: rgb({getColorByIcon(
            getIcon(
              forecastArray[idx]?.weather[0]?.main,
              forecastArray[idx]?.weather[0]?.description,
              bIsDay
            )
          )});"
        >
          {getIcon(
            forecastArray[idx]?.weather[0]?.main,
            forecastArray[idx]?.weather[0]?.description,
            bIsDay
          )}
        </div>
        <div class="text-[0.4rem] font-semibold">
          {Math.round(forecastArray[idx]?.main?.temp)}°
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  input {
    background-color: transparent;
    width: auto;
    outline: 0;
  }
  input:hover {
    outline: 0;
  }

  .transtext {
    color: rgba(255, 255, 255, 0.75);
  }
</style>

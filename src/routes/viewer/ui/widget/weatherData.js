export let weatherDataSample = {
    coord: {
      lon: 127.1537,
      lat: 35.8378,
    },
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 20.66,
      feels_like: 21.29,
      temp_min: 20.66,
      temp_max: 20.66,
      pressure: 1002,
      humidity: 96,
      sea_level: 1002,
      grnd_level: 996,
    },
    visibility: 10000,
    wind: {
      speed: 1.88,
      deg: 103,
      gust: 3.1,
    },
    rain: {
      "1h": 0.29,
    },
    clouds: {
      all: 100,
    },
    dt: 1688722607,
    sys: {
      type: 1,
      id: 8076,
      country: "KR",
      sunrise: 1688674868,
      sunset: 1688727050,
    },
    timezone: 32400,
    id: 1833466,
    name: "전주시",
    cod: 200,
  };

  export let clear_dusk = {
    top: "12, 21, 46",
    middle: "37, 43, 73",
    bottom: "78, 76, 103",
  };
  export let clear_noon = {
    top: "10, 60, 129",
    middle: "32, 88, 150",
    bottom: "76, 135, 196",
  };
  export let clear_night = {
    top: "6, 6, 13",
    middle: "29, 33, 58",
    bottom: "31, 47, 78",
  };
  export let clear_dawn = {
    top: "20, 51, 99",
    middle: "105, 111, 151",
    bottom: "168, 144, 140",
  };
  

  export let rainy_dawn = {
    top: "53, 64, 80",
    middle: "53, 63, 81",
    bottom: "63, 70, 82",
  };
  export let rainy_noon = {
    top: "111, 122, 139",
    middle: "95, 110, 131",
    bottom: "84, 94, 108",
  };
  export let rainy_dusk = {
    top: "82, 91, 106",
    middle: "72, 87, 105",
    bottom: "53, 69, 88",
  };
  export let rainy_night = {
    top: "21, 31, 45",
    middle: "33, 38, 49",
    bottom: "21, 29, 46",
  };


  export function getText(main, desc, bIsDay) {
    switch (desc) {
      case 'clear sky':
        if (bIsDay) {
          return "맑음";
        } else {
          return "청명함";
        }
      case 'light intensity drizzle':
        return "약한 이슬비";
        break;
      case 'drizzle':
        return "이슬비";
        break;
      case 'heavy intensity drizzle':
        return "강한 이슬비";
        break;
      case 'light intensity drizzle rain':
        return "약한 이슬비";
        break;
      case 'drizzle rain':
        return "이슬비";
        break;
      case 'heavy intensity drizzle rain':
        return "강한 이슬비";
        break;
      case 'shower rain and drizzle':
        return "소나기와 이슬비";
        break;
      case 'heavy shower rain and drizzle':
        return "강한 소나기와 이슬비";
        break;
      case 'shower drizzle':
        return "소나기와 이슬비";
        break;
      case 'few clouds':
        if (bIsDay) {
          return "대체로 맑음";
        } else {
          return "대체로 청명함";
        }
        break;
      case 'scattered clouds':
        return "한때 흐림";
        break;
      case 'broken clouds':
        return "대체로 흐림";
        break;
      case 'overcast clouds':
        return "흐림";
        break;
      case 'thunderstorm with light rain':
        return "약한 비를 동반한 폭풍우";
        break;
      case 'thunderstorm with rain':
        return "비를 동반한 폭풍우";
        break;
      case 'thunderstorm with heavy rain':
        return "강한 비를 동반한 폭풍우";
        break;
      case 'thunderstorm with drizzle':
        return "이슬비를 동반한 폭풍우";
        break;
      case 'thunderstorm with heavy drizzle':
        return "강한 이슬비를 동반한 폭풍우";
        break;
      case 'light thunderstorm':
        return "약한 폭풍우";
        break;
      case 'thunderstorm with light drizzle':
        return "약한 이슬비를 동반한 폭풍우";
        break;
      case 'thunderstorm':
        return "폭풍우";          
        break;
      case 'heavy thunderstorm':
        return "강한 폭풍우";
        break;
      case 'ragged thunderstorm':
        return "불규칙한 폭풍우";
        break;
      case 'light rain':
        return "약한 비";
        break;
      case 'moderate rain':
        return "온건한 비";
        break;
      case 'heavy intensity rain':
        return "강한 비";
        break;
      case 'very heavy rain':
        return "매우 강한 비";
        break;
      case 'extreme rain':
        return "극도로 강한 비";
        break;
      case 'freezing rain':
        return "우빙";
        break;
      case 'shower rain':
        return "소나기";
        break;
      case 'heavy intensity shower rain':
        return "강한 소나기";
        break;
      case 'ragged shower rain':
        return "불규칙한 소나기";
        break;
      case 'light snow':
        return "약한 눈";
        break;
      case 'snow':
        return "눈";
        break;
      case 'heavy snow':
        return "강한 눈";
        break;
      case 'sleet':
        return "진눈깨비";
        break;
      case 'light shower sleet':
        return "약한 진눈깨비";
        break;  
      case 'shower sleet':
        return "진눈깨비";
        break;
      case 'light rain and snow':
        return "약한 비와 눈";
        break;
      case 'rain and snow':
        return "비와 눈";
        break;
      case 'light shower snow':
        return "약한 눈보라";
        break;
      case 'shower snow':
        return "눈보라";
        break;
      case 'heavy shower snow':
        return "강한 눈보라";
        break;
      case 'mist':
        return "안개";
        break;
      case 'smoke':
        return "연기";
        break;
      case 'haze':
        return "안개";
        break;
      case 'sand, dust whirls':
        return "황사";
        break;
      case 'fog':
        return "안개";
        break;
      case 'sand':
        return "황사";
        break;
      case 'dust':
        return "황사";
        break;
      case 'volcanic ash':
        return "화산재";
        break;
      case 'squalls':
        return "돌풍";
        break;
      case 'tornado':
        return "폭풍";
        break;
      default:
        return "알 수 없음";
    }
  }

  export function getIcon(main, desc, bIsDay) {
    if (main === "Drizzle") {
      return "􀇅";
    } else if (main === "Clear") {
      if (bIsDay) {
        return "􀆮";
      } else {
        return "􀇁";
      }
    } else if (main === "Clouds") {
      return "􀇃";
    } else if (main === "Sun") {
      if (desc === 'sunrise') {
        return '􀆲'
      } else if (desc === 'sunset') {
        return '􀆴'
      } else {
        return '􀆿'
      }
    
    } else if (
      [
        "thunderstorm with light rain",
        "thunderstorm with rain",
        "thunderstorm with heavy rain",
        "thunderstorm with drizzle",
        "thunderstorm with heavy drizzle",
      ].includes(desc)
    ) {
      return "􀇟";
    } else if (
      ["light thunderstorm", "thunderstorm with light drizzle"].includes(desc)
    ) {
      // if (bIsDay) {
      //   return "􀇙";
      // } else {
      //   return "􀇡";
      // }
      return "􀇓";
    } else if (
      ["thunderstorm", "heavy thunderstorm", "ragged thunderstorm"].includes(
        desc
      )
    ) {
      return "􀇓";
    } else if (["light rain", "moderate rain"].includes(desc)) {
      // if (bIsDay) {
      //   return "􀇗";
      // } else {
      //   return "􀇝";
      // }
      return "􀇇";
    } else if (
      ["heavy intensity rain", "very heavy rain", "extreme rain"].includes(desc)
    ) {
      return "􀇇";
    } else if (["freezing rain"].includes(desc)) {
      return "􀇑";
    } else if (
      [
        "shower rain",
        "heavy intensity shower rain",
        "ragged shower rain",
      ].includes(desc)
    ) {
      return "􀇉";
    } else if (
      [
        "light snow",
        "snow",
        "heavy snow",
        "sleet",
        "light shower sleet",
        "shower sleet",
      ].includes(desc)
    ) {
      return "􀇏";
    } else if (
      [
        "light rain and snow",
        "rain and snow",
        "light shower snow",
        "shower snow",
        "heavy shower snow",
      ].includes(desc)
    ) {
      return "􀇑";
    } else if (
      ["mist", "smoke", "haze", "sand, dust whirls", "fog"].includes(desc)
    ) {
      return "􀇦";
    } else if (["sand", "dust"].includes(desc)) {
      return "􀇦";
    } else if (["volcanic ash"].includes(desc)) {
      return "􀵀";
    } else if (["squalls"].includes(desc)) {
      return "􀇧";
    } else if (["tornado"].includes(desc)) {
      return "􀇩";
    } else {
      if (bIsDay) {
        return "􀆮";
      } else {
        return "􀇁";
      }
    }
  }

  export function getColorByIcon(icon) {
    if (icon === "􀇅") {
      return '99, 206, 250'
    } else if (icon === "􀆮" || icon === "􀆲" || icon === "􀆴") {
      return '255, 213, 11'
    } else if (icon === "􀇟") {
      return '99, 206, 250'
    } else if (icon === "􀇇") {
      return '99, 206, 250'
    } else if (icon === "􀇇") {
      return '99, 206, 250'
    } else if (icon === "􀇑") {
      return '99, 206, 250'
    } else if (icon === "􀇉") {
      return '99, 206, 250'
    } else if (icon === "􀇏") {
      return '99, 206, 250'
    } else if (icon === "􀇑") {
      return '99, 206, 250'
    } else {
      return '255, 255, 255'
    }
  }


 
  export let forecastArraySample = [
    {
      dt: 1688763600,
      main: {
        temp: 23.66,
        feels_like: 24.61,
        temp_min: 22.25,
        temp_max: 23.66,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 996,
        humidity: 97,
        temp_kf: 1.41,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: {
        all: 100,
      },
      wind: {
        speed: 1.43,
        deg: 145,
        gust: 1.72,
      },
      visibility: 10000,
      pop: 0.21,
      rain: {
        "3h": 0.23,
      },
      sys: {
        pod: "d",
      },
      dt_txt: "2023-07-07 21:00:00",
    },
    {
      dt: 1688774400,
      main: {
        temp: 24.21,
        feels_like: 25.14,
        temp_min: 24.21,
        temp_max: 25.31,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 997,
        humidity: 94,
        temp_kf: -1.1,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: {
        all: 99,
      },
      wind: {
        speed: 1.35,
        deg: 178,
        gust: 2.28,
      },
      visibility: 10000,
      pop: 0.09,
      sys: {
        pod: "d",
      },
      dt_txt: "2023-07-08 00:00:00",
    },
    {
      dt: 1688785200,
      main: {
        temp: 26.36,
        feels_like: 26.36,
        temp_min: 26.36,
        temp_max: 27.71,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 997,
        humidity: 84,
        temp_kf: -1.35,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: {
        all: 97,
      },
      wind: {
        speed: 1.62,
        deg: 212,
        gust: 2.68,
      },
      visibility: 10000,
      pop: 0.35,
      rain: {
        "3h": 0.27,
      },
      sys: {
        pod: "d",
      },
      dt_txt: "2023-07-08 03:00:00",
    },
    {
      dt: 1688796000,
      main: {
        temp: 28.86,
        feels_like: 33.74,
        temp_min: 28.86,
        temp_max: 28.86,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 997,
        humidity: 77,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: {
        all: 98,
      },
      wind: {
        speed: 3.16,
        deg: 256,
        gust: 3.98,
      },
      visibility: 10000,
      pop: 0.79,
      rain: {
        "3h": 0.59,
      },
      sys: {
        pod: "d",
      },
      dt_txt: "2023-07-08 06:00:00",
    },
    {
      dt: 1688806800,
      main: {
        temp: 27.61,
        feels_like: 31.82,
        temp_min: 27.61,
        temp_max: 27.61,
        pressure: 1003,
        sea_level: 1003,
        grnd_level: 997,
        humidity: 85,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: {
        all: 90,
      },
      wind: {
        speed: 2.06,
        deg: 230,
        gust: 4.2,
      },
      visibility: 10000,
      pop: 0.46,
      rain: {
        "3h": 0.58,
      },
      sys: {
        pod: "d",
      },
      dt_txt: "2023-07-08 09:00:00",
    },
    {
      dt: 1688817600,
      main: {
        temp: 24.15,
        feels_like: 25.13,
        temp_min: 24.15,
        temp_max: 24.15,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 998,
        humidity: 96,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n",
        },
      ],
      clouds: {
        all: 61,
      },
      wind: {
        speed: 1.15,
        deg: 201,
        gust: 1.8,
      },
      visibility: 10000,
      pop: 0.38,
      rain: {
        "3h": 0.34,
      },
      sys: {
        pod: "n",
      },
      dt_txt: "2023-07-08 12:00:00",
    },
  ];

  export function getColorSet(main, timeState) {
    if (
      main === "Thunderstorm" ||
      main === "Drizzle" ||
      main === "Rain" ||
      main === "Snow"
      // main === "Atmosphere" ||
      // main === "Clouds"
    ) {
      if (timeState === "dawn") {
        return rainy_dawn;
      } else if (timeState === "noon") {
        return rainy_noon;
      } else if (timeState === "dusk") {
        return rainy_dusk;
      } else if (timeState === "night") {
        return rainy_night;
      }
    } else {
      if (timeState === "dawn") {
        return clear_dawn;
      } else if (timeState === "noon") {
        return clear_noon;
      } else if (timeState === "dusk") {
        return clear_dusk;
      } else if (timeState === "night") {
        return clear_night;
      }
    }
    // if (main === "Clear")
    // main === "Atmosphere" ||
    // main === "Clouds"
  }

  let delta = 0

  export function calcTimeState(weatherData) {
    // console.log(weatherData);
    let sunrise_time = weatherData?.sys?.sunrise;
    let time = weatherData?.dt;
    let sunset_time = weatherData?.sys?.sunset;
    let timezone = weatherData?.timezone;

    

    let sunrise = new Date((sunrise_time + timezone) * 1000).getUTCHours() ;
      let hour = new Date((time + timezone) * 1000).getUTCHours() + delta
      let sunset = new Date((sunset_time + timezone) * 1000).getUTCHours() ;

      let beforeSunrise = sunrise - hour
      let beforeSunset = sunset - hour
      let afterSunrise = hour - sunrise
      let afterSunset = hour - sunset

      let isBeforeSunrise = beforeSunrise > 0
      let isBeforeSunset = beforeSunset > 0

      let targetValue = 0

      // console.log(hour)

      let beforeSetData = {
        '0': {
          top: "#2e4777",
          middle: "#607caa",
          bottom: "#b0adad",
        },
        "1": {
          top: "#4c74aa",
          middle: "#4375ac",
          bottom: "#93aac1",
        },
        "2": {
          top: "#1f4684",
          middle: "#466fa5",
          bottom: "#7c9cc5",
        },
        "3": {
          top: "#144585",
          middle: "#3771a9",
          bottom: "#5f91c7",
        },
        "4": {
          top: "#204782",
          middle: "#426da4",
          bottom: "#668abe",
        },
        "5": {
          top: "#194884",
          middle: "#326daa",
          bottom: "#518cc8",
        },
        "6": {
          top: "#194785",
          middle: "#3170ae",
          bottom: "#4e8bc8",
        },
        "7": {
          top: "#1f4680",
          middle: "#406ba6",
          bottom: "#5b87c2",
        },
      }

      let afterSetData = {
        "0": {
          top: "#213561",
          middle: "#5c5f88",
          bottom: "#9e8381",
        },
        "1": {
          top: "#1f2d4d",
          middle: "#474b6b",
          bottom: "#77686f",
        },
        "2": {
          top: "#06071a",
          middle: "#1e2137",
          bottom: "#303751",
        },
        "3": {
          top: "#171717",
          middle: "#1d1f35",
          bottom: "#2b354e",
        },
        "4": {
          top: "#040416",
          middle: "#1e2137",
          bottom: "#2a354e",
        },
        "5": {
          top: "#020116",
          middle: "#1f213a",
          bottom: "#27324f",
        },
        // ungen (beforeSunrise 4~3)
        "6": {
          top: "#010116",
          middle: "#1e2038",
          bottom: "#27324e",
        },
        "7": {
          top: "#030314",
          middle: "#1e2036",
          bottom: "#28304b",
        },
      }

      let beforeSunriseData = {
        "0": {
          top: "#18223a",
          middle: "#2b324f",
          bottom: "#564d6b",
        },
        "1": {
          top: "#131c33",
          middle: "#262d4b",
          bottom: "#4e4867",
        },
        "2": {
          top: "#020214",
          middle: "#1e2039",
          bottom: "#293451",
        },
        "3": {
          top: "#030314",
          middle: "#1e2036",
          bottom: "#28304b",
        },
        "4": {
          top: "#010116",
          middle: "#1e2038",
          bottom: "#27324e",
        },
        // ungen (aftersunset 5~3)
        "5": {
          top: "#020116",
          middle: "#1f213a",
          bottom: "#27324f",
        },
        "6": {
          top: "#040416",
          middle: "#1e2137",
          bottom: "#2a354e",
        },
        "7": {
          top: "#171717",
          middle: "#1d1f35",
          bottom: "#2b354e",
        },
      }

      let afterSunriseData = {
        "0": {
          top: "#1d3159",
          middle: "#5e5f83",
          bottom: "#8a6a7d",
        },
        "1": {
          top: "#283f6e",
          middle: "#606b93",
          bottom: "#938498",
        },
        "2": {
          top: "#1c4882",
          middle: "#3f72aa",
          bottom: "#82a2c4",
        },
        "3": {
          top: "#1a4987",
          middle: "#3e76af",
          bottom: "#7ca3ca",
        },
        "4": {
          top: "#1c4480",
          middle: "#436fa8",
          bottom: "#5e8bc4",
        },
        "5": {
          top: "#1f4680",
          middle: "#4d76aa",
          bottom: "#7f9fc6",
        },
        "6": {
          top: "#1e457e",
          middle: "#406ca6",
          bottom: "#5c87c1",
        },
        "7": {
          top: "#1e457e",
          middle: "#406ca6",
          bottom: "#5c87c1",
        },
      }

      function processing(hexCodeSet) {
        try {
          let newHexCodeSet = {}
        Object.keys(hexCodeSet).forEach((key) => {
          let hexCode = hexCodeSet[key]
          function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          }
          let rgb = hexToRgb(hexCode)
          newHexCodeSet[key] = `${rgb.r}, ${rgb.g}, ${rgb.b}`
        })
        return newHexCodeSet
        } catch(e) {
          return clear_noon
        }
      }

      if (isBeforeSunrise) {
        if (isBeforeSunset) {
          if (beforeSunrise < beforeSunset) {
            // console.log(`${hour}시: 일출 ${beforeSunrise}시간 전`)
            return processing(beforeSunriseData[beforeSunrise])
          } else {
            // console.log(`${hour}시: 일몰 ${beforeSunset}시간 전`)
            return processing(beforeSetData[beforeSunset])
          }
        } else {
          if (beforeSunrise < afterSunset) {
            // console.log(`${hour}시: 일출 ${beforeSunrise}시간 전`)
            return processing(beforeSunriseData[beforeSunrise])
          } else {
            // console.log(`${hour}시: 일몰 ${afterSunset}시간 후`)
            return processing(afterSetData[afterSunset])
          }
        }
      } else {
        if (isBeforeSunset) {
          if (afterSunrise < beforeSunset) {
            // console.log(`${hour}시: 일출 ${afterSunrise}시간 후`)
            return processing(afterSunriseData[afterSunrise])
          } else {
            // console.log(`${hour}시: 일몰 ${beforeSunset}시간 전`)
            return processing(beforeSetData[beforeSunset])
          }
        } else {
          if (afterSunrise < afterSunset) {
            // console.log(`${hour}시: 일출 ${afterSunrise}시간 후`)
            return processing(afterSunriseData[afterSunrise])
          } else {
            // console.log(`${hour}시: 일몰 ${afterSunset}시간 후`)
            return processing(afterSetData[afterSunset])
          }
        }
      }

    // console.log({
    //   '일출 시작': sunrise - 1,
    //   '일출': sunrise,
    //   '일출 종료': sunrise + 1,
    // });
    // console.log({
    //   '낮 시작': sunrise + 1,
    //   '지금': hour,
    //   '낮 종료': sunset - 1,
    // });
    // console.log({
    //   '일몰 시작': sunset - 1,
    //   '일몰': sunset,
    //   '일몰 종료': sunset + 1,
    // });
    // console.log({
    //   '밤 시작': sunset + 1,
    //   '지금': hour,
    //   '밤 종료': sunrise - 1,
    // });

    if (sunrise - 1 <= hour && hour <= sunrise + 1) {
      return "dawn";
    } else if (sunrise + 1 < hour && hour < sunset - 1) {
      return "noon";
    } else if (sunset - 1 <= hour && hour <= sunset + 1) {
      return "dusk";
    } else if (sunset + 1 < hour) {
      return "night";
    } else {
      return "night";
    }
  }
import { fetchWeatherApi } from "openmeteo";
import moment from "moment";
import axios from "axios";

export async function FetchTimezone(site) {
  const lat = site.latitude;
  const long = site.longitude;

  try {
    return await axios
      .get(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.NEXT_PUBLIC_TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${long}`
      )
      .then((response) => response.data);
  } catch (err) {
    alert("Error obtaining Timezone");
    return false;
  }
}

export async function FetchHistoricWeather(site, timezone_name) {
  const lat = site.latitude;
  const long = site.longitude;

  const params = {
    latitude: lat,
    longitude: long,
    start_date: moment().subtract(14, "days").format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    timezone: timezone_name,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "temperature_2m_mean",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "apparent_temperature_mean",
      "sunrise",
      "sunset",
      "daylight_duration",
      "sunshine_duration",
      "precipitation_sum",
      "rain_sum",
      "snowfall_sum",
      "precipitation_hours",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "wind_direction_10m_dominant",
      "shortwave_radiation_sum",
      "et0_fao_evapotranspiration",
    ],
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
  };

  const url = "https://archive-api.open-meteo.com/v1/archive";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      temperature2mMean: daily.variables(3)!.valuesArray()!,
      apparentTemperatureMax: daily.variables(4)!.valuesArray()!,
      apparentTemperatureMin: daily.variables(5)!.valuesArray()!,
      apparentTemperatureMean: daily.variables(6)!.valuesArray()!,
      sunrise: daily.variables(7)!.valuesArray()!,
      sunset: daily.variables(8)!.valuesArray()!,
      daylightDuration: daily.variables(9)!.valuesArray()!,
      sunshineDuration: daily.variables(10)!.valuesArray()!,
      precipitationSum: daily.variables(11)!.valuesArray()!,
      rainSum: daily.variables(12)!.valuesArray()!,
      snowfallSum: daily.variables(13)!.valuesArray()!,
      precipitationHours: daily.variables(14)!.valuesArray()!,
      windSpeed10mMax: daily.variables(15)!.valuesArray()!,
      windGusts10mMax: daily.variables(16)!.valuesArray()!,
      windDirection10mDominant: daily.variables(17)!.valuesArray()!,
      shortwaveRadiationSum: daily.variables(18)!.valuesArray()!,
      et0FaoEvapotranspiration: daily.variables(19)!.valuesArray()!,
    },
  };

  let temperature = [];
  let precipitation = [];
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    temperature.push({
      Date: moment(weatherData.daily.time[i]).format("M/D/YY"),
      Min: isNaN(weatherData.daily.temperature2mMin[i])
        ? null
        : weatherData.daily.temperature2mMin[i].toFixed(2),
      Mean: isNaN(weatherData.daily.temperature2mMean[i])
        ? null
        : weatherData.daily.temperature2mMean[i].toFixed(2),
      Max: isNaN(weatherData.daily.temperature2mMax[i])
        ? null
        : weatherData.daily.temperature2mMax[i].toFixed(2),
    });

    precipitation.push({
      Date: moment(weatherData.daily.time[i]).format("M/D/YY"),
      Total: isNaN(weatherData.daily.precipitationSum[i])
        ? null
        : weatherData.daily.precipitationSum[i].toFixed(2),
      Snow: isNaN(weatherData.daily.snowfallSum[i])
        ? null
        : weatherData.daily.snowfallSum[i].toFixed(2),
      Rain: isNaN(weatherData.daily.rainSum[i])
        ? null
        : weatherData.daily.rainSum[i].toFixed(2),
    });
  }

  console.error({
    temperature,
    precipitation,
    weatherData,
  });

  return {
    temperature,
    precipitation,
  };
}

export async function FetchFlood(site) {
  const lat = site.latitude;
  const long = site.longitude;

  const params = {
    latitude: lat,
    longitude: long,
    daily: [
      "river_discharge",
      "river_discharge_mean",
      "river_discharge_median",
      "river_discharge_max",
      "river_discharge_min",
      "river_discharge_p25",
      "river_discharge_p75",
    ],
    past_days: 7,
  };
  const url = "https://flood-api.open-meteo.com/v1/flood";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      riverDischarge: daily.variables(0)!.valuesArray()!,
      riverDischargeMean: daily.variables(1)!.valuesArray()!,
      riverDischargeMedian: daily.variables(2)!.valuesArray()!,
      riverDischargeMax: daily.variables(3)!.valuesArray()!,
      riverDischargeMin: daily.variables(4)!.valuesArray()!,
      riverDischargeP25: daily.variables(5)!.valuesArray()!,
      riverDischargeP75: daily.variables(6)!.valuesArray()!,
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data

  let discharge = [];
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    discharge.push({
      Date: moment(weatherData.daily.time[i]).format("M/D/YY"),
      Discharge: isNaN(weatherData.daily.riverDischarge[i])
        ? null
        : weatherData.daily.riverDischarge[i].toFixed(2),
      "Discharge Mean": isNaN(weatherData.daily.riverDischargeMean[i])
        ? null
        : weatherData.daily.riverDischargeMean[i].toFixed(2),
      "Discharge Median": isNaN(weatherData.daily.riverDischargeMedian[i])
        ? null
        : weatherData.daily.riverDischargeMedian[i].toFixed(2),
      "Discharge Max": isNaN(weatherData.daily.riverDischargeMax[i])
        ? null
        : weatherData.daily.riverDischargeMax[i].toFixed(2),
      "Discharge Min": isNaN(weatherData.daily.riverDischargeMin[i])
        ? null
        : weatherData.daily.riverDischargeMin[i].toFixed(2),
    });
  }

  // console.error({
  //   discharge,
  //   weatherData,
  // });

  return { discharge };
}

export async function fetchForecast(site, timezone_name) {
  // console.error({
  //   start_date: moment().add(1, "days").format("YYYY-MM-DD"),
  //   end_date: moment().add(7, "days").format("YYYY-MM-DD"),
  // });

  const params = {
    latitude: site.latitude,
    longitude: site.longitude,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
    timezone: timezone_name,
    start_date: moment().add(1, "days").format("YYYY-MM-DD"),
    end_date: moment().add(7, "days").format("YYYY-MM-DD"),
  };
  const url = "https://api.open-meteo.com/v1/gfs";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
    },
  };

  var forecast = [];
  var weatherCode = [];

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    forecast.push({
      Date: moment(weatherData.daily.time[i]).format("M/D/YY"),
      Min: isNaN(weatherData.daily.temperature2mMin[i])
        ? null
        : weatherData.daily.temperature2mMin[i].toFixed(2),
      Max: isNaN(weatherData.daily.temperature2mMax[i])
        ? null
        : weatherData.daily.temperature2mMax[i].toFixed(2),
    });

    weatherCode.push({
      Date: moment(weatherData.daily.time[i]).format("M/D/YY"),
      Code: weatherData.daily.weatherCode[i],
    });
  }

  // console.error({ forecast, weatherCode });

  return { forecast, weatherCode };
}

export async function FetchClimate(site) {
  const lat = site.latitude;
  const long = site.longitude;
  const params = {
    latitude: lat,
    longitude: long,
    start_date: "1950-01-01",
    end_date: "2050-12-31",
    daily: ["temperature_2m_mean", "temperature_2m_max", "temperature_2m_min"],
  };
  const url = "https://climate-api.open-meteo.com/v1/climate";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2mMean: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  let climate = [];
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    climate.push({
      Date: moment(weatherData.daily.time[i]).format("M/D/YY"),
      Mean: isNaN(weatherData.daily.temperature2mMean[i])
        ? null
        : weatherData.daily.temperature2mMean[i].toFixed(2),
      Min: isNaN(weatherData.daily.temperature2mMin[i])
        ? null
        : weatherData.daily.temperature2mMin[i].toFixed(2),
      Max: isNaN(weatherData.daily.temperature2mMax[i])
        ? null
        : weatherData.daily.temperature2mMax[i].toFixed(2),
    });
  }

  // console.error({
  //   climate,
  //   weatherData,
  // });

  return { climate };
}

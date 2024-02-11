import { fetchWeatherApi } from "openmeteo";
import moment from "moment";
import axios from "axios";

export async function FetchTimezone(sites) {
  const lat = sites[0][0];
  const long = sites[0][1];

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

async function FetchWeather(sites) {
  const lat = sites[0][0];
  const long = sites[0][1];

  //   const params = {
  //     latitude: lat,
  //     longitude: long,
  //     start_date: moment().subtract(7, "days").format("YYYY-MM-DD"),
  //     end_date: moment().format("YYYY-MM-DD"),
  //     timezone: timezone_data.hasOwnProperty("data")
  //       ? timezone_data.data.zoneName
  //       : null,
  //     daily: [
  //       "weather_code",
  //       "temperature_2m_max",
  //       "temperature_2m_min",
  //       "temperature_2m_mean",
  //       "apparent_temperature_max",
  //       "apparent_temperature_min",
  //       "apparent_temperature_mean",
  //       "sunrise",
  //       "sunset",
  //       "daylight_duration",
  //       "sunshine_duration",
  //       "precipitation_sum",
  //       "rain_sum",
  //       "snowfall_sum",
  //       "precipitation_hours",
  //       "wind_speed_10m_max",
  //       "wind_gusts_10m_max",
  //       "wind_direction_10m_dominant",
  //       "shortwave_radiation_sum",
  //       "et0_fao_evapotranspiration",
  //     ],
  //     temperature_unit: "fahrenheit",
  //     wind_speed_unit: "mph",
  //     precipitation_unit: "inch",
  //   };

  //   const url = "https://archive-api.open-meteo.com/v1/archive";
  //   const responses = await fetchWeatherApi(url, params);

  //   // Helper function to form time ranges
  //   const range = (start: number, stop: number, step: number) =>
  //     Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  //   // Process first location. Add a for-loop for multiple locations or weather models
  //   const response = responses[0];

  //   // Attributes for timezone and location
  //   const utcOffsetSeconds = response.utcOffsetSeconds();
  //   const timezone = response.timezone();
  //   const timezoneAbbreviation = response.timezoneAbbreviation();
  //   const latitude = response.latitude();
  //   const longitude = response.longitude();

  //   const daily = response.daily()!;

  //   // Note: The order of weather variables in the URL query and the indices below need to match!
  //   const weatherData = {
  //     daily: {
  //       time: range(
  //         Number(daily.time()),
  //         Number(daily.timeEnd()),
  //         daily.interval()
  //       ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
  //       weatherCode: daily.variables(0)!.valuesArray()!,
  //       temperature2mMax: daily.variables(1)!.valuesArray()!,
  //       temperature2mMin: daily.variables(2)!.valuesArray()!,
  //       temperature2mMean: daily.variables(3)!.valuesArray()!,
  //       apparentTemperatureMax: daily.variables(4)!.valuesArray()!,
  //       apparentTemperatureMin: daily.variables(5)!.valuesArray()!,
  //       apparentTemperatureMean: daily.variables(6)!.valuesArray()!,
  //       sunrise: daily.variables(7)!.valuesArray()!,
  //       sunset: daily.variables(8)!.valuesArray()!,
  //       daylightDuration: daily.variables(9)!.valuesArray()!,
  //       sunshineDuration: daily.variables(10)!.valuesArray()!,
  //       precipitationSum: daily.variables(11)!.valuesArray()!,
  //       rainSum: daily.variables(12)!.valuesArray()!,
  //       snowfallSum: daily.variables(13)!.valuesArray()!,
  //       precipitationHours: daily.variables(14)!.valuesArray()!,
  //       windSpeed10mMax: daily.variables(15)!.valuesArray()!,
  //       windGusts10mMax: daily.variables(16)!.valuesArray()!,
  //       windDirection10mDominant: daily.variables(17)!.valuesArray()!,
  //       shortwaveRadiationSum: daily.variables(18)!.valuesArray()!,
  //       et0FaoEvapotranspiration: daily.variables(19)!.valuesArray()!,
  //     },
  //   };

  //   console.error({
  //     params,
  //     daily,
  //     utcOffsetSeconds,
  //     timezone,
  //     timezoneAbbreviation,
  //     latitude,
  //     longitude,
  //     weatherData,
  //   });

  //   // `weatherData` now contains a simple structure with arrays for datetime and weather data
  //   for (let i = 0; i < weatherData.daily.time.length; i++) {
  //     console.log(
  //       weatherData.daily.time[i].toISOString(),
  //       weatherData.daily.weatherCode[i],
  //       weatherData.daily.temperature2mMax[i],
  //       weatherData.daily.temperature2mMin[i],
  //       weatherData.daily.temperature2mMean[i],
  //       weatherData.daily.apparentTemperatureMax[i],
  //       weatherData.daily.apparentTemperatureMin[i],
  //       weatherData.daily.apparentTemperatureMean[i],
  //       weatherData.daily.sunrise[i],
  //       weatherData.daily.sunset[i],
  //       weatherData.daily.daylightDuration[i],
  //       weatherData.daily.sunshineDuration[i],
  //       weatherData.daily.precipitationSum[i],
  //       weatherData.daily.rainSum[i],
  //       weatherData.daily.snowfallSum[i],
  //       weatherData.daily.precipitationHours[i],
  //       weatherData.daily.windSpeed10mMax[i],
  //       weatherData.daily.windGusts10mMax[i],
  //       weatherData.daily.windDirection10mDominant[i],
  //       weatherData.daily.shortwaveRadiationSum[i],
  //       weatherData.daily.et0FaoEvapotranspiration[i]
  //     );
  //   }

  //   const params = {
  //     latitude: sites[0][0],
  //     longitude: sites[0][1],
  //     start_date: moment().subtract(7, "days").format("YYYY-MM-DD"),
  //     end_date: moment().format("YYYY-MM-DD"),
  //     hourly: "rain",
  //     temperature_unit: "fahrenheit",
  //   };

  //   // Process first location. Add a for-loop for multiple locations or weather models
  //   const response = responses[0];

  //   //   // Attributes for timezone and location
  //   const utcOffsetSeconds = response.utcOffsetSeconds();
  //   const timezone = response.timezone();
  //   const timezoneAbbreviation = response.timezoneAbbreviation();
  //   const latitude = response.latitude();
  //   const longitude = response.longitude();

  //   const daily = response.daily()!;

  //   // Note: The order of weather variables in the URL query and the indices below need to match!
  //   const weatherData = {
  //     daily: {
  //       time: range(
  //         Number(daily.time()),
  //         Number(daily.timeEnd()),
  //         daily.interval()
  //       ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
  //       rain: daily.variables(0)!.valuesArray()!,
  //     },
  //   };

  //   // `weatherData` now contains a simple structure with arrays for datetime and weather data
  //   //   for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //   //     console.log(
  //   //       weatherData.hourly.time[i].toISOString(),
  //   //       weatherData.hourly.rain[i]
  //   //     );
  //   //   }

  //   console.error({
  //     params,
  //     daily,
  //     utcOffsetSeconds,
  //     timezone,
  //     timezoneAbbreviation,
  //     latitude,
  //     longitude,
  //     weatherData,
  //   });

  //   return {
  //     daily,
  //     utcOffsetSeconds,
  //     timezone,
  //     timezoneAbbreviation,
  //     latitude,
  //     longitude,
  //     weatherData,
  //   };
}

import moment from "moment";

export function getCurrentPosition(options = {}) {
  if (navigator.geolocation) {
    return new Promise(
      (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
    )
  } else {
    return new Promise(
      resolve => resolve({})
    )
  }
}

export function formatTemp(temp){
  //formatting to fahrenheit
  let newTemp = Math.floor((temp - 273) * (9 / 5) + 32)
  return newTemp.toString() + "\xB0"
}

export function getTime(time){
  //converts time based on utc offset, which api provides
  return moment().utcOffset(time / 60).format("h:mm a")
}
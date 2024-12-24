// 1. Implement an auto-save mechanism and pretend to call an API (there should be a dummy REST API available out there that you can use). After 3 seconds when user did a change in the profile list, it should call an API and pass the profile list array. If user made a change before the 3 seconds, it will reset the timeout and wait for 3 seconds again.

const putProfilesApi = async function (profiles) {
  const response = await fetch("https://dummyjson.com/test", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profiles),
  });

  if (!response.ok) {
    const error = await response.text();
    throw error;
  }
  return response.json();
};

const debounce = function (func, wait = 0) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = null;
      func.apply(this, args);
    }, wait);
  };
};

export const putProfilesApiDebounced = debounce(putProfilesApi, 3000);

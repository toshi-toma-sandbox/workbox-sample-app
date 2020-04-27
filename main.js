console.log("main.js");

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

window.handleClick = () => {
  fetch("http://dummy.restapiexample.com/api/v1/create", {
    method: "POST",
    body: {},
  }).then(async (response) => {
    const res = await response.json();
    console.log(res)
  });
};

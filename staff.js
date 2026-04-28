const socket = io();
const list = document.getElementById("alerts");

socket.on("receiveAlert", (data) => {
  const li = document.createElement("li");
  li.innerHTML = `
    🚨 Alert Received<br>
    Lat: ${data.lat}<br>
    Lng: ${data.lng}<br>
    Time: ${new Date(data.time).toLocaleTimeString()}
  `;
  list.prepend(li);
});
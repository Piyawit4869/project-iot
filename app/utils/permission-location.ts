export async function checkAndRequestLocation() {
  const status = await navigator.permissions.query({
    name: "geolocation",
  });

  if (status.state === "granted") {
    getLocation();
  } else if (status.state === "prompt") {
    getLocation();
  } else {
    alert("กรุณาเปิดสิทธิ์ตำแหน่งในเบราว์เซอร์");
  }
}

export function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => console.log(pos.coords),
    () => alert("ดึงตำแหน่งไม่สำเร็จ")
  );
}

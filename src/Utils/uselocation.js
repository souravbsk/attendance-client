import Swal from "sweetalert2";

const useLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              if (latitude !== undefined && longitude !== undefined) {
                resolve({ latitude, longitude });
              } else {
                reject("Geolocation data is incomplete");
              }
            },
            (error) => {
              reject(`Geolocation Error: ${error.message}`);
            }
          );
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Turn on your location',
          })
          reject("Geolocation permission denied by the user.");
        }
      });
    } else {
      reject("Geolocation is not available in this browser.");
    }
  });
};

export default useLocation;

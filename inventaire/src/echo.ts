import Echo from "laravel-echo";
import io from "socket.io-client";

const echo = new Echo({
  broadcaster: "socket.io",
  host: "http://localhost:6001", // Remplacez par l'URL de votre serveur de sockets
  client:io,
  appId: 'dd2c891ab87debb8',
  key: '1b5d00a337a09cdd7be0fa8da8598432',
  authHost: 'http://localhost',
  authEndpoint: '/broadcasting/auth',
  // key: "17ba434774c72457d55bac7208f6f995",
  // appId: "ec572a8d9a45edf1",
  // encrypted: false,
  // transports: ["websocket"],


  // auth:{
  //   headers:{
  //     'Authorization':`Bearer APP_KEY=base64:1Ae4kK9mA25x3x3LjFY3ILajXm+Ct8Zni4wXJ3CLqJw=
  //     `
  //   }
  // }
});

export default echo;

import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: any; // Utilisez le type approprié pour Pusher si possible
  }
}

 window.Pusher = Pusher;

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: "eef1444b7931023414c7",
//   cluster: "eu", // Par exemple, mt1
//   encrypted: true, // Utilisez une connexion chiffrée (HTTPS)
// });

// declare global {
//     interface Window {
//       io: any; // Utilisez le type approprié pour Pusher si possible
//     }
//   }
  
//   window.io = io;
  
//   const echo = new Echo({
//     broadcaster: "socket.io",
//     host:'http://localhost:6001',

//   });


const echo = new Echo({
      broadcaster: 'pusher',
      key: '1234',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      cluster:''
  });

  console.log(window.location.hostname )

export default echo;

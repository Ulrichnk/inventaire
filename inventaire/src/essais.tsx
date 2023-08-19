import React, { FunctionComponent,useEffect } from "react";
import echo from "./laravelconfig";

const useEssais: FunctionComponent = () => {

  useEffect(() => {
    const channel = echo.channel('test'); // Utilisez window.Pusher

    channel.listen('UserEvent', (event: any) => {
      console.log('Nouveau message en temps réel:', event);
      // Mettez à jour l'état de votre application avec le nouveau message
    });

    return () => {
      channel.stopListening('UserEvent');
    };
  }, []);
  return <div></div>;
};

export default useEssais;

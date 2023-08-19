import React, { FunctionComponent, useEffect, useState } from "react";
import echo from "../laravelconfig";

type Props = {
  //define your props here
};

const Blog: FunctionComponent<Props> = () => {
  const [msg, setM] = useState<string>('default');

  // useEffect(() => {
  //   const channel = echo.channel("test"); // Remplacez par le nom de votre canal
  //   console.log("bjr");
  //   channel.listen("UserEvent", (event: any) => {
  //     // Gérez l'événement reçu
  //     console.log("Événement reçu :", event.data);
  //     setM(event.data);
  //   });
  //   console.log(channel);

  //   return () => {
  //     channel.stopListening("UserEvent");
  //   };
  // }, []);

  return <div>  {msg }</div>;
};

export default Blog;

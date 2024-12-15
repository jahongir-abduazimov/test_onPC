import React from "react";
import Detail from "./Detail";
import Characteristics from "./Characteristics";
import { useRouter } from "next/router";

function Detailpage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Detail id={id} />
      <Characteristics id={id} />
    </div>
  );
}

export default Detailpage;

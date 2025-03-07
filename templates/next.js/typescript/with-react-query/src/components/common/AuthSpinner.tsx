import React from "react";
import { Icon } from "@iconify/react";

const Spinner = () => {
  return (
    <div>
      <Icon
        icon="mynaui:spinner-solid"
        fontSize={20}
        className="animate-spin"
      />
    </div>
  );
};

export default Spinner;

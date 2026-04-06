// src/TooltipComponent.js
import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { MdPrivacyTip } from "react-icons/md";
function TooltipComponent({ info }) {
  return (
    <div style={{ padding: "0px" }}>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip-top">{info}</Tooltip>}
      >
        <span variant="">
          <img
            src="/images/tooltip_ico.jpeg"
            className="ps-2"
            alt="ToolTip"
            width={25}
          />
        </span>
      </OverlayTrigger>
    </div>
  );
}

export default TooltipComponent;

import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { GardensComposition } from "./GardensComposition.jsx";
const ReplayContainer = ({ replayData }) => {
  if (!replayData) return null;
  const fps = 30;
  const durationInFrames = replayData.rounds.length * 60 + 90;
  const handleDownload = () => {
    const jsonString = JSON.stringify(replayData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gardens-replay-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Replay data downloaded! (Note: Full video rendering requires a server, so we saved the match data for you!)");
  };
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: GardensComposition,
        inputProps: replayData,
        durationInFrames,
        fps,
        compositionWidth: 800,
        compositionHeight: 600,
        style: { width: "100%", height: "100%", maxHeight: "550px" },
        controls: true,
        autoPlay: true,
        loop: true
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 31,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: handleDownload,
        style: {
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontFamily: "Orbitron, sans-serif",
          alignSelf: "center"
        },
        children: "Download Replay Data"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 43,
        columnNumber: 13
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 30,
    columnNumber: 9
  });
};
let root = null;
const mountReplay = (containerId, data) => {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!root) {
    root = createRoot(container);
  }
  root.render(/* @__PURE__ */ jsxDEV(ReplayContainer, { replayData: data }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 73,
    columnNumber: 17
  }));
};
const unmountReplay = () => {
  if (root) {
    root.unmount();
    root = null;
  }
};
export {
  mountReplay,
  unmountReplay
};

import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { GardensComposition } from "./GardensComposition.jsx";
import { MainGameComposition } from "./MainGameComposition.jsx";
const ReplayContainer = ({ replayData, type }) => {
  if (!replayData) return null;
  const fps = 30;
  let Component;
  let durationInFrames;
  let inputProps;
  if (type === "gardens") {
    Component = GardensComposition;
    durationInFrames = replayData.rounds.length * 60 + 90;
    inputProps = replayData;
  } else if (type === "main") {
    Component = MainGameComposition;
    durationInFrames = replayData.frames.length;
    inputProps = replayData;
  }
  const handleDownload = () => {
    const jsonString = JSON.stringify(replayData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-replay-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    const btn = document.getElementById("replay-download-btn");
    if (btn) btn.textContent = "Rendering...";
    setTimeout(() => {
      if (btn) btn.textContent = "Download Replay Data (.json)";
      alert("Replay data saved! You can load this JSON in a compatible viewer.");
    }, 800);
  };
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }, children: [
    /* @__PURE__ */ jsxDEV(
      Player,
      {
        component: Component,
        inputProps,
        durationInFrames,
        fps,
        compositionWidth: 800,
        compositionHeight: 600,
        style: { width: "100%", maxWidth: "800px", flexGrow: 1, maxHeight: "550px", border: "2px solid #563d7c", borderRadius: "5px" },
        controls: true,
        autoPlay: true,
        loop: true
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 51,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { style: { display: "flex", gap: "10px", marginTop: "15px" }, children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        id: "replay-download-btn",
        onClick: handleDownload,
        className: "shop-button",
        style: { backgroundColor: "#28a745", fontSize: "16px" },
        children: "Download Replay Data (.json)"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 64,
        columnNumber: 17
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 63,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("p", { style: { marginTop: "10px", fontSize: "12px", color: "#aaa" }, children: "* Video export requires a backend server. Download the replay file to save your victory!" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 73,
      columnNumber: 14
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 50,
    columnNumber: 9
  });
};
let root = null;
const mountReplay = (containerId, data, type = "gardens") => {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!root) {
    root = createRoot(container);
  }
  root.render(/* @__PURE__ */ jsxDEV(ReplayContainer, { replayData: data, type }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 90,
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

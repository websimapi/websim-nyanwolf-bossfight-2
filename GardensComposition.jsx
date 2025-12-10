import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, Img, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
const CARROT_STAGES = [
  "/carrot_stage_0.png",
  "/carrot_stage_1.png",
  "/carrot_stage_2.png",
  "/carrot_stage_3.png",
  "/carrot_stage_4.png",
  "/carrot_stage_5.png"
];
const getStage = (size) => {
  if (size >= 65) return 5;
  if (size >= 45) return 4;
  if (size >= 25) return 3;
  if (size >= 10) return 2;
  if (size >= 1) return 1;
  return 0;
};
const GardensComposition = ({ rounds, playerAvatar, nyanwolfAvatar, winner, finalPlayerSize, finalEnemySize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const roundDuration = 60;
  let currentPlayerSize = 0;
  let currentEnemySize = 0;
  let roundText = "";
  rounds.forEach((round, index) => {
    const roundStart = index * roundDuration;
    const roundEnd = roundStart + roundDuration;
    if (frame >= roundStart) {
      const progress = interpolate(frame, [roundStart, roundEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      if (round.turn === "player") {
        currentPlayerSize = round.prevPlayerSize + round.growth * progress;
        currentEnemySize = round.prevEnemySize;
        if (frame < roundEnd) roundText = `Round ${round.roundNumber}: Player Waters! +${round.growth}`;
      } else {
        currentPlayerSize = round.prevPlayerSize;
        currentEnemySize = round.prevEnemySize + round.growth * progress;
        if (frame < roundEnd) roundText = `Round ${round.roundNumber}: Nyanwolf Waters! +${round.growth}`;
      }
    }
  });
  if (frame >= rounds.length * roundDuration) {
    currentPlayerSize = finalPlayerSize;
    currentEnemySize = finalEnemySize;
    roundText = winner === "player" ? "PLAYER WINS!" : winner === "enemy" ? "NYANWOLF WINS!" : "DRAW!";
  }
  const playerStage = getStage(currentPlayerSize);
  const enemyStage = getStage(currentEnemySize);
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#1e7e34" }, children: [
    /* @__PURE__ */ jsxDEV(Img, { src: "/garden_background.png", style: { width: "100%", height: "100%", objectFit: "cover" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 50,
      width: "100%",
      textAlign: "center",
      fontFamily: '"Press Start 2P", monospace',
      fontSize: 24,
      color: "white",
      textShadow: "2px 2px 0 #000"
    }, children: roundText }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 75,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: { position: "absolute", bottom: 50, left: 100, display: "flex", flexDirection: "column", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxDEV(Img, { src: playerAvatar, style: { width: 100, height: 100, marginBottom: -10 } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { width: 150, height: 120, display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV(Img, { src: CARROT_STAGES[playerStage], style: { width: "100%", objectFit: "contain" } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 92,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 91,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { fontFamily: '"Press Start 2P"', color: "white", marginTop: 10, textShadow: "1px 1px 0 #000" }, children: [
        "Size: ",
        Math.floor(currentPlayerSize)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 94,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 89,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: { position: "absolute", bottom: 50, right: 100, display: "flex", flexDirection: "column", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxDEV(Img, { src: nyanwolfAvatar, style: { width: 100, height: 100, marginBottom: -10 } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 101,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { width: 150, height: 120, display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV(Img, { src: CARROT_STAGES[enemyStage], style: { width: "100%", objectFit: "contain" } }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 103,
        columnNumber: 21
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 102,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { fontFamily: '"Press Start 2P"', color: "white", marginTop: 10, textShadow: "1px 1px 0 #000" }, children: [
        "Size: ",
        Math.floor(currentEnemySize)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 100,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 20,
      left: 20,
      color: "red",
      fontFamily: "monospace",
      fontSize: 20,
      fontWeight: "bold",
      animation: "blink 1s infinite"
    }, children: "\u25CF REPLAY" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 111,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 71,
    columnNumber: 9
  });
};
export {
  GardensComposition
};

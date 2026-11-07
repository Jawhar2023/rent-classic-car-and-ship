import { useEffect } from "react";

export function useSvgSprite() {
  useEffect(() => {
    if (document.getElementById("svg-sprite-inline")) return;

    fetch("/assets/images/svg-sprite.svg")
      .then((r) => r.text())
      .then((svg) => {
        const wrap = document.createElement("div");
        wrap.id = "svg-sprite-inline";
        wrap.style.display = "none";
        wrap.innerHTML = svg;
        document.body.insertBefore(wrap, document.body.firstChild);
        document.body.classList.add("svg-loaded");
      })
      .catch(() => document.body.classList.add("svg-loaded"));
  }, []);
}

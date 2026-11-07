import { useEffect } from "react";

export function useDocHeight() {
  useEffect(() => {
    const setDocHeight = () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight}px`);
      document.documentElement.style.setProperty("--slide-delay", "8000ms");
    };

    setDocHeight();
    window.addEventListener("resize", setDocHeight);
    return () => window.removeEventListener("resize", setDocHeight);
  }, []);
}

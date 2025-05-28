import { useEffect, useState, SetStateAction } from "react";

export const useResponsiveWindowSize = () => {
  const getDpr = () => {
    return window.devicePixelRatio;
  };

  const isScaled = () => {
    const dpr = getDpr();
    const isDesktop = window.innerWidth >= (dpr <= 2.5 ? 1024 : 900);
    return dpr > 1 && isDesktop;
  };
  const updateScale = () => {
    if (isScaled()) {
      document.documentElement.style.setProperty(
        "--scale-size",
        getDpr() <= 2.5 ? "1.2vw" : "1.2vw"
      );
    } else {
      document.documentElement.style.removeProperty("--scale-size");
    }
  };
  useEffect(() => {
    updateScale();
  }, []);
  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return { isScaled };
};

interface UseCountdownProps {
  timeLeft: number;
  isCounting: boolean;
  startTimer: () => void;
  formatTime: (seconds: number) => string;
  setIsCounting: React.Dispatch<SetStateAction<boolean>>;
}

export const useCountdown = (initialTime: number): UseCountdownProps => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | null = null;

    if (isCounting && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time > 1) {
            return time - 1;
          } else {
            setIsCounting(false);
            return initialTime;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCounting]);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  const startTimer = (): void => {
    setIsCounting(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min : ${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds} sec`;
  };

  return { timeLeft, isCounting, setIsCounting, startTimer, formatTime };
};

export enum Responsive {
  MOBILE = "mobile",
  DESKTOP = "desktop",
  TABLET = "tablet",
}

export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState<Responsive | null>(null);
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType(Responsive.MOBILE);
      } else if (window.innerWidth < 1024) {
        setDeviceType(Responsive.TABLET);
      } else {
        setDeviceType(Responsive.DESKTOP);
      }
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { deviceType, Responsive, windowDimensions };
};

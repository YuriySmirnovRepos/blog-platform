import { useEffect, useRef, useState } from "react";

/**
 * Хук для проверки переполнения контейнера
 *
 * @param options - Объект с опциями
 * @param options.direction - Направление проверки переполнения ('vertical' | 'horizontal' | 'both')
 * @param options.deps - Массив зависимостей для повторной проверки переполнения
 * @param options.listenResize - Флаг для добавления слушателя изменения размера окна
 * @returns Объект с ref для контейнера, флагом переполнения и функцией для ручной проверки
 */
export const useOverflowCheck = <T extends HTMLElement = HTMLDivElement>({
  direction = "vertical",
  deps = [],
  listenResize = true,
}: {
  direction?: "vertical" | "horizontal" | "both";
  deps?: any[];
  listenResize?: boolean;
} = {}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<T>(null);

  const checkOverflow = () => {
    if (!containerRef.current) return false;

    const container = containerRef.current;
    let overflowDetected = false;

    if (direction === "vertical" || direction === "both") {
      overflowDetected =
        overflowDetected || container.scrollHeight > container.clientHeight;
    }

    if (direction === "horizontal" || direction === "both") {
      overflowDetected =
        overflowDetected || container.scrollWidth > container.clientWidth;
    }

    setIsOverflowing(overflowDetected);
    return overflowDetected;
  };

  useEffect(() => {
    checkOverflow();

    if (listenResize) {
      window.addEventListener("resize", checkOverflow);
      return () => {
        window.removeEventListener("resize", checkOverflow);
      };
    }

    return undefined;
  }, [listenResize, ...deps]);

  return { containerRef, isOverflowing, checkOverflow };
};

export default useOverflowCheck;

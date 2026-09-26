"use client";

import { useMemo } from "react";
import { Style, Avatar } from "@dicebear/core";
import bottts from "@dicebear/styles/bottts.json" with { type: "json" };

const style = new Style(bottts);

interface DiceBearAvatarProps {
  seed: string;
  size?: number;
  className?: string;
}

const DiceBearAvatar = ({
  seed,
  size = 128,
  className,
}: DiceBearAvatarProps) => {
  const dataUri = useMemo(() => {
    return new Avatar(style, { seed, size }).toDataUri();
  }, [seed, size]);

  return (
    <img
      src={dataUri}
      alt={seed}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default DiceBearAvatar;

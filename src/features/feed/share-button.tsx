import { ReactNode } from "react";

import { getRandomPastelColor } from "@/components/shared/get-relative-time";

interface ShareButtonProps {
  title: string;

  children: ReactNode;
}

const ShareButton = function ({ title, children }: ShareButtonProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-16 w-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: getRandomPastelColor() }}
      >
        {children}
      </div>
      <span className="font-kumbh-sans font-normal text-sm text-primary/70 capitalize">
        {title}
      </span>
    </div>
  );
};

export default ShareButton;

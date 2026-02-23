declare module "framer-motion" {
  import * as React from "react";

  interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    variants?: any;
    transition?: any;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
  }

  export const motion: {
    div: React.FC<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    li: React.FC<MotionProps & React.HTMLAttributes<HTMLLIElement>>;
    ul: React.FC<MotionProps & React.HTMLAttributes<HTMLUListElement>>;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: "sync" | "wait" | "popLayout";
  }>;
}

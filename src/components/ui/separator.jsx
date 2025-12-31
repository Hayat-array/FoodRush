// "use client";

// import * as React from "react";
// import { cn } from "@/lib/utils";

// const Separator = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "shrink-0 bg-border",
//       orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
//       className
//     )}
//     {...props}
//   />
// ));

// Separator.displayName = "Separator";

// export { Separator };
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
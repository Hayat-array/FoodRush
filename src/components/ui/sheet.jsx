// // import { useState, useEffect } from "react";

// // export function Sheet({ children }) {
// //   return <div>{children}</div>;
// // }

// // export function SheetTrigger({ children, className = "", onClick, ...props }) {
// //   return (
// //     <div
// //       {...props}
// //       onClick={onClick}
// //       className={"cursor-pointer " + className}
// //     >
// //       {children}
// //     </div>
// //   );
// // }

// // export function SheetContent({ children, side = "left", className = "" }) {
// //   const [open, setOpen] = useState(true);

// //   // Close when pressing ESC
// //   useEffect(() => {
// //     function handleKey(e) {
// //       if (e.key === "Escape") setOpen(false);
// //     }
// //     window.addEventListener("keydown", handleKey);
// //     return () => window.removeEventListener("keydown", handleKey);
// //   }, []);

// //   if (!open) return null;

// //   const positionClass =
// //     side === "right"
// //       ? "right-0"
// //       : "left-0";

// //   return (
// //     <div className="fixed inset-0 z-50">
// //       {/* Background overlay */}
// //       <div
// //         className="absolute inset-0 bg-black/50"
// //         onClick={() => setOpen(false)}
// //       />

// //       {/* Sidebar drawer */}
// //       <div
// //         className={
// //           `fixed top-0 h-full w-72 bg-white shadow-xl p-4 transition-all duration-300 ${positionClass} ` +
// //           className
// //         }
// //       >
// //         {children}
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState, useEffect, cloneElement, isValidElement } from "react";

// /**
//  * Sheet - simple wrapper supporting controlled/uncontrolled open state.
//  * Usage:
//  *  <Sheet open={open} onOpenChange={setOpen}>
//  *    <SheetTrigger asChild> <Button/> </SheetTrigger>
//  *    <SheetContent>...</SheetContent>
//  *  </Sheet>
//  */
// export function Sheet({
//   children,
//   open: controlledOpen,
//   defaultOpen = false,
//   onOpenChange,
// }) {
//   const [openInternal, setOpenInternal] = useState(defaultOpen);
//   const isControlled = typeof controlledOpen === "boolean";
//   const open = isControlled ? controlledOpen : openInternal;

//   function setOpen(next) {
//     if (!isControlled) setOpenInternal(next);
//     onOpenChange?.(next);
//   }

//   // pass helpers via render-prop or plain children
//   return (
//     <div data-sheet-open={open}>
//       {typeof children === "function" ? children({ open, setOpen }) : children}
//     </div>
//   );
// }

// /**
//  * SheetTrigger
//  * - supports `asChild` prop (when true, it clones child element and attaches handlers)
//  * - avoids passing unknown props (like asChild) to DOM nodes
//  */
// export function SheetTrigger({ children, asChild = false, className = "", onClick, ...rest }) {
//   // Remove props we don't want forwarded to DOM
//   const safeProps = { ...rest };
//   delete safeProps.asChild;

//   if (asChild && isValidElement(children)) {
//     return cloneElement(children, {
//       onClick: (e) => {
//         children.props?.onClick?.(e);
//         onClick?.(e);
//       },
//       className: [children.props?.className, className].filter(Boolean).join(" "),
//       ...safeProps,
//     });
//   }

//   return (
//     <div {...safeProps} onClick={onClick} className={"cursor-pointer " + className}>
//       {children}
//     </div>
//   );
// }

// /**
//  * SheetContent
//  * - visual drawer. Parent Sheet controls visibility; you can call setOpen(false) where you have access.
//  */
// export function SheetContent({ children, side = "right", className = "", style = {} }) {
//   const positionClass = side === "left" ? "left-0" : "right-0";
//   return (
//     <div className={`fixed inset-0 z-50 flex ${positionClass === "left-0" ? "justify-start" : "justify-end"}`}>
//       <div className="absolute inset-0 bg-black/50" />
//       <div
//         className={`relative h-full w-80 bg-white shadow-xl p-4 ${className}`}
//         style={style}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { X } from "lucide-react";

// 1. Create Context so components can share the 'open' state
const SheetContext = createContext(null);

export function Sheet({ children, open: controlledOpen, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  
  // Determine if we are controlled (props provided) or uncontrolled (local state)
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (newOpen) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, asChild, className = "", ...props }) {
  const context = useContext(SheetContext);
  if (!context) throw new Error("SheetTrigger must be used within a Sheet");

  const handleClick = (e) => {
    // Call user's onClick if it exists
    if (props.onClick) props.onClick(e);
    // Toggle state
    context.setOpen(!context.open);
  };

  // If asChild is true, we clone the child element to avoid nesting a button inside a div
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: `${children.props.className || ""} ${className}`,
      onClick: handleClick,
    });
  }

  return (
    <button className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function SheetContent({ side = "right", className = "", children, ...props }) {
  const { open, setOpen } = useContext(SheetContext);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />
      
      {/* Drawer Panel */}
      <div
        className={`relative z-50 h-full w-full max-w-sm bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${className}`}
        {...props}
      >
        {/* Built-in Close Button (Optional, since Navbar has its own) */}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {children}
      </div>
    </div>
  );
}

// --- MISSING COMPONENTS ADDED BELOW ---

export function SheetHeader({ className = "", ...props }) {
  return (
    <div
      className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
      {...props}
    />
  );
}

export function SheetFooter({ className = "", ...props }) {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
      {...props}
    />
  );
}

export function SheetTitle({ className = "", ...props }) {
  return (
    <h3
      className={`text-lg font-semibold text-gray-950 ${className}`}
      {...props}
    />
  );
}

export function SheetDescription({ className = "", ...props }) {
  return (
    <p
      className={`text-sm text-gray-500 ${className}`}
      {...props}
    />
  );
}
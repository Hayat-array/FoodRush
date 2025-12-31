// export function Badge({ children, className = '', ...props }) {
//   return (
//     <span
//       {...props}
//       className={'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ' + className}
//     >
//       {children}
//     </span>
//   );
// }
// export default Badge;
import * as React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      {...props}
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
import { useState } from 'react';

// Very small, accessible Select with trigger/value/content structure
export function Select({ value: controlledValue, onValueChange, children, className = '' }) {
  // This is a tiny shim — use for simple cases only.
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(controlledValue || '');

  function handleSelect(val) {
    setValue(val);
    onValueChange?.(val);
    setOpen(false);
  }

  return (
    <div className={'relative inline-block text-left ' + className}>
      <div onClick={() => setOpen((s) => !s)}>
        {/* Consumer will render SelectTrigger and SelectValue via props/cloning in real UI libs.
            For simplicity, we expect the developer to use SelectTrigger/SelectValue components below
            but this minimal implementation supports direct children rendering too. */}
      </div>

      {open && (
        <div className="mt-1 z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-sm">
          {/*
            We expect SelectItem components to be used as children and will clone them,
            but for brevity just render children and pass handleSelect via context-like prop.
          */}
          {typeof children === 'function' ? children({ onSelect: handleSelect, value }) : children}
        </div>
      )}
    </div>
  );
}

// Simple subcomponents
export function SelectTrigger({ children, onClick, className = '', ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={'w-full inline-flex items-center justify-between px-3 py-2 rounded-md border ' + className}
      {...props}
    >
      {children}
    </button>
  );
}

export function SelectValue({ value, placeholder = 'Select...', className = '' }) {
  return <span className={'truncate ' + className}>{value || placeholder}</span>;
}

export function SelectContent({ children, className = '' }) {
  return <div className={'py-1 ' + className}>{children}</div>;
}

export function SelectItem({ children, value, onSelect, className = '' }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(value)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect?.(value)}
      className={'cursor-pointer px-3 py-2 rounded-md hover:bg-muted/50 ' + className}
      data-value={value}
    >
      {children}
    </div>
  );
}

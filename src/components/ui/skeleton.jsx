// lightweight Skeleton component for loading placeholders
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      role="status"
      aria-live="polite"
      {...props}
      className={
        'animate-pulse bg-muted rounded-md inline-block ' + className
      }
    />
  );
}

export default Skeleton;

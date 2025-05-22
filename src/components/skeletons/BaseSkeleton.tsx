const BaseSkeleton = ({ className = '' }: { className?: string }) => (
  <div
    data-testid="loading-skeleton"
    className={`animate-pulse bg-gray-200 ${className}`}
  />
);

export default BaseSkeleton;

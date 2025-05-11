const BaseSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`} />
);

export default BaseSkeleton;

import { LoaderIcon } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

const LoadingState = ({
  title = "Loading...",
  description = "Please wait while we fetch your data.",
}: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <LoaderIcon className="size-8 animate-spin text-muted-foreground" />
      <div className="text-center space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default LoadingState;

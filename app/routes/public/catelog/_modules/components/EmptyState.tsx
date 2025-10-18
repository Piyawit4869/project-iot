import { ShoppingBag } from "lucide-react";
import { Button } from "~/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No products found",
  description = "Try adjusting your search or filter criteria to find what you're looking for.",
  actionLabel = "Clear filters",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-2xl bg-muted/30 p-6 mb-4">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction} variant="outline" className="rounded-2xl">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

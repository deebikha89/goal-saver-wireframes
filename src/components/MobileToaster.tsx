import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle } from "@/components/ui/toast";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";
import * as React from "react";

// Custom viewport for mobile frame
const MobileToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "absolute top-4 right-4 left-4 z-50 flex max-h-screen w-auto flex-col gap-2",
      className,
    )}
    {...props}
  />
));
MobileToastViewport.displayName = "MobileToastViewport";

export function MobileToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="pointer-events-auto">
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <MobileToastViewport />
    </ToastProvider>
  );
}
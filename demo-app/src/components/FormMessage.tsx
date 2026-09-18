import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "error" | "success" | "warning" | "info";

interface FormMessageProps {
  message: string | null | undefined;
  variant?: Variant;
  className?: string;
}

const CONFIG: Record<Variant, { container: string; Icon: typeof AlertCircle }> = {
  error: { container: "bg-red-50 text-red-700 border border-red-200", Icon: AlertCircle },
  success: { container: "bg-green-50 text-green-700 border border-green-200", Icon: CheckCircle2 },
  warning: { container: "bg-amber-50 text-amber-700 border border-amber-200", Icon: AlertTriangle },
  info: { container: "bg-blue-50 text-blue-700 border border-blue-200", Icon: Info },
};

export function FormMessage({ message, variant = "error", className }: FormMessageProps) {
  if (!message) return null;
  const { container, Icon } = CONFIG[variant];
  return (
    <div className={cn("flex items-start gap-2.5 rounded-xl p-3 text-sm", container, className)}>
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

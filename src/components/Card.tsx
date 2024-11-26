import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glass";
}

export const Card = ({ children, className, variant = "default", ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg p-6",
        variant === "glass" ? "glass-card" : "bg-white shadow-md",
        "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
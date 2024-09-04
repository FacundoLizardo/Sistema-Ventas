import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import React from "react";

export default function ButtonWithLoading({
  loading,
  loadingText,
  ...props
}: {
  loading?: boolean;
  loadingText: string;
} & ButtonProps) {
  return (
    <Button {...props}>
      {loading && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
      {loading ? loadingText : props.children}
    </Button>
  );
}

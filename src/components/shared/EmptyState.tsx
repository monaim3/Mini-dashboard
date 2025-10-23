import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-md shadow-md border border-dashed border-gray-300">
          <CardContent className="p-8 flex flex-col items-center space-y-4">
            <Package className="w-12 h-12 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

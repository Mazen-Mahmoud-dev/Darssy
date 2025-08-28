import { Wallet } from "lucide-react";

export default function WalletBadge({ balance }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 transition-colors">
      <p className="ml-3">المحفظة:</p>
      <Wallet className="w-5 h-5 text-gray-500" />
      <span className="text-sm font-medium text-gray-800">{balance} ج.م</span>
    </div>
  );
}

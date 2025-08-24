import { LucideIcon } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  color: string;
  description?: string;
}

export default function ScoreCard({ title, score, icon: Icon, color, description }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="text-center p-4 bg-gray-50 rounded-xl">
      <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
        {score}
      </div>
      <p className="text-sm text-gray-600">{title}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}

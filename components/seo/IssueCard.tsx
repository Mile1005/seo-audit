import { AlertTriangle, XCircle, Info } from 'lucide-react';

interface IssueCardProps {
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  recommendation: string;
}

export default function IssueCard({ type, title, description, impact, recommendation }: IssueCardProps) {
  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        {getIssueIcon(type)}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(impact)}`}>
              {impact} impact
            </span>
          </div>
          <p className="text-gray-600 mb-3">{description}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Recommendation:</strong> {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

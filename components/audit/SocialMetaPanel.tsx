"use client";
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Link as LinkIcon, CheckCircle, XCircle } from 'lucide-react';
import { ComprehensiveResults } from '../../lib/types/audit';

interface Props { social: ComprehensiveResults['social_meta'] }
export const SocialMetaPanel = ({ social }: Props) => {
  const entries = [
    ['og:title', social.og_title],
    ['og:description', social.og_description], 
    ['og:image', social.og_image],
    ['twitter:card', social.twitter_card],
    ['twitter:title', social.twitter_title],
    ['twitter:description', social.twitter_description]
  ];
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border-2 border-indigo-200 dark:border-indigo-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-indigo-900 dark:text-indigo-100">
          <div className="p-2 bg-indigo-500 rounded-lg">
            <LinkIcon className="h-5 w-5 text-white" />
          </div>
          Social Media Meta Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map(([k,v]) => (
          <div key={k} className="flex items-center justify-between p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-3">
              {v ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="font-medium text-slate-900 dark:text-slate-100">{k}</span>
            </div>
            <span className={`text-sm font-medium truncate max-w-[200px] text-right ${
              v ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {v || 'Missing'}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

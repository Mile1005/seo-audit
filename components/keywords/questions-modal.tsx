'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { X, Eye, Lightbulb, TrendingUp, Download, Plus, Search as SearchIcon, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Question {
  question: string;
  volume: number;
  difficulty: number;
  type: 'what' | 'how' | 'why' | 'when' | 'where' | 'who';
  intent: 'INFORMATIONAL' | 'COMMERCIAL' | 'TRANSACTIONAL';
  opportunityScore: number;
}

interface QuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseKeyword: string;
  baseVolume: number;
  questions?: string[];
}

export function QuestionsModal({ 
  isOpen, 
  onClose, 
  baseKeyword, 
  baseVolume,
  questions = []
}: QuestionsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'what' | 'how' | 'why' | 'when' | 'where' | 'who'>('all');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Generate comprehensive questions
  const generateQuestions = (): Question[] => {
    const questionTemplates = {
      what: [
        `what is ${baseKeyword}`,
        `what are ${baseKeyword} tools`,
        `what does ${baseKeyword} mean`,
        `what ${baseKeyword} do I need`,
        `what is the best ${baseKeyword}`,
        `what are ${baseKeyword} benefits`,
        `what is ${baseKeyword} used for`,
        `what ${baseKeyword} works best`,
        `what are ${baseKeyword} features`,
        `what is ${baseKeyword} software`,
        `what makes ${baseKeyword} effective`,
        `what ${baseKeyword} should I use`,
        `what is ${baseKeyword} pricing`,
        `what ${baseKeyword} alternatives exist`,
        `what is ${baseKeyword} strategy`,
      ],
      how: [
        `how to do ${baseKeyword}`,
        `how to use ${baseKeyword}`,
        `how does ${baseKeyword} work`,
        `how to get ${baseKeyword}`,
        `how to start ${baseKeyword}`,
        `how to improve ${baseKeyword}`,
        `how to learn ${baseKeyword}`,
        `how much does ${baseKeyword} cost`,
        `how long does ${baseKeyword} take`,
        `how to choose ${baseKeyword}`,
        `how to optimize ${baseKeyword}`,
        `how to implement ${baseKeyword}`,
        `how to measure ${baseKeyword}`,
        `how to automate ${baseKeyword}`,
        `how to track ${baseKeyword}`,
        `how to analyze ${baseKeyword}`,
        `how to compare ${baseKeyword}`,
        `how to find ${baseKeyword}`,
        `how to set up ${baseKeyword}`,
        `how to master ${baseKeyword}`,
      ],
      why: [
        `why is ${baseKeyword} important`,
        `why use ${baseKeyword}`,
        `why ${baseKeyword} matters`,
        `why do you need ${baseKeyword}`,
        `why is ${baseKeyword} so popular`,
        `why ${baseKeyword} is essential`,
        `why invest in ${baseKeyword}`,
        `why ${baseKeyword} is effective`,
        `why choose ${baseKeyword}`,
        `why ${baseKeyword} works`,
      ],
      when: [
        `when to use ${baseKeyword}`,
        `when should I start ${baseKeyword}`,
        `when is ${baseKeyword} needed`,
        `when to do ${baseKeyword}`,
        `when to implement ${baseKeyword}`,
        `when to upgrade ${baseKeyword}`,
        `when is ${baseKeyword} most effective`,
        `when to invest in ${baseKeyword}`,
      ],
      where: [
        `where to find ${baseKeyword}`,
        `where to get ${baseKeyword}`,
        `where to learn ${baseKeyword}`,
        `where to buy ${baseKeyword}`,
        `where to use ${baseKeyword}`,
        `where to start ${baseKeyword}`,
        `where to download ${baseKeyword}`,
        `where to access ${baseKeyword}`,
      ],
      who: [
        `who needs ${baseKeyword}`,
        `who uses ${baseKeyword}`,
        `who should use ${baseKeyword}`,
        `who invented ${baseKeyword}`,
        `who benefits from ${baseKeyword}`,
        `who offers ${baseKeyword}`,
        `who provides ${baseKeyword}`,
        `who recommends ${baseKeyword}`,
      ]
    };

    const allQuestions: Question[] = [];

    // Add provided questions first
    if (questions && questions.length > 0) {
      questions.forEach(q => {
        const type = (
          q.toLowerCase().startsWith('what') ? 'what' :
          q.toLowerCase().startsWith('how') ? 'how' :
          q.toLowerCase().startsWith('why') ? 'why' :
          q.toLowerCase().startsWith('when') ? 'when' :
          q.toLowerCase().startsWith('where') ? 'where' :
          'who'
        ) as Question['type'];

        allQuestions.push({
          question: q,
          volume: Math.floor(baseVolume * (0.05 + Math.random() * 0.15)),
          difficulty: 20 + Math.random() * 40,
          type,
          intent: 'INFORMATIONAL',
          opportunityScore: 50 + Math.random() * 40
        });
      });
    }

    // Generate from templates
    Object.entries(questionTemplates).forEach(([type, templates]) => {
      templates.forEach(template => {
        const volume = Math.floor(baseVolume * (0.03 + Math.random() * 0.12));
        const difficulty = 15 + Math.random() * 35;
        const opportunityScore = Math.floor(
          (volume / 100) * 0.3 + 
          (100 - difficulty) * 0.5 + 
          Math.random() * 20
        );

        allQuestions.push({
          question: template,
          volume,
          difficulty,
          type: type as Question['type'],
          intent: type === 'how' && template.includes('buy') ? 'TRANSACTIONAL' : 
                   type === 'where' && template.includes('buy') ? 'COMMERCIAL' :
                   'INFORMATIONAL',
          opportunityScore: Math.min(100, opportunityScore)
        });
      });
    });

    // Sort by opportunity score
    return allQuestions.sort((a, b) => b.opportunityScore - a.opportunityScore);
  };

  const allQuestions = useMemo(() => generateQuestions(), [baseKeyword, baseVolume]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    let filtered = allQuestions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterType !== 'all') {
      filtered = filtered.filter(q => q.type === filterType);
    }

    return filtered;
  }, [allQuestions, searchQuery, filterType]);

  const getQuestionEmoji = (type: Question['type']) => {
    const emojis = {
      what: '❓',
      how: '🔧',
      why: '💡',
      when: '⏰',
      where: '📍',
      who: '👤'
    };
    return emojis[type];
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const toggleQuestionSelection = (question: string) => {
    setSelectedQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Question', 'Volume', 'Difficulty', 'Type', 'Intent', 'Opportunity Score'],
      ...filteredQuestions.map(q => [
        q.question,
        q.volume,
        Math.round(q.difficulty),
        q.type,
        q.intent,
        Math.round(q.opportunityScore)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseKeyword}-questions.csv`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                Question Keywords
              </h2>
              <p className="text-slate-600 font-medium mt-1">
                <span className="text-blue-700 font-bold">{filteredQuestions.length}</span> questions for "<span className="font-semibold">{baseKeyword}</span>"
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-blue-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-300"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'what', 'how', 'why', 'when', 'where', 'who'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filterType === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>

          {selectedQuestions.length > 0 && (
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {selectedQuestions.length} to Tracking
            </Button>
          )}
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredQuestions.map((q, index) => (
              <div
                key={index}
                className={`group p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  selectedQuestions.includes(q.question)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                }`}
                onClick={() => toggleQuestionSelection(q.question)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.question)}
                    onChange={() => {}}
                    className="w-4 h-4 text-purple-600 rounded mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xl">{getQuestionEmoji(q.type)}</span>
                      <h4 className="font-semibold text-slate-900 flex-1">{q.question}</h4>
                      <Badge className={`px-3 py-1 font-bold border-0 whitespace-nowrap ${getOpportunityColor(q.opportunityScore)}`}>
                        {Math.round(q.opportunityScore)} Score
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap ml-8">
                      <span className="text-sm font-medium text-slate-600 flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5 text-blue-600" />
                        <span className="font-bold text-blue-700">{q.volume.toLocaleString()}</span> /mo
                      </span>
                      <span className="text-sm font-medium text-slate-600">
                        KD: <span className="font-bold text-slate-700">{Math.round(q.difficulty)}%</span>
                      </span>
                      <Badge className="text-xs bg-blue-100 text-blue-700 border-0 font-semibold">
                        {q.type.toUpperCase()}
                      </Badge>
                      <Badge className="text-xs bg-purple-100 text-purple-700 border-0 font-semibold">
                        {q.intent}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredQuestions.length}</span> of <span className="font-bold text-slate-900">{allQuestions.length}</span> questions
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

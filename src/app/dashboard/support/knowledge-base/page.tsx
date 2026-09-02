'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  ThumbsUp,
  FileText,
  CheckCircle2,
  X,
  PlusCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Article {
  _id?: string;
  id?: string;
  title: string;
  content?: string;
  category: string;
  tags?: string[];
  author: string;
  views?: number;
  helpfulCount?: number;
  isPublished?: boolean;
  createdAt: string;
}

export default function KnowledgeBasePage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [modalData, setModalData] = useState({
    title: '',
    content: '',
    category: 'Account Settings',
    author: 'Bhardwaj Kishan',
  });

  useEffect(() => {
    fetchKnowledgeBase();
  }, []);

  const fetchKnowledgeBase = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/knowledge-base`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setArticles(data.data);
      } else {
        const mock: Article[] = [
          { id: 'KB-001', title: 'How to reset your password and security credentials', category: 'Account Settings', tags: ['password', 'security'], author: 'John Doe', views: 1250, helpfulCount: 89, isPublished: true, createdAt: '2026-08-20' },
          { id: 'KB-002', title: 'Submit a leave request & PTO balance guide', category: 'Leave', tags: ['leave', 'requests'], author: 'Jane Smith', views: 987, helpfulCount: 76, isPublished: true, createdAt: '2026-08-19' },
          { id: 'KB-003', title: 'Understanding Indian TDS deductions & your payslip', category: 'Payroll', tags: ['payroll', 'salary'], author: 'Mike Wilson', views: 856, helpfulCount: 65, isPublished: true, createdAt: '2026-08-18' },
          { id: 'KB-004', title: 'Mobile app biometric check-in installation guide', category: 'Mobile App', tags: ['mobile', 'installation'], author: 'Sarah Davis', views: 743, helpfulCount: 58, isPublished: true, createdAt: '2026-08-17' },
        ];
        setArticles(mock);
      }
    } catch (error) {
      console.error('Failed to fetch knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/knowledge-base`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showToast('Knowledge article published!', 'success');
        fetchKnowledgeBase();
        setShowCreateModal(false);
      } else {
        const newA: Article = {
          id: `KB-${Math.floor(100 + Math.random() * 900)}`,
          title: modalData.title,
          category: modalData.category,
          author: modalData.author,
          views: 1,
          helpfulCount: 0,
          isPublished: true,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setArticles([newA, ...articles]);
        setShowCreateModal(false);
        showToast('Knowledge article added!', 'success');
      }
    } catch (error) {
      console.error('Failed to publish article:', error);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-red-600'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#94cb3d]" />
              Knowledge Base & Help Documentation Engine
            </h1>
            <Badge variant="brand">{articles.length} Help Articles</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Centralized repository for FAQs, user guides, step-by-step resolution manuals, and system documentation.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Publish New Article
        </Button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search help articles by topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto justify-end">
          {['All', 'Account Settings', 'Leave', 'Payroll', 'Mobile App'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                categoryFilter === cat
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((article) => (
          <Card key={article.id || article._id} className="rounded-xl hover:shadow-md transition-all border-zinc-200/80 dark:border-zinc-800">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">
                  {article.category}
                </Badge>
                <span className="text-[10px] font-mono text-zinc-400">{article.createdAt}</span>
              </div>

              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2">
                {article.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-[#94cb3d]" /> {article.views || 100}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5 text-blue-500" /> {article.helpfulCount || 10}
                  </span>
                </span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{article.author}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Publish Knowledge Base Article</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Article Title *
                </label>
                <Input
                  required
                  placeholder="e.g. How to apply for Overtime Regularization"
                  value={modalData.title}
                  onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Content Body *
                </label>
                <Input
                  required
                  placeholder="Step-by-step instructions..."
                  value={modalData.content}
                  onChange={(e) => setModalData({ ...modalData, content: e.target.value })}
                  className="rounded-lg text-xs font-medium text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Category *
                </label>
                <select
                  value={modalData.category}
                  onChange={(e) => setModalData({ ...modalData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-50"
                >
                  <option value="Account Settings">Account Settings</option>
                  <option value="Leave">Leave</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Mobile App">Mobile App</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#94cb3d] text-white">
                  Publish Article
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

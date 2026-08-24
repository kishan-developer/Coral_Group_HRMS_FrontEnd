'use client';

import { useState } from 'react';
import { X, FileText, Mail, Phone, Calendar, MapPin, GraduationCap, Briefcase, ArrowRight, MessageSquare, Clock } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  appliedFor: string;
  source: string;
  appliedDate: string;
  currentStage: string;
  resumeUrl?: string;
  notes?: string[];
  interviews?: Array<{
    type: string;
    date: string;
    interviewer: string;
    status: string;
  }>;
}

interface CandidateProfileModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onMoveStage: (id: string, stage: string) => void;
  onScheduleInterview: (id: string) => void;
  onAddNote: (id: string, note: string) => void;
  onReject: (id: string) => void;
}

export default function CandidateProfileModal({
  candidate,
  isOpen,
  onClose,
  onMoveStage,
  onScheduleInterview,
  onAddNote,
  onReject,
}: CandidateProfileModalProps) {
  const [newNote, setNewNote] = useState('');
  const [selectedStage, setSelectedStage] = useState('');

  if (!isOpen || !candidate) return null;

  const getStageBadge = (stage: string) => {
    const styles: Record<string, string> = {
      applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      screening: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      interview: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      selected: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      offer: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[stage] || 'bg-gray-100 text-gray-700'}`}>
        {stage.charAt(0).toUpperCase() + stage.slice(1)}
      </span>
    );
  };

  const handleAddNote = () => {
    if (newNote) {
      onAddNote(candidate.id, newNote);
      setNewNote('');
    }
  };

  const handleMoveStage = () => {
    if (selectedStage) {
      onMoveStage(candidate.id, selectedStage);
      setSelectedStage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
      <div className="h-full w-full max-w-lg bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Candidate Profile</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xl font-medium text-zinc-600 dark:text-zinc-400">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{candidate.name}</h3>
              <p className="text-sm text-zinc-500">{candidate.appliedFor}</p>
              <div className="mt-2">{getStageBadge(candidate.currentStage)}</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Contact Information</h4>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Mail className="h-4 w-4" />
              <span>{candidate.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Phone className="h-4 w-4" />
              <span>{candidate.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <MapPin className="h-4 w-4" />
              <span>{candidate.location}</span>
            </div>
          </div>

          {/* Experience & Education */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Experience & Education</h4>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <Briefcase className="h-4 w-4" />
              <span>{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <GraduationCap className="h-4 w-4" />
              <span>{candidate.education}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume */}
          {candidate.resumeUrl && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Resume</h4>
              <button
                onClick={() => window.open(candidate.resumeUrl, '_blank')}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <FileText className="h-4 w-4" />
                View Resume
              </button>
            </div>
          )}

          {/* Application Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Application Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-zinc-500">Source</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100 capitalize">{candidate.source}</p>
              </div>
              <div>
                <p className="text-zinc-500">Applied Date</p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{candidate.appliedDate}</p>
              </div>
            </div>
          </div>

          {/* Interview History */}
          {candidate.interviews && candidate.interviews.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Interview History</h4>
              <div className="space-y-2">
                {candidate.interviews.map((interview, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{interview.type}</p>
                      <p className="text-xs text-zinc-500">{interview.date} • {interview.interviewer}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      interview.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {interview.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Notes & Comments</h4>
            <div className="space-y-2">
              {candidate.notes && candidate.notes.length > 0 ? (
                candidate.notes.map((note, index) => (
                  <div key={index} className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm text-zinc-600 dark:text-zinc-400">
                    {note}
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No notes added yet</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
              <button
                onClick={handleAddNote}
                className="px-3 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex gap-2">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
            >
              <option value="">Move to stage...</option>
              <option value="screening">Screening</option>
              <option value="interview">Interview</option>
              <option value="selected">Selected</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={handleMoveStage}
              disabled={!selectedStage}
              className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              Move
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onScheduleInterview(candidate.id)}
              className="flex items-center gap-2 flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Schedule Interview
            </button>
            <button
              onClick={() => onReject(candidate.id)}
              className="flex items-center gap-2 flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <X className="h-4 w-4" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

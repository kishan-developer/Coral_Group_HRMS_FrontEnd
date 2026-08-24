'use client';

import { useState } from 'react';
import { Plus, Upload, Settings } from 'lucide-react';
import RecruitmentOverviewWidgets from './components/RecruitmentOverviewWidgets';
import RecruitmentFilters from './components/RecruitmentFilters';
import CandidatesTable from './components/CandidatesTable';
import JobOpeningsSection from './components/JobOpeningsSection';
import CandidateProfileModal from './components/CandidateProfileModal';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [stage, setStage] = useState('');
  const [source, setSource] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<any[]>([
    {
      id: '1',
      name: 'John Doe',
      appliedFor: 'Software Engineer',
      experience: '3-5 Years',
      source: 'linkedin',
      currentStage: 'interview',
      hasResume: true,
      resumeUrl: '#',
      appliedDate: '2024-05-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      appliedFor: 'HR Manager',
      experience: '5-10 Years',
      source: 'referral',
      currentStage: 'screening',
      hasResume: true,
      resumeUrl: '#',
      appliedDate: '2024-05-16',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      appliedFor: 'Sales Executive',
      experience: '1-3 Years',
      source: 'job-portal',
      currentStage: 'applied',
      hasResume: true,
      resumeUrl: '#',
      appliedDate: '2024-05-17',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      appliedFor: 'Software Engineer',
      experience: '3-5 Years',
      source: 'website',
      currentStage: 'selected',
      hasResume: true,
      resumeUrl: '#',
      appliedDate: '2024-05-10',
    },
    {
      id: '5',
      name: 'Tom Brown',
      appliedFor: 'Accountant',
      experience: '3-5 Years',
      source: 'walk-in',
      currentStage: 'rejected',
      hasResume: true,
      resumeUrl: '#',
      appliedDate: '2024-05-12',
    },
  ]);
  const [jobOpenings, setJobOpenings] = useState<any[]>([
    {
      id: '1',
      title: 'Software Engineer',
      department: 'IT',
      openingsCount: 3,
      status: 'open',
      totalApplicants: 45,
      lastUpdated: '2024-05-20',
    },
    {
      id: '2',
      title: 'HR Manager',
      department: 'HR',
      openingsCount: 1,
      status: 'open',
      totalApplicants: 28,
      lastUpdated: '2024-05-18',
    },
    {
      id: '3',
      title: 'Sales Executive',
      department: 'Sales',
      openingsCount: 5,
      status: 'open',
      totalApplicants: 62,
      lastUpdated: '2024-05-15',
    },
  ]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setJobPosition('');
    setDepartment('');
    setExperience('');
    setStage('');
    setSource('');
    setDateRange('');
  };

  const handleViewProfile = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      setSelectedCandidate({
        ...candidate,
        email: 'candidate@email.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, India',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        education: 'B.Tech Computer Science',
        notes: ['Initial screening completed', 'Technical interview scheduled'],
        interviews: [
          { type: 'HR Round', date: '2024-05-20', interviewer: 'Jane Smith', status: 'completed' },
        ],
      });
      setIsProfileModalOpen(true);
    }
  };

  const handleMoveStage = (id: string) => {
    setCandidates(candidates.map(c => {
      if (c.id === id) {
        const stages = ['applied', 'screening', 'interview', 'selected', 'offer', 'rejected'];
        const currentIndex = stages.indexOf(c.currentStage);
        const nextIndex = (currentIndex + 1) % stages.length;
        const newStage = stages[nextIndex];
        alert(`Candidate ${c.name} moved to ${newStage} stage`);
        return { ...c, currentStage: newStage };
      }
      return c;
    }));
  };

  const handleAssignInterview = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      const date = prompt(`Enter interview date for ${candidate.name} (YYYY-MM-DD):`);
      const time = prompt(`Enter interview time for ${candidate.name} (HH:MM):`);
      if (date && time) {
        alert(`Interview scheduled for ${candidate.name} on ${date} at ${time}`);
      }
    }
  };

  const handleAddNotes = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      const note = prompt(`Add note for ${candidate.name}:`);
      if (note) {
        alert(`Note added for ${candidate.name}: ${note}`);
      }
    }
  };

  const handleReject = (id: string) => {
    if (confirm('Are you sure you want to reject this candidate?')) {
      setCandidates(candidates.map(c => 
        c.id === id ? { ...c, currentStage: 'rejected' } : c
      ));
    }
  };

  const handleMoveStageFromModal = (id: string, stage: string) => {
    setCandidates(candidates.map(c => 
      c.id === id ? { ...c, currentStage: stage } : c
    ));
    alert(`Candidate moved to ${stage} stage`);
  };

  const handleScheduleInterview = (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (candidate) {
      const date = prompt(`Enter interview date for ${candidate.name} (YYYY-MM-DD):`);
      const time = prompt(`Enter interview time for ${candidate.name} (HH:MM):`);
      if (date && time) {
        alert(`Interview scheduled for ${candidate.name} on ${date} at ${time}`);
      }
    }
  };

  const handleAddNote = (id: string, note: string) => {
    if (note) {
      alert(`Note added for candidate: ${note}`);
    }
  };

  const handleRejectFromModal = (id: string) => {
    if (confirm('Are you sure you want to reject this candidate?')) {
      setCandidates(candidates.map(c => 
        c.id === id ? { ...c, currentStage: 'rejected' } : c
      ));
      setIsProfileModalOpen(false);
    }
  };

  const handleCreateJob = () => {
    const title = prompt('Enter job title:');
    const department = prompt('Enter department:');
    const openings = prompt('Enter number of openings:');
    if (title && department && openings) {
      const newJob = {
        id: Date.now().toString(),
        title,
        department,
        openingsCount: parseInt(openings) || 1,
        status: 'open',
        totalApplicants: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setJobOpenings([...jobOpenings, newJob]);
      alert('Job opening created successfully');
    }
  };

  const handleAddCandidate = () => {
    const name = prompt('Enter candidate name:');
    const appliedFor = prompt('Enter position applied for:');
    const experience = prompt('Enter experience (e.g., 3-5 Years):');
    if (name && appliedFor && experience) {
      const newCandidate = {
        id: Date.now().toString(),
        name,
        appliedFor,
        experience,
        source: 'website',
        currentStage: 'applied',
        hasResume: true,
        resumeUrl: '#',
        appliedDate: new Date().toISOString().split('T')[0],
      };
      setCandidates([...candidates, newCandidate]);
      alert('Candidate added successfully');
    }
  };

  const handleImportCandidates = () => {
    const count = prompt('Enter number of candidates to import:');
    if (count) {
      const num = parseInt(count) || 1;
      for (let i = 0; i < num; i++) {
        const newCandidate = {
          id: Date.now().toString() + i,
          name: `Imported Candidate ${i + 1}`,
          appliedFor: 'Software Engineer',
          experience: '1-3 Years',
          source: 'job-portal',
          currentStage: 'applied',
          hasResume: true,
          resumeUrl: '#',
          appliedDate: new Date().toISOString().split('T')[0],
        };
        setCandidates(prev => [...prev, newCandidate]);
      }
      alert(`${num} candidates imported successfully`);
    }
  };

  const handleRecruitmentSettings = () => {
    alert('Recruitment settings panel would open here');
  };

  const handleViewApplicants = (jobId: string) => {
    const job = jobOpenings.find(j => j.id === jobId);
    if (job) {
      const jobCandidates = candidates.filter(c => c.appliedFor === job.title);
      alert(`Viewing ${jobCandidates.length} applicants for ${job.title}`);
    }
  };

  const handleEditJob = (jobId: string) => {
    const job = jobOpenings.find(j => j.id === jobId);
    if (job) {
      const newTitle = prompt('Enter new job title:', job.title);
      const newOpenings = prompt('Enter new number of openings:', job.openingsCount.toString());
      if (newTitle && newOpenings) {
        setJobOpenings(jobOpenings.map(j => 
          j.id === jobId ? { ...j, title: newTitle, openingsCount: parseInt(newOpenings) || j.openingsCount } : j
        ));
        alert('Job updated successfully');
      }
    }
  };

  const handleClosePosition = (jobId: string) => {
    if (confirm('Are you sure you want to close this position?')) {
      setJobOpenings(jobOpenings.map(j => 
        j.id === jobId ? { ...j, status: 'closed' } : j
      ));
    }
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job opening?')) {
      setJobOpenings(jobOpenings.filter(j => j.id !== jobId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Recruitment Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage job openings and candidate applications</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleImportCandidates}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Import Candidates
          </button>
          <button
            onClick={handleRecruitmentSettings}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button
            onClick={handleAddCandidate}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Candidate
          </button>
          <button
            onClick={handleCreateJob}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Job Opening
          </button>
        </div>
      </div>

      {/* Recruitment Overview Widgets */}
      <RecruitmentOverviewWidgets />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <RecruitmentFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              jobPosition={jobPosition}
              onJobPositionChange={setJobPosition}
              department={department}
              onDepartmentChange={setDepartment}
              experience={experience}
              onExperienceChange={setExperience}
              stage={stage}
              onStageChange={setStage}
              source={source}
              onSourceChange={setSource}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Candidates Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <CandidatesTable
              candidates={candidates}
              onViewProfile={handleViewProfile}
              onMoveStage={handleMoveStage}
              onAssignInterview={handleAssignInterview}
              onAddNotes={handleAddNotes}
              onReject={handleReject}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <JobOpeningsSection
            jobOpenings={jobOpenings}
            onViewApplicants={handleViewApplicants}
            onEditJob={handleEditJob}
            onClosePosition={handleClosePosition}
            onDelete={handleDeleteJob}
          />
        </div>
      </div>

      {/* Candidate Profile Modal */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        isOpen={isProfileModalOpen}
        onClose={() => { setIsProfileModalOpen(false); setSelectedCandidate(null); }}
        onMoveStage={handleMoveStageFromModal}
        onScheduleInterview={handleScheduleInterview}
        onAddNote={handleAddNote}
        onReject={handleRejectFromModal}
      />
    </div>
  );
}
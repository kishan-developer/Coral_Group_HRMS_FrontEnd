'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Edit,
  Save,
  Camera,
  FileText,
  GraduationCap,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function EmployeeProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'contact', label: 'Contact Details', icon: Mail },
    { id: 'work', label: 'Employment Info', icon: Briefcase },
    { id: 'education', label: 'Qualifications', icon: GraduationCap },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProfile = async () => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, { headers });
      const data = await response.json();
      if (data.success && data.data) {
        setProfile(data.data);
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching employee profile from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${BACKEND_URL}/api/v1/users/${userId}/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setProfile(data.data);
        setEditing(false);
        showToast('Profile updated successfully!', 'success');
      } else {
        showToast(data.message || data.error?.message || 'Failed to update profile', 'error');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      showToast('Error persisting profile updates', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#94cb3d] border-t-transparent" />
          <p className="text-xs font-medium">Fetching profile details from backend...</p>
        </div>
      </div>
    );
  }

  const fullName =
    `${formData.firstName || ''} ${formData.lastName || ''}`.trim() ||
    formData.email?.split('@')[0] ||
    'Employee Profile';

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
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
              My Employee Profile & Credentials
            </h1>
            <Badge variant="brand">{formData.role || 'employee'}</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            View and manage your verified personal, contact, work, and qualification records.
          </p>
        </div>

        <Button
          onClick={editing ? handleSave : () => setEditing(true)}
          disabled={saving}
          className="bg-[#94cb3d] text-white hover:bg-[#82b632] rounded-lg text-xs font-medium"
        >
          {saving ? (
            'Saving...'
          ) : editing ? (
            <>
              <Save className="h-4 w-4 mr-1.5" /> Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1.5" /> Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Summary */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#94cb3d]/15 border-2 border-[#94cb3d]/40 flex items-center justify-center text-[#94cb3d]">
                <User className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-4">
              {fullName}
            </h2>
            <Badge variant="secondary" className="mt-1 text-[10px] uppercase tracking-wider font-bold">
              {formData.role || 'employee'}
            </Badge>

            <div className="mt-6 w-full space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-xs">
              <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                <span>Employee ID</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-50">
                  {formData.employeeId || formData.employeeCode || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                <span>Department</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-50">
                  {formData.department || '-'}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                <span>Account Status</span>
                <Badge variant={formData.isActive !== false ? 'success' : 'destructive'} className="text-[9px]">
                  {formData.isActive !== false ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tab-Based Details Form */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="border-b border-zinc-200/80 dark:border-zinc-800 px-6">
            <nav className="flex space-x-2 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'border-[#94cb3d] text-[#94cb3d]'
                        : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">First Name</label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.firstName || ''}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.firstName || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Last Name</label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.lastName || ''}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.lastName || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Date of Birth</label>
                    {editing ? (
                      <input
                        type="date"
                        value={formData.dateOfBirth || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.dateOfBirth || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Gender</label>
                    {editing ? (
                      <select
                        value={formData.gender || ''}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50 capitalize">{formData.gender || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Marital Status</label>
                    {editing ? (
                      <select
                        value={formData.maritalStatus || ''}
                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50 capitalize">{formData.maritalStatus || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Blood Group</label>
                    {editing ? (
                      <input
                        type="text"
                        placeholder="e.g. O+"
                        value={formData.bloodGroup || ''}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.bloodGroup || '-'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
                    <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50 font-mono">{formData.email || '-'}</p>
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Mobile Contact</label>
                    {editing ? (
                      <input
                        type="tel"
                        value={formData.mobile || ''}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.mobile || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Current Residential Address</label>
                    {editing ? (
                      <textarea
                        rows={2}
                        value={formData.currentAddress || ''}
                        onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.currentAddress || '-'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'work' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Employment & Work Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Employee Code</label>
                    <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50 font-mono">{formData.employeeCode || formData.employeeId || '-'}</p>
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Role Permission</label>
                    <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50 capitalize">{formData.role || '-'}</p>
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Department</label>
                    <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.department || '-'}</p>
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Designation</label>
                    <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.designation || '-'}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Qualifications & Education</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Highest Degree</label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.highestQualification || ''}
                        onChange={(e) => handleInputChange('highestQualification', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.highestQualification || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Institution / University</label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.collegeName || ''}
                        onChange={(e) => handleInputChange('collegeName', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.collegeName || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Graduation Year</label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.passingYear || ''}
                        onChange={(e) => handleInputChange('passingYear', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      />
                    ) : (
                      <p className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-50">{formData.passingYear || '-'}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="p-8 text-center text-xs text-zinc-500 space-y-2">
                <FileText className="h-8 w-8 text-[#94cb3d] mx-auto mb-2" />
                <p>Verified employee documents & credentials stored in database.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

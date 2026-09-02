'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function JoiningFormContent({ token }: { token: string }) {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<any>({
    employeeData: {},
    uploadedDocuments: {},
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/public/joining/${token}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid joining link');
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (err) {
      setError('Failed to validate joining link');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/public/joining/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Submission failed');
        setSubmitting(false);
        return;
      }

      router.push(`/joining/success?ref=${data.data.referenceId}`);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#94cb3d] mx-auto" />
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#94cb3d]">Coral Group</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Employee Joining Form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, firstName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, lastName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Father Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, fatherName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mother Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, motherName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, dateOfBirth: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender *</label>
                <select
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, gender: e.target.value }
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Marital Status *</label>
                <select
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, maritalStatus: e.target.value }
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blood Group</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, bloodGroup: e.target.value }
                  })}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, mobileNumber: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alternative Mobile</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, alternativeMobile: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Personal Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, personalEmail: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Official Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, officialEmail: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Current Address *</label>
                <textarea
                  required
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, currentAddress: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Permanent Address *</label>
                <textarea
                  required
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, permanentAddress: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Identity Documents */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Identity Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Aadhaar Number *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, aadhaarNumber: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">PAN Number *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, panNumber: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Employment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Employee ID</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, employeeId: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, designation: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Joining Date *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, joiningDate: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Employment Type *</label>
                <select
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, employmentType: e.target.value }
                  })}
                >
                  <option value="">Select Type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="intern">Intern</option>
                </select>
              </div>
            </div>
          </div>

          {/* Banking Details */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Banking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, bankName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Account Holder Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, accountHolderName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Account Number *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, accountNumber: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">IFSC Code *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, ifscCode: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Branch Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, branchName: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, emergencyContactName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relationship *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, emergencyRelationship: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, emergencyPhoneNumber: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Highest Qualification *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, highestQualification: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, collegeName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Passing Year *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  onChange={(e) => setFormData({
                    ...formData,
                    employeeData: { ...formData.employeeData, passingYear: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-[#94cb3d]"
              />
              <span className="text-sm">I declare that all information provided is true and correct.</span>
            </label>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#94cb3d] text-white font-medium rounded-lg hover:bg-[#7ab52f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Joining Form'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function JoiningPage({ params }: { params: Promise<{ token: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-[#94cb3d]" />
      </div>
    }>
      <JoiningFormWrapper params={params} />
    </Suspense>
  );
}

async function JoiningFormWrapper({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <JoiningFormContent token={token} />;
}

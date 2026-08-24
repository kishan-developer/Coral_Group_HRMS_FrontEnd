'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Building2, Mail, Phone, Globe, MapPin, Calendar, Users, Edit, ArrowLeft, Shield, Key, LogIn } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  industry: string;
  size: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'expired';
  subscriptionPlan: 'starter' | 'professional' | 'enterprise';
  subscriptionEndDate: string;
  status: 'active' | 'inactive' | 'suspended';
  maxEmployees?: number;
  maxBranches?: number;
  employeeCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function CompanyDetailView() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';
      const response = await fetch(`${BACKEND_URL}/companies/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCompany(data.data);
      }
    } catch (error) {
      console.error('Error fetching company:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'trial':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getSubscriptionColor = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'professional':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'enterprise':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">
          Loading company details...
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500 dark:text-zinc-400">
          Company not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{company.name}</h1>
            <p className="text-zinc-600 dark:text-zinc-400">{company.code}</p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/dashboard/superadmin/${params.userId}/companies/${id}/edit`)}
          className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
        >
          <Edit className="h-4 w-4" />
          Edit Company
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Status</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                {company.status}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Subscription</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSubscriptionColor(company.subscriptionPlan)}`}>
                {company.subscriptionPlan}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Employees</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.employeeCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-full">
              <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Expiry Date</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {new Date(company.subscriptionEndDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Company Name</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Company Code</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.code}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Industry</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.industry}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Company Size</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Email</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Phone</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.phone}</p>
              </div>
            </div>
            {company.website && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Website</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Address Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Address</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">City</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">State</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.state}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Country</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Zip Code</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Subscription Details</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Plan</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSubscriptionColor(company.subscriptionPlan)}`}>
                  {company.subscriptionPlan}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Status</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.subscriptionStatus)}`}>
                  {company.subscriptionStatus}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-zinc-400 mt-0.5" />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Subscription End Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {new Date(company.subscriptionEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            {company.maxEmployees && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Max Employees</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.maxEmployees}</p>
                </div>
              </div>
            )}
            {company.maxBranches && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Max Branches</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{company.maxBranches}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Company Created</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{new Date(company.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Last Updated</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{new Date(company.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Key className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Reset Admin Password</span>
          </button>
          <button className="flex items-center gap-3 p-4 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <LogIn className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Login as Company Admin</span>
          </button>
          <button className="flex items-center gap-3 p-4 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
            <Building2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">View Company Users</span>
          </button>
        </div>
      </div>
    </div>
  );
}

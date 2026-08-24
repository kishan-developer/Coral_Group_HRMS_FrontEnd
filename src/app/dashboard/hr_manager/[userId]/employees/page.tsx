'use client';

import { useState, useEffect } from 'react';
import { Plus, Upload } from 'lucide-react';
import EmployeeStatusInsights from './components/EmployeeStatusInsights';
import EmployeeFilters from './components/EmployeeFilters';
import EmployeeTable from './components/EmployeeTable';
import EmployeeProfileModal from './components/EmployeeProfileModal';
import EmployeeFormModal from './components/EmployeeFormModal';
import BulkUploadModal from './components/BulkUploadModal';
import { getToken } from '@/lib/auth';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [status, setStatus] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<any[]>([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001/api/v1';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getToken();
      console.log('Fetching users from:', `${BACKEND_URL}/api/v1/users`);
      console.log('Token:', token ? 'exists' : 'missing');
      
      const response = await fetch(`${BACKEND_URL}/api/v1/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        const usersList = data.data.users || data.data.items || data.data || [];
        console.log('Users list:', usersList);
        
        const mappedEmployees = usersList.map((user: any) => ({
          id: user._id || user.id,
          name: user.email?.split('@')[0] || user.email || 'Unknown',
          employeeId: user.employeeId || 'N/A',
          department: user.employeeDetails?.department || 'N/A',
          designation: user.employeeDetails?.designation || user.role || 'N/A',
          phone: user.employeeDetails?.mobile || 'N/A',
          email: user.email,
          role: user.role || 'Staff',
          status: user.isActive !== false ? 'active' : 'inactive',
          dateOfJoining: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          attendanceSummary: { present: 0, absent: 0, late: 0, totalDays: 0 },
          leaveBalance: { casual: 0, sick: 0, earned: 0 },
        }));
        console.log('Mapped employees:', mappedEmployees);
        setEmployees(mappedEmployees);
      } else {
        console.error('API returned error:', data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartment('');
    setDesignation('');
    setEmploymentType('');
    setStatus('');
  };

  const handleView = (id: string) => {
    const employee = employees.find(e => e.id === id);
    if (employee) {
      setSelectedEmployee(employee);
      setIsProfileModalOpen(true);
    }
  };

  const handleEdit = (id: string) => {
    const employee = employees.find(e => e.id === id);
    if (employee) {
      setEditingEmployee(employee);
      setIsFormModalOpen(true);
    }
  };

  const handleResetPassword = (id: string) => {
    const employee = employees.find(e => e.id === id);
    if (employee) {
      alert(`Password reset link sent to ${employee.email}`);
    }
  };

  const handleToggleStatus = (id: string) => {
    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        const newStatus = emp.status === 'active' ? 'inactive' : 'active';
        alert(`Employee ${emp.name} status changed to ${newStatus}`);
        return { ...emp, status: newStatus as any };
      }
      return emp;
    }));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleFormSubmit = (data: any) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...emp, ...data } : emp
      ));
    } else {
      const newEmployee = {
        id: Date.now().toString(),
        ...data,
        status: 'active' as const,
        attendanceSummary: { present: 0, absent: 0, late: 0, totalDays: 0 },
        leaveBalance: { casual: 0, sick: 0, earned: 0 },
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  };

  const handleBulkUpload = async (file: File) => {
    // The upload is now handled by the BulkUploadModal component directly
    // This function is kept for compatibility but can be removed
    await fetchUsers();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Employees</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your workforce</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBulkUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </button>
          <button
            onClick={() => { setEditingEmployee(null); setIsFormModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg text-sm font-medium hover:bg-[#7ab32e] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Status Insights */}
      <EmployeeStatusInsights />

      {/* Filters & Search */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <EmployeeFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          department={department}
          onDepartmentChange={setDepartment}
          designation={designation}
          onDesignationChange={setDesignation}
          employmentType={employmentType}
          onEmploymentTypeChange={setEmploymentType}
          status={status}
          onStatusChange={setStatus}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Employees Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
        <EmployeeTable
          employees={employees}
          onView={handleView}
          onEdit={handleEdit}
          onResetPassword={handleResetPassword}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </div>

      {/* Profile Modal */}
      <EmployeeProfileModal
        employee={selectedEmployee}
        isOpen={isProfileModalOpen}
        onClose={() => { setIsProfileModalOpen(false); setSelectedEmployee(null); }}
      />

      {/* Form Modal */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={() => { setIsFormModalOpen(false); setEditingEmployee(null); }}
        onSubmit={handleFormSubmit}
        initialData={editingEmployee}
      />

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onUploadComplete={fetchUsers}
      />
    </div>
  );
}

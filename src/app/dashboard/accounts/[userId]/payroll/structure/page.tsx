'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useParams } from 'next/navigation';

interface PayrollComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction';
  amount: number;
  percentage?: number;
  isPercentage: boolean;
}

export default function PayrollStructure() {
  const params = useParams();
  const userId = params.userId as string;

  const [components, setComponents] = useState<PayrollComponent[]>([
    { id: '1', name: 'Basic Salary', type: 'earning', amount: 0, isPercentage: false },
    { id: '2', name: 'HRA', type: 'earning', amount: 40, isPercentage: true },
    { id: '3', name: 'Medical Allowance', type: 'earning', amount: 10, isPercentage: true },
    { id: '4', name: 'Special Allowance', type: 'earning', amount: 5, isPercentage: true },
    { id: '5', name: 'PF', type: 'deduction', amount: 12, isPercentage: true },
    { id: '6', name: 'ESI', type: 'deduction', amount: 1, isPercentage: true },
    { id: '7', name: 'Professional Tax', type: 'deduction', amount: 200, isPercentage: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'earning' as 'earning' | 'deduction',
    amount: 0,
    isPercentage: false,
  });

  const handleAdd = () => {
    if (!formData.name) return;

    const newComponent: PayrollComponent = {
      id: Date.now().toString(),
      ...formData,
    };

    setComponents([...components, newComponent]);
    setFormData({ name: '', type: 'earning', amount: 0, isPercentage: false });
    setShowAddForm(false);
  };

  const handleEdit = (id: string) => {
    const component = components.find(c => c.id === id);
    if (component) {
      setEditingId(id);
      setFormData({
        name: component.name,
        type: component.type,
        amount: component.amount,
        isPercentage: component.isPercentage,
      });
    }
  };

  const handleSave = (id: string) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, ...formData } : c
    ));
    setEditingId(null);
    setFormData({ name: '', type: 'earning', amount: 0, isPercentage: false });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this component?')) {
      setComponents(components.filter(c => c.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', type: 'earning', amount: 0, isPercentage: false });
  };

  const earnings = components.filter(c => c.type === 'earning');
  const deductions = components.filter(c => c.type === 'deduction');

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Payroll Structure</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Configure salary components and their calculation rules</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#94cb3d] text-white rounded-lg hover:bg-[#7ab52f] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Component
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Add New Component</h2>
            <button onClick={handleCancel} className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Component Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'earning' | 'deduction' })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="earning">Earning</option>
                <option value="deduction">Deduction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Value Type
              </label>
              <select
                value={formData.isPercentage ? 'percentage' : 'fixed'}
                onChange={(e) => setFormData({ ...formData, isPercentage: e.target.value === 'percentage' })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                {formData.isPercentage ? 'Percentage (%)' : 'Amount (₹)'}
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-[#94cb3d] text-white rounded-md hover:bg-[#7ab52f] transition-colors"
            >
              Add Component
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 text-green-600 dark:text-green-400">
            Earnings
          </h2>
          <div className="space-y-3">
            {earnings.map((component) => (
              <div key={component.id} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                {editingId === component.id ? (
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                    <select
                      value={formData.isPercentage ? 'percentage' : 'fixed'}
                      onChange={(e) => setFormData({ ...formData, isPercentage: e.target.value === 'percentage' })}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">₹</option>
                    </select>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(component.id)} className="text-[#94cb3d] hover:text-[#7ab52f]">
                        <Save className="h-4 w-4" />
                      </button>
                      <button onClick={handleCancel} className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{component.name}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {component.isPercentage ? `${component.amount}% of Basic` : `₹${component.amount}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(component.id)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(component.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 text-red-600 dark:text-red-400">
            Deductions
          </h2>
          <div className="space-y-3">
            {deductions.map((component) => (
              <div key={component.id} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                {editingId === component.id ? (
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                    <select
                      value={formData.isPercentage ? 'percentage' : 'fixed'}
                      onChange={(e) => setFormData({ ...formData, isPercentage: e.target.value === 'percentage' })}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">₹</option>
                    </select>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#94cb3d]"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleSave(component.id)} className="text-[#94cb3d] hover:text-[#7ab52f]">
                        <Save className="h-4 w-4" />
                      </button>
                      <button onClick={handleCancel} className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-50">{component.name}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {component.isPercentage ? `${component.amount}% of Basic` : `₹${component.amount}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(component.id)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(component.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

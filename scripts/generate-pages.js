const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'src', 'app');

const pageTemplate = (title, parentPath = '') => `import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            ${title}
          </h1>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
            <p className="text-zinc-600 dark:text-zinc-400">
              This is the ${title} page. Content coming soon.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
`;

const routes = [
  // Admin - Dashboard
  { path: 'dashboard/overview', title: 'Dashboard Overview' },
  { path: 'dashboard/attendance-summary', title: 'Attendance Summary' },
  { path: 'dashboard/leave-summary', title: 'Leave Summary' },
  { path: 'dashboard/payroll-summary', title: 'Payroll Summary' },
  { path: 'dashboard/notifications', title: 'Notifications & Alerts' },
  { path: 'dashboard/upcoming-tasks', title: 'Upcoming Tasks' },

  // Admin - Employee Management
  { path: 'employees/directory', title: 'Employee Directory' },
  { path: 'employees/add', title: 'Add Employee' },
  { path: 'employees/profile', title: 'Employee Profile' },
  { path: 'employees/departments', title: 'Departments' },
  { path: 'employees/designations', title: 'Designations' },
  { path: 'employees/onboarding', title: 'Employee Onboarding' },
  { path: 'employees/exit-management', title: 'Exit Management' },

  // Admin - Attendance
  { path: 'attendance/dashboard', title: 'Attendance Dashboard' },
  { path: 'attendance/daily', title: 'Daily Attendance' },
  { path: 'attendance/monthly', title: 'Monthly Attendance' },
  { path: 'attendance/regularization', title: 'Regularization Requests' },
  { path: 'attendance/overtime', title: 'Overtime Requests' },
  { path: 'attendance/shifts', title: 'Shift Management' },
  { path: 'attendance/holiday-calendar', title: 'Holiday Calendar' },
  { path: 'attendance/devices', title: 'Attendance Devices' },
  { path: 'attendance/reports', title: 'Attendance Reports' },

  // Admin - Leave
  { path: 'leave/dashboard', title: 'Leave Dashboard' },
  { path: 'leave/requests', title: 'Leave Requests' },
  { path: 'leave/types', title: 'Leave Types Setup' },
  { path: 'leave/policy', title: 'Leave Policy Setup' },
  { path: 'leave/calendar', title: 'Leave Calendar' },
  { path: 'leave/balance-adjustment', title: 'Leave Balance Adjustment' },
  { path: 'leave/encashment', title: 'Leave Encashment' },
  { path: 'leave/reports', title: 'Leave Reports' },

  // Admin - Payroll
  { path: 'payroll/dashboard', title: 'Payroll Dashboard' },
  { path: 'payroll/salary-structure', title: 'Salary Structure' },
  { path: 'payroll/monthly', title: 'Monthly Payroll' },
  { path: 'payroll/salary-slips', title: 'Salary Slips' },
  { path: 'payroll/reimbursements', title: 'Reimbursements' },
  { path: 'payroll/bonus', title: 'Bonus & Incentives' },
  { path: 'payroll/statutory', title: 'Statutory Compliance' },
  { path: 'payroll/reports', title: 'Payroll Reports' },

  // Admin - Performance
  { path: 'performance/dashboard', title: 'Performance Dashboard' },
  { path: 'performance/goals', title: 'Goal / KRA Management' },
  { path: 'performance/appraisal', title: 'Appraisal Cycle' },
  { path: 'performance/promotion', title: 'Promotion & Increment' },
  { path: 'performance/reports', title: 'Performance Reports' },

  // Admin - Recruitment
  { path: 'recruitment/dashboard', title: 'Recruitment Dashboard' },
  { path: 'recruitment/job-openings', title: 'Job Openings' },
  { path: 'recruitment/candidates', title: 'Candidate Pipeline' },
  { path: 'recruitment/interviews', title: 'Interview Scheduling' },
  { path: 'recruitment/resumes', title: 'Resume Database' },
  { path: 'recruitment/offer-templates', title: 'Offer Letter Templates' },

  // Admin - Training
  { path: 'training/dashboard', title: 'Training Dashboard' },
  { path: 'training/courses', title: 'Courses' },
  { path: 'training/calendar', title: 'Training Calendar' },
  { path: 'training/assign', title: 'Assign Training' },
  { path: 'training/reports', title: 'Training Reports' },

  // Admin - Assets
  { path: 'assets/dashboard', title: 'Asset Dashboard' },
  { path: 'assets/inventory', title: 'Asset Inventory' },
  { path: 'assets/assign', title: 'Assign Asset' },
  { path: 'assets/return', title: 'Return Asset' },
  { path: 'assets/damage-reports', title: 'Damage / Loss Reports' },
  { path: 'assets/history', title: 'Asset History' },

  // Admin - Expenses
  { path: 'expenses/dashboard', title: 'Expense Dashboard' },
  { path: 'expenses/claims', title: 'Expense Claims' },
  { path: 'expenses/policies', title: 'Expense Policies' },
  { path: 'expenses/reports', title: 'Expense Reports' },

  // Admin - Documents
  { path: 'documents/policies', title: 'Organization Policies' },
  { path: 'documents/employee-docs', title: 'Employee Documents' },
  { path: 'documents/templates', title: 'HR Letter Templates' },

  // Admin - Settings
  { path: 'settings/company', title: 'Company Profile' },
  { path: 'settings/roles', title: 'User Roles & Permissions' },
  { path: 'settings/hr-policies', title: 'HR Policies Setup' },
  { path: 'settings/notifications', title: 'Notification Settings' },
  { path: 'settings/integrations', title: 'Integration Settings' },
  { path: 'settings/audit-logs', title: 'Audit Logs' },

  // Manager
  { path: 'manager/dashboard', title: 'Manager Dashboard' },
  { path: 'manager/team', title: 'Team Member List' },
  { path: 'manager/team/profile', title: 'Team Member Profile' },
  { path: 'manager/team/tasks', title: 'Assign Tasks' },
  { path: 'manager/team/shift-allocation', title: 'Team Shift Allocation' },
  { path: 'manager/attendance', title: 'Team Attendance List' },
  { path: 'manager/attendance/regularization', title: 'Team Regularization' },
  { path: 'manager/attendance/overtime', title: 'Team Overtime' },
  { path: 'manager/attendance/shifts', title: 'Team Shift Management' },
  { path: 'manager/leave', title: 'Team Leave Requests' },
  { path: 'manager/leave/calendar', title: 'Team Leave Calendar' },
  { path: 'manager/leave/balances', title: 'Team Leave Balances' },
  { path: 'manager/performance', title: 'Set KPIs for Team' },
  { path: 'manager/performance/appraisal', title: 'Team Appraisal Review' },
  { path: 'manager/performance/feedback', title: 'Team Feedback' },
  { path: 'manager/performance/history', title: 'Team Performance History' },
  { path: 'manager/payroll', title: 'Team Salary Summary' },
  { path: 'manager/payroll/reimbursements', title: 'Team Reimbursements' },
  { path: 'manager/payroll/bonus', title: 'Team Bonus Approvals' },
  { path: 'manager/recruitment', title: 'Raise Hiring Request' },
  { path: 'manager/recruitment/candidates', title: 'Review Candidates' },
  { path: 'manager/recruitment/feedback', title: 'Interview Feedback' },
  { path: 'manager/training', title: 'Assign Training' },
  { path: 'manager/training/completion', title: 'Training Completion' },
  { path: 'manager/assets', title: 'Approve Asset Requests' },
  { path: 'manager/assets/assigned', title: 'Assigned Assets' },
  { path: 'manager/reports/attendance', title: 'Team Attendance Report' },
  { path: 'manager/reports/leave', title: 'Team Leave Report' },
  { path: 'manager/reports/performance', title: 'Team Performance Report' },
  { path: 'manager/reports/shift', title: 'Team Shift Report' },
];

for (const route of routes) {
  const dirPath = path.join(baseDir, route.path);
  const filePath = path.join(dirPath, 'page.tsx');

  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, pageTemplate(route.title), 'utf8');
  console.log(`Created: ${filePath}`);
}

console.log(`\nGenerated ${routes.length} page files.`);

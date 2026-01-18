import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskFormModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
}

const statusOptions = ['Backlog', 'In Progress', 'Blocked', 'Done'] as const;
const priorityOptions = ['Low', 'Medium', 'High', 'Critical'] as const;
const departmentOptions = ['Warehouse', 'Fleet', 'Procurement', 'Customer Service'] as const;

const statusLabels: Record<string, string> = {
  'Backlog': 'قيد الانتظار',
  'In Progress': 'قيد التنفيذ',
  'Blocked': 'متوقف',
  'Done': 'مكتمل'
};

const priorityLabels: Record<string, string> = {
  'Low': 'منخفض',
  'Medium': 'متوسط',
  'High': 'عالي',
  'Critical': 'حرج'
};

const departmentLabels: Record<string, string> = {
  'Warehouse': 'المستودع',
  'Fleet': 'الأسطول',
  'Procurement': 'المشتريات',
  'Customer Service': 'خدمة العملاء'
};

export function TaskFormModal({ isOpen, task, onClose, onSave }: TaskFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium' as Task['priority'],
    status: 'Backlog' as Task['status'],
    assignee: '',
    department: 'Warehouse' as Task['department'],
    dueDate: '',
    tags: '',
    attachmentsCount: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignee: task.assignee,
        department: task.department,
        dueDate: task.dueDate,
        tags: task.tags.join(', '),
        attachmentsCount: task.attachmentsCount
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Backlog',
        assignee: '',
        department: 'Warehouse',
        dueDate: '',
        tags: '',
        attachmentsCount: 0
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!formData.assignee.trim()) newErrors.assignee = 'المسؤول مطلوب';
    if (!formData.dueDate) newErrors.dueDate = 'تاريخ الاستحقاق مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      assignee: formData.assignee.trim(),
      department: formData.department,
      dueDate: formData.dueDate,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      attachmentsCount: formData.attachmentsCount
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-foreground/50" onClick={onClose}>
      <div 
        className="w-full max-w-lg bg-card rounded-xl shadow-xl modal-content max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground">
            {task ? 'تعديل المهمة' : 'مهمة جديدة'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">العنوان *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full h-10 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.title ? 'border-destructive' : 'border-input'}`}
              placeholder="أدخل عنوان المهمة"
            />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="أدخل وصف المهمة"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">الأولوية</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {priorityOptions.map(priority => (
                  <option key={priority} value={priority}>{priorityLabels[priority]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{statusLabels[status]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">المسؤول *</label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                className={`w-full h-10 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.assignee ? 'border-destructive' : 'border-input'}`}
                placeholder="اسم المسؤول"
              />
              {errors.assignee && <p className="text-xs text-destructive mt-1">{errors.assignee}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">القسم</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value as Task['department'] }))}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>{departmentLabels[dept]}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">تاريخ الاستحقاق *</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className={`w-full h-10 px-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.dueDate ? 'border-destructive' : 'border-input'}`}
              dir="ltr"
            />
            {errors.dueDate && <p className="text-xs text-destructive mt-1">{errors.dueDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">الوسوم (مفصولة بفواصل)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="مثال: عاجل, مخزون, تقرير"
              dir="ltr"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {task ? 'حفظ التغييرات' : 'إنشاء المهمة'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

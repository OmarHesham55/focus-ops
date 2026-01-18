import { X, Pencil, Calendar, User, Building2, Tag, Paperclip, Clock } from 'lucide-react';
import { Task } from '@/types/task';

interface ViewTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onEdit: () => void;
}

const statusStyles: Record<string, string> = {
  'Backlog': 'bg-muted text-muted-foreground',
  'In Progress': 'bg-info/15 text-info',
  'Blocked': 'bg-destructive/15 text-destructive',
  'Done': 'bg-success/15 text-success'
};

const priorityStyles: Record<string, string> = {
  'Low': 'bg-muted text-muted-foreground',
  'Medium': 'bg-warning/15 text-warning',
  'High': 'bg-warning/25 text-warning',
  'Critical': 'bg-destructive/15 text-destructive'
};

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

const dummyActivity = [
  { id: 1, text: 'تم إنشاء المهمة', time: 'قبل 3 أيام', user: 'النظام' },
  { id: 2, text: 'تم تحديث الأولوية', time: 'قبل يومين', user: 'أحمد محمد' },
  { id: 3, text: 'تمت إضافة تعليق', time: 'قبل يوم', user: 'سارة أحمد' },
];

export function ViewTaskModal({ isOpen, task, onClose, onEdit }: ViewTaskModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-foreground/50" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-card rounded-xl shadow-xl modal-content max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-modal-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-primary font-medium" dir="ltr">{task.id}</span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[task.status]}`}>
              {statusLabels[task.status]}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${priorityStyles[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <h2 id="view-modal-title" className="text-xl font-bold text-foreground mb-2">{task.title}</h2>
          
          {task.description && (
            <p className="text-muted-foreground mb-6">{task.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">المسؤول</p>
                <p className="text-sm font-medium text-foreground">{task.assignee}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">القسم</p>
                <p className="text-sm font-medium text-foreground">{departmentLabels[task.department]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">تاريخ الاستحقاق</p>
                <p className="text-sm font-medium text-foreground font-mono" dir="ltr">{task.dueDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">المرفقات</p>
                <p className="text-sm font-medium text-foreground" dir="ltr">{task.attachmentsCount} ملفات</p>
              </div>
            </div>
          </div>

          {task.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">الوسوم</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">سجل النشاط</span>
            </div>
            <div className="space-y-3">
              {dummyActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium text-primary">{activity.user[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border-t border-border">
          <button
            onClick={onEdit}
            className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Pencil className="h-4 w-4" />
            تعديل
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

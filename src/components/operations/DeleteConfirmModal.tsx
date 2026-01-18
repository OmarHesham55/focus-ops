import { AlertTriangle, X } from 'lucide-react';
import { Task } from '@/types/task';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, task, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-foreground/50" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-card rounded-xl shadow-xl modal-content"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="delete-modal-title" className="text-lg font-semibold text-foreground">تأكيد الحذف</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex-1">
              <p id="delete-modal-description" className="text-foreground mb-2">
                هل أنت متأكد من حذف هذه المهمة؟
              </p>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="font-mono text-sm text-primary mb-1" dir="ltr">{task.id}</p>
                <p className="text-sm font-medium text-foreground">{task.title}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                لا يمكن التراجع عن هذا الإجراء. سيتم حذف المهمة وجميع البيانات المرتبطة بها نهائياً.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border-t border-border">
          <button
            onClick={onConfirm}
            className="flex-1 h-10 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
          >
            نعم، حذف المهمة
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

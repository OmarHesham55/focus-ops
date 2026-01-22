import { Search, Plus, Moon, Sun } from 'lucide-react';

interface TopBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onNewTask: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function TopBar({ searchValue, onSearchChange, onNewTask, isDarkMode, onToggleDarkMode }: TopBarProps) {
  return (
    <header className="bg-card border-b border-border px-4 py-3 md:px-6 card-shadow">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold text-foreground md:text-2xl">
          Operations Tasks
        </h1>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID, title, assignee..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm"
            />
          </div>
          
          <button
            onClick={onToggleDarkMode}
            className="h-10 w-10 rounded-lg border border-input bg-background flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <button
            onClick={onNewTask}
            className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}

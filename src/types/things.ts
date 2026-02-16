export interface ThingsTask {
  uuid: string;
  title: string;
  status: string;
  area: string;
  project: string;
  tags: string[];
  deadline: string | null;
  notes: string;
  type: string;
  createdDate: string;
  modifiedDate: string;
  todayIndex: number | null;
}

/**
 * Format a deadline date for display
 */
export function formatDeadline(deadline: string | null): string {
  if (!deadline) return '';
  
  const date = new Date(deadline);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const taskDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffTime = taskDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays <= 7) return `In ${diffDays} days`;
  
  return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

// loggingService.ts

import { BehaviorSubject } from 'rxjs';

class LoggingService {
  private logsSubject = new BehaviorSubject<string[]>([]);
  logs$ = this.logsSubject.asObservable();

  log(message: string): void {
    console.log(message); // Log to console
    this.updateLogs(message); // Update logs in UI
  }

  private updateLogs(message: string): void {
    const currentLogs = this.logsSubject.getValue();
    const newLogs = [...currentLogs, message];
    this.logsSubject.next(newLogs);
  }

  clearLogs(): void {
    this.logsSubject.next([]);
  }

  getLogs(): string[] {
    return this.logsSubject.getValue();
  }
}

export const loggingService = new LoggingService();

export interface ISessionService {
  checkSession(sessionId: string): Promise<boolean>;
  setUserSession(sessionId: string, user: any): Promise<number>;
}

class ExamTokenManager {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.refreshInterval = null;
    this.isExamActive = false;
  }

  async startExamSession(examId) {
    try {
      // Validate examId input
      if (!examId || typeof examId !== 'string' || !/^[a-zA-Z0-9-_]+$/.test(examId)) {
        throw new Error('Invalid exam ID format');
      }
      
      const response = await this.apiClient.post('/api/exam/start-session', { examId });
      if (response.success && response.data) {
        // Validate and sanitize response data before storing
        const { examToken, sessionId } = response.data;
        if (examToken && sessionId &&
            typeof examToken === 'string' && 
            typeof sessionId === 'string' &&
            /^[a-zA-Z0-9._-]+$/.test(examToken) &&
            /^[a-zA-Z0-9._-]+$/.test(sessionId)) {
          localStorage.setItem('examToken', examToken);
          localStorage.setItem('examSessionId', sessionId);
          this.isExamActive = true;
          this.startAutoRefresh();
          return response.data;
        }
      }
    } catch (error) {
      console.error('Failed to start exam session:', error.message);
    }
    return null;
  }

  startAutoRefresh() {
    if (this.refreshInterval) return;
    
    // Refresh every 30 minutes during exam
    this.refreshInterval = setInterval(async () => {
      if (this.isExamActive) {
        await this.refreshExamToken();
      }
    }, 30 * 60 * 1000);
  }

  async refreshExamToken() {
    try {
      const examToken = localStorage.getItem('examToken');
      const sessionId = localStorage.getItem('examSessionId');
      
      // Validate tokens before using
      if (!examToken || !sessionId || 
          typeof examToken !== 'string' || typeof sessionId !== 'string' ||
          !/^[a-zA-Z0-9._-]+$/.test(examToken) || !/^[a-zA-Z0-9._-]+$/.test(sessionId)) {
        return false;
      }

      const response = await this.apiClient.post('/api/exam/refresh-token', {
        examToken,
        sessionId
      });

      if (response.success && response.data && response.data.examToken) {
        // Validate token format before storing
        const { examToken } = response.data;
        if (typeof examToken === 'string' && examToken.length > 0 && /^[a-zA-Z0-9._-]+$/.test(examToken)) {
          localStorage.setItem('examToken', examToken);
          return true;
        }
      }
    } catch (error) {
      console.error('Exam token refresh failed:', error);
    }
    return false;
  }

  async endExamSession() {
    try {
      const sessionId = localStorage.getItem('examSessionId');
      if (sessionId) {
        await this.apiClient.post('/api/exam/end-session', { sessionId });
      }
    } catch (error) {
      console.error('Failed to end exam session:', error);
    } finally {
      this.cleanup();
    }
  }

  cleanup() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    this.isExamActive = false;
    localStorage.removeItem('examToken');
    localStorage.removeItem('examSessionId');
  }

  getExamToken() {
    return localStorage.getItem('examToken');
  }

  isInExam() {
    return this.isExamActive && localStorage.getItem('examSessionId');
  }
}

export default ExamTokenManager;
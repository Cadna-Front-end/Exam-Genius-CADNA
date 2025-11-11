import { apiClient, API_ENDPOINTS } from '../config/api';

export const examService = {
  async getExams() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EXAMS);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getExamDetails(examId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EXAM_DETAILS(examId));
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async submitExam(examId, answers) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.SUBMIT_EXAM(examId), { answers });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getResults() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RESULTS);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getResultDetails(resultId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.RESULT_DETAILS(resultId));
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default examService;
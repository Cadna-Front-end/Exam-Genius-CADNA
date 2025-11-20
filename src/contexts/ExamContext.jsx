import React, { createContext, useContext, useState } from "react";

const ExamContext = createContext();

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
};

export const ExamProvider = ({ children }) => {
  const [exams, setExams] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const addExam = (examData) => {
    const newExam = {
      id: Date.now().toString(),
      ...examData,
      createdAt: new Date().toISOString(),
      status: "published",
    };

    const updatedExams = [newExam, ...exams];
    setExams(updatedExams);

    // Add to recent activities
    const newActivity = {
      id: Date.now().toString(),
      type: "exam_created",
      title: `Created exam: ${examData.name}`,
      description: `${examData.name} has been published`,
      timestamp: new Date().toISOString(),
      examId: newExam.id,
    };

    const updatedActivities = [newActivity, ...recentActivities.slice(0, 9)]; // Keep only last 10
    setRecentActivities(updatedActivities);

    return newExam;
  };

  const getStats = () => {
    const totalExams = exams.length;
    const publishedExams = exams.filter(
      (exam) => exam.status === "published"
    ).length;
    const draftExams = exams.filter((exam) => exam.status === "draft").length;
    const totalStudents = exams.reduce(
      (total, exam) => total + (exam.studentsEnrolled || 0),
      0
    );

    return {
      totalExams,
      publishedExams,
      draftExams,
      totalStudents,
    };
  };

  const value = {
    exams,
    recentActivities,
    addExam,
    getStats,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

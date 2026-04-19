import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
  quiz: null as any,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    setQuiz: (state, { payload: quiz }) => {
      state.quiz = quiz;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz];
    },
    removeQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuizInList: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q,
      ) as any;
    },
    togglePublish: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...q, published: quiz.published } : q,
      ) as any;
    },
  },
});

export const {
  setQuizzes,
  setQuiz,
  addQuiz,
  removeQuiz,
  updateQuizInList,
  togglePublish,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;

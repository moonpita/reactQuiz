import { createContext, useReducer } from "react";
import { shuffleAnswers, normalizeQuestions } from "../helpers";

// создаём стандартное состояние 1
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
};

// Здесь описываем как нужно моенять состояние в зависимости от того, что произошло 4
const reducer = (state, action) => {
  console.log("reducer", state, action);
  switch (action.type) {
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    case "NEXT_QUESTION": {
      // если вернули определённый тип, то делаем такие действия 5
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state, // спредим все данные 6
        currentQuestionIndex, // но изменяем одно из них 7
        showResults,
        answers,
        currentAnswer: "",
        // всегда нужно вызывать spread, потому что передаётся новый объект, НЕ МУТИРУЕМ старый
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(action.payload)
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0])
      }
    }
    
    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>; // children получает всё, что внутри и рендрит, по сути - просто обернули в провайдер
};

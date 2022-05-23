import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from './component/Quiz';
import "./index.css";
import {QuizProvider} from './contexts/quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizProvider>
      <Quiz />   {/* quiz внутри quizProvder, который импортировали из контектов, поэтому весь quiz получит этот контекст */}
    </QuizProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


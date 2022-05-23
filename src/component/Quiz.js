import Question from "./Question";
import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  // подписываемся на изменение состояния с функцией reducer2
  const apiUrl ='https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986'; 

  useEffect(() => { // useeffect отрабатывает при каждом рендре
   if (quizState.questions.length > 0) {
     return;
   }
   else {
    fetch(apiUrl).then(res => res.json()).then(data => {
      console.log('data', data);
      dispatch({type: 'LOADED_QUESTIONS', payload: data.results}) // сообщаем событие и передаём результаты
    })
   }
  }) // если 2м аргументов добавить пустой массив - код выполнится только 1 раз. Этот массив - массив зависимостей
  // Если же, например, написать "quizState.currentQuestionIndex", то код будет выполняться каждый раз при изменении currentQuestionIndex
  
  // Но здесь мы просто проверяем, если  вопросы есть - ничего, если нет - заново получаем, т.к. при перезагрузке вопросы стираются



  return (
    <div className="quiz">
      {quizState.showResults && quizState.questions.length > 0 && (
        <div className="results">
          <div className="congratulations">Gratz!</div>
          <div className="results-info">
            <div>You have completed the quiz</div>
            <div>You've got {quizState.correctAnswersCount} of {quizState.questions.length}</div>
            <div
              className="next-button"
              onClick={() => dispatch({ type: "RESTART" })}
            >
              Restart
            </div>
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            //   Изменяем состояние диспатчем, передав что произошло 3, функцию даёт usereducer
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;

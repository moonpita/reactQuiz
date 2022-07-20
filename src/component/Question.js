import { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
import Answer from "./Answer";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  console.log(quizState, " quiz state");
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers 123 123">
        {quizState.answers.map((answer, index) => (
          <Answer
            key={index}
            index={index}
            correctAnswer={currentQuestion.correctAnswer}
            currentAnswer={quizState.currentAnswer}
            answerText={answer}
            onSelectAnswer={(answerText) =>
              dispatch({ type: "SELECT_ANSWER", payload: answerText })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Question;

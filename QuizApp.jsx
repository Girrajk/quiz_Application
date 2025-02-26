import React, { useState } from 'react';
import questions from '../assets/questions';
import "./Style.css"

const QuizApp = () => {

   const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
   const [selectedAnswers, setSelectedAnswers] = useState({});
   const [isQuizFinished, setIsQuizFinished] = useState(false);

   const calculateResult = () => {
      let correctQuestionCount = 0;
      questions.forEach((question, index) => {
         if (selectedAnswers[index] === question.correct) {
            correctQuestionCount++;
         }
      });
      return correctQuestionCount;

   }
   const handleOption = (answere) => {
      setSelectedAnswers({
         ...selectedAnswers, [currQuestionIndex]: answere,
      });
   };

   const handleNextQ = () => {
      currQuestionIndex < questions.length - 1
         ? setCurrQuestionIndex(currQuestionIndex + 1)
         : setIsQuizFinished(true);
   };
   return (
      <>
         <div className="container">
            <h1>Quiz Appication</h1>
            {
               isQuizFinished ? (
                  <div>
                     <h2>Quiz Results</h2>
                     <p>You answered {calculateResult()} out of {questions.length} questions correctly 😊</p>
                     <h3>Review : </h3>
                     <ul className='result-list'>
                        {questions.map((question, index) => (
                           <li key={question.id}>
                              <strong>{question.question}</strong>
                              <br />
                              <p>Your Answer: {selectedAnswers[index] || 'Not answered'}</p>
                              <p> Correct Answer: {question.correct}</p>
                           </li>
                        ))}
                     </ul>
                  </div>
               ) : (

                  <div>
                     <h2>Question {currQuestionIndex + 1}</h2>
                     <p>{questions[currQuestionIndex].question}</p>
                     <div className='btn'>
                        {questions[currQuestionIndex].options.map((option, index) => (
                           <button key={index} onClick={() => { handleOption(option); }}
                              className={selectedAnswers[currQuestionIndex] === option
                                 ? 'selected' : ''}
                           >
                              {option}</button>
                        ))}
                     </div>
                     <button onClick={handleNextQ} className='next-btn'>
                        {currQuestionIndex === questions.length - 1
                           ? "Finish Quiz" : "Next Question"}
                     </button>
                  </div>
               )
            }
         </div>
      </>
   )
}

export default QuizApp;
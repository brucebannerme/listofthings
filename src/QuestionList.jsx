import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { friendQuestions } from './list';
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const QuestionnaireComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [answer, setAnswer] = useState('');
  const phoneNumber = window.localStorage.getItem("no") || '1234567890'; // Replace with the recipient's phone number

  const handleNext = () => {
    if (answer.trim()) {
      setAnswers({ ...answers, [currentQuestion]: answer });
      setAnswer('');
      if (currentQuestion < friendQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };
  const sendMessageToWhatsApp = (res) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(res)}`;
    window.open(url, '_blank');
  };
  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setAnswer('');
  };
  const formatMessage = (data) => {
    if (!data) return [];
    return data.map(item => `${item.question} ${item.answer}`).join('\n');
  };
  const sendMsg = () => {
    alert("Thanks for sharing!")
    const questionAnswerPairs = friendQuestions.map((question, index) => ({
      question: question?.question,
      answer: answers[index.toString()] // Convert index to string to match the keys in the answers object
    }));
    console.log("questionAnswerPairs", questionAnswerPairs)
    const res = formatMessage(questionAnswerPairs)
    sendMessageToWhatsApp(res)
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <div className="text-2xl font-bold text-center">Your Answers</div>
        <div>
          {Object.entries(answers).map(([index, answer]) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{friendQuestions[parseInt(index)].question}</p>
              <p className="ml-4">{answer}</p>
            </div>
          ))}
        </div>
        <div>
          <Button onClick={handleReset} type='primary' className="w-full">Start Over</Button>
        </div>
        <div>Or</div>
        <div>
          <Button onClick={sendMsg} type='dashed' className="w-full">Send Me</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <div className="text-2xl font-bold text-center">
        Friend Questionnaire
      </div>
      <div>
        <p className="text-lg mb-4">{friendQuestions[currentQuestion].question}</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows="3"
        />
      </div>
      <div>
        <Button onClick={handleNext} type='primary' className="w-full">
          {currentQuestion < friendQuestions.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </div>
    </Card>
  );
};

export default QuestionnaireComponent;

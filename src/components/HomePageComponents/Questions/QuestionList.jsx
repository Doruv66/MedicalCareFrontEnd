import React from 'react'
import QuestionItem from './QuestionItem'

const QuestionList = () => {
    const questions = [
        {
            question: "What types of healthcare providers can I see through your platform?",
            answer: "Our platform offers a wide range of healthcare providers, including doctors, dentists, specialists, therapists, and more. You can search for the specific type of provider you need."
        },
        {
            question: "How early should I arrive for my appointment?",
            answer: "We recommend arriving 15-30 minutes before your scheduled appointment time to complete any necessary paperwork and ensure a smooth check-in process."
        },
        {
            question: "What if I have an emergency?",
            answer: "In case of a medical emergency, please call 911 or go to the nearest emergency room. Our platform is for non-emergency medical appointments only."
        },
        {
            question: "Can I see my appointment history and medical records online?",
            answer: "Yes, you can access your appointment history and medical records through your secure account on our platform."
        },
        {
            question: "Do I need insurance to book an appointment?",
            answer: "No, you can book appointments with or without insurance. We accept various payment methods, including insurance, credit cards, and cash."
        },
    ]
  return (
    <>
        {questions.map(question => {
            return(
                <QuestionItem question={question.question} answer={question.answer}/>
            )
        })}
    </>
  )
}

export default QuestionList
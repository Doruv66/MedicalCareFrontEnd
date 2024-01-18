import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import findRecommendeDoctor from './findRecommendedDoctor';
import doctorAPI from '../../API/DoctorAPI';

const MedicalChatBot = () => {
  let doctors = [];
  let options = [];
  const DoctorRedirect = () => {
    return (
      <div>
        {doctors.map((doctor, index) => 
          <a 
            key={index} 
            style={{textDecoration: 'none', color: '#000000', cursor: 'pointer'}} 
            href={`/doctors/${doctor.accountId}`}>  {doctor.firstName} {doctor.lastName}
          </a>
        )}
      </div>
    )
  }

  const getOptions = (() => doctors.map((doctor, index) => (
    options.push({value: index, label: <a href={`/doctors/${doctor.accountId}`}>{doctor.firstName} {doctor.lastName}</a> , trigger: '9'})
    
  )))

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Poppins, sans-serif',
    headerBgColor: '#000000',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#000000',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: '1',
              message: 'Welcome to the Medical Chatbot! Do you need some help with finding a suitable appointment?',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: 'yes', label: 'Hi, Yes', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'Please describe your symptoms in detail, so I can better understand your condition.',
              trigger: '4',
            },
            {
              id: '4',
              user: true,
              trigger: '5',
              
            },
            {
              id: '5',
              message: (params) => {
                const lowercasedValue = params.previousValue.toLowerCase();
                const recommendedDoctor = findRecommendeDoctor(lowercasedValue);

                  doctorAPI.getDoctorsBySpeciality(recommendedDoctor)
                  .then((res) => {
                    doctors = res.data.accounts;
                    getOptions();
                    console.log(options)
                  })
                  .catch(err => console.log(err))

                return `Based on your symptoms, it is recommended that you consult a ${recommendedDoctor} doctor. Would you like to get some suggestions regards the doctor?`;
              },
              trigger: '6',
              delay: 3000,
            },
            {
              id: '6',
              options: [
                { value: 'yes', label: 'Yes', trigger: '7' },
                { value: 'no', label: 'No', end: true },
              ],
            },
            {
              id: '7',
              message: `Great! You can now schedule an appointment with one of the recommended doctors.`,
              trigger: '8',
              delay: 4000,
            },
            {
              id: '8',
              options: options,
  
            },
            {
              id: '9',
              message: (props) => {
                console.log(props)
                return `Great! You can now schedule an appointment with one of the recommended doctors.`
              },
              end: true,
            },
          ]}
          floating={true}
          botAvatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ4x8lkFb_V5rHFK6R7tWRv_Os66w0sKpMmw&usqp=CAU'}
          headerTitle={"MedicalCare ChatBot"}
          submitButtonStyle={{color: 'black'}}
          userAvatar={'data:image/png;base64,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'}
          handleEnd={() => console.log('Chatbot session ended')}
        />
      </ThemeProvider>
    </div>
  );
};

export default MedicalChatBot;

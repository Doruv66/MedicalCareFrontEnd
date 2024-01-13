import React, { useEffect, useState } from 'react'
import style from './DoctorsPage.module.css'
import DoctorsHero from '../components/DoctorsPageComponents/DoctorsHero'
import SearchBar from '../components/DoctorsPageComponents/SearchBar'
import DoctorCard from '../components/DoctorsPageComponents/DoctorCard'
import { useUser } from '../components/Context/UserContext'
import { useNavigate } from 'react-router-dom'
import doctorAPI from '../API/DoctorAPI'
import { useInfiniteQuery } from 'react-query'


const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const user = useUser();

  const refreshDoctorsByKeyword = (keyword) => {
    doctorAPI.getDoctorsByKeyword(keyword)
      .then((response) => {
        setDoctors(Object.values(response.data.accounts))
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const getDoctors = async (page = 1 ) => {
    const data = await doctorAPI.getDoctors(page, 3);
    return data.data;
  }
  
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "doctors", 
    ({pageParam = 0}) => getDoctors(pageParam), 
      {
        getNextPageParam: (lastPage, allPages) => {
          const maxPages = lastPage.accountsCount / 3;
          const nextPage = allPages.length ;
          return nextPage <= maxPages ? nextPage : undefined;
        }
    }
  );
  
  useEffect(() => {
    const onScroll = async (event) => {
      let fetching = false;
      const { scrollHeight, scrollTop, clientHeight} = 
        event.target.scrollingElement;

      if(!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if(hasNextPage) await fetchNextPage();
        fetching = false;
      }
    }

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, [])
  

  useEffect(() => {
    if(keyword !== '') {
      refreshDoctorsByKeyword(keyword);
    }
  }, [keyword]);

  return (
       <div className={style.doctor_content}>
          <DoctorsHero />
          <div className={style.header_content}>
            <SearchBar setKeyword={setKeyword} keyword={keyword}/>
            {
              user !== null && user.accountType === "ADMIN" 
              && <button 
                className={style.btn}
                onClick={() => navigate("/adddoctor")}
              >ADD DOCTOR</button>
            }
          </div>
          <ul className={style.doctors}>
              {
                doctors && keyword !== '' ? (
                    doctors.map(doctor => {
                      return (
                        <li key={doctor.accountId}>
                          <DoctorCard doctor={doctor} />
                        </li>
                      )
                    })
                ) : (
                  data.pages.map((page) => 
                    page.accounts.map(doctor => {
                      return (
                        <li key={doctor.accountId}>
                          <DoctorCard doctor={doctor} />
                        </li>
                      )
                  })
                )
                )
              }
            
          </ul>
        </div>
  )
}

export default DoctorsPage
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';

async function getCourses(setCourses, loadingCourses) {

  const res = await fetch('https://cefis.com.br/api/v1/event');
  res
      .json()
      .then(res => { setCourses(res.data); loadingCourses.value = false; localStorage.setItem('courses', JSON.stringify(res.data));})
      .catch(err => console.log(err));
  
}

const Courses = ({ token }) => {
  const [courses, setCourses] = useState({});
  const [loadingCourses, setloadingCourses] = useState({value: false});

  return (
    <div id="courses">
      {(() => {
        const courses = JSON.parse(localStorage.getItem('courses'));
        
        if(!courses) {
          loadingCourses.value = true;
          getCourses(setCourses, loadingCourses);
        }
        
        if (courses && !loadingCourses.value) {         
          return (
            <div className="courses">
                {courses.map ? courses.map((obj, index) => {
                        return <div key={index} className="video-container">
                                
                                  <Link to={{
                                              pathname: 'course',
                                              search: '?id='+obj.id,
                                              courses
                                            }}>
                                              <div style={{background: '#000'}}>
                                                <img alt="" className="video" src={obj.banner}/>
                                              </div>
                                              <div className="video-thumb thumb-text">
                                                <p>{obj.title}</p>
                                                <p style={{marginBottom: "5px", color: '#686868', fontWeight: "normal"}}>
                                                  {obj.duration.substring(0,2) === '00' ? '' : obj.duration.substring(0,2) + 'h'} 
                                                  {obj.duration.substring(3,5) === '00' ? '': obj.duration.substring(3,5) + 'm'}
                                                </p>
                                              </div>
                                  </Link>
                                </div>
                                
                      }) : null}
            </div>
          )
        } else {
          return <div className="courses">
            <div className="bookshelf_wrapper">
              <ul className="books_list">
                <li className="book_item first"></li>
                <li className="book_item second"></li>
                <li className="book_item third"></li>
                <li className="book_item fourth"></li>
                <li className="book_item fifth"></li>
                <li className="book_item sixth"></li>
              </ul>
              <div className="shelf"></div>
              <h2 style={{textAlign: 'center', marginTop: '40px', fontSize: '32px'}}>Loading...</h2>
            </div>
            
          </div>
        }
      })()}
    </div>
  );
}

const CoursePage = (props) => {
  let courses = props.location.courses;
  if(!courses) {
    courses = JSON.parse(localStorage.getItem('courses'));
  }
  const parsed = queryString.parse(props.location.search);

  if(courses && parsed) {
    const course = courses.find(obj => obj.id === parseInt(parsed.id));  
    return (
      <div className="course-content">
        <div id="video-frame" style={{width: '50%'}}>
          <h2>{course.title}</h2>
          <div>
            <iframe src={course.video_divulgacao+'?autoplay=1&autopause=0&loop=1'} height="420" frameborder="0" allow="autoplay; fullscreen" controls="false" style={{width: '90%'}}></iframe>
          </div>
        </div>
        <div id="video-details" style={{width: '45%'}}>
          <h2>Sobre o curso</h2>
          <p>{course.resume}</p>
          <h4>Professores</h4>
          <p>{course.teachers_names}</p>
          <h4>Categoria</h4>
          <p>{course.category}</p>
        </div>
      </div>
    );
  } else {
    return <div></div>
  }
}

const Main = () => {
  return (
    <div className="App">

      <div id="about">
        <div style={{ width: "60%", marginRight: "40px" }}>
          <h1 style={{"fontSize": "80px"}}>CEFIS.</h1>
          <h2>BEM VINDO AO FUTURO DO CONHECIMENTO.</h2>
          <p>A CEFIS é a solução de atualização e capacitação corporativa.</p>
          <p>Baixe as aulas no seu celular para estudar offline e assista onde e quando quiser.</p>
          <p>São milhares de aulas disponíveis, além de novas aulas toda semana.</p>
        </div>
        <div>
          <img id="student" src="imgs/studying.png" style={{width: "100%", height: "100%"}} alt="ilustration"></img>
        </div>
      </div>
      <Courses></Courses>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          
            <Route exact path="/" component={Main} />
            <Route exact path="/course" component={CoursePage} />
            <Redirect to={{ pathname: "/"}}/>
        </Switch>
      </div>
  </Router>
  );
}

export default App;

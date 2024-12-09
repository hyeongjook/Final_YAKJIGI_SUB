import AOS from 'aos';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'reset-css';
import '../node_modules/aos/dist/aos.css';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Faq from './pages/faq/Faq';
import Container from './pages/main/Container';
import Sub105 from './pages/sub105/Sub105';
import './styles/common.css';

function App() {
  useEffect(() => {
    AOS.init({
       duration: 1000, // 애니메이션 지속 시간
    });
    return () => {
       AOS.refresh(); // 컴포넌트 언마운트 시 AOS 새로 고침
    };
 }, []);

  return (
    <BrowserRouter>
         <div className='App'>
            {/* 메인 */}
            <Header />
            <Routes>
               <Route path='/' element={<Container />} />
               <Route path='/Faq' element={<Faq />} />
               <Route path='/Sub105' element={<Sub105 />}/>
            </Routes>
            <Footer />
         </div>
    </BrowserRouter>
  );
}

export default App;

import {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Subjects from './pages/Subjects';
import Corrections from './pages/Corrections';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home onNavigate={setCurrentPage}/>;
            case 'quiz':
                return <Quiz/>;
            case 'subjects':
                return <Subjects/>;
            case 'corrections':
                return <Corrections/>;
            default:
                return <Home/>;
        }
    };

    return (
        <div className="app">
            <Header onNavigate={setCurrentPage} activePage={currentPage}/>
            {renderPage()}
        </div>
    );
}

export default App;

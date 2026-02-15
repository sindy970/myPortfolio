import { useState } from 'react';
import AboutMe from './components/AboutMe';
// import Projects from './components/Projects'; // 나중에 만들 프로젝트 컴포넌트

function App() {
    // 현재 보고 있는 화면 상태 (main, about, projects 등)
    const [view, setView] = useState('main');

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* 네비게이션 바: 어디서든 보일 수 있게 고정 */}
            <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-black/50 backdrop-blur-md">
                <div
                    className="text-2xl font-bold text-blue-500 cursor-pointer"
                    onClick={() => setView('main')}
                >
                    PORTFOLIO
                </div>
                <ul className="flex gap-8 font-medium">
                    <li
                        className={`cursor-pointer transition ${view === 'about' ? 'text-blue-400' : 'hover:text-blue-400'}`}
                        onClick={() => setView('about')}
                    >
                        About
                    </li>
                    <li
                        className="hover:text-blue-400 cursor-pointer"
                        onClick={() => setView('projects')}
                    >
                        Projects
                    </li>
                </ul>
            </nav>

            {/* 화면 전환 영역 */}
            <main className="pt-16">
                {view === 'main' && (
                    <div className="h-[90vh] flex flex-col items-center justify-center text-center">
                        <h1 className="text-6xl font-black mb-6">WELCOME TO MY WORLD</h1>
                        <button
                            onClick={() => setView('about')}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all"
                        >
                            START JOURNEY
                        </button>
                    </div>
                )}

                {view === 'about' && <AboutMe />}

                {view === 'projects' && (
                    <div className="h-[90vh] flex items-center justify-center">
                        <h2 className="text-4xl">1번 컨셉(터미널) 준비 중...</h2>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
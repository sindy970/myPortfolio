import { useState } from 'react';
import AboutMe from './components/About/AboutMe.tsx';
import Terminal from './components/Terminal/Terminal.tsx';

function App() {
    // 현재 보고 있는 화면 상태
    const [view, setView] = useState('main');

    return (
        /* 1. 배경색을 정의한 dark-bg로 변경 */
        <div className="min-h-screen bg-dark-bg text-brand-white">

            {/* 2. 네비게이션 바: 공통 포인트 컬러 및 유리창 효과 적용 */}
            <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div
                    className="text-2xl font-black text-brand-main cursor-pointer tracking-tighter"
                    onClick={() => setView('main')}
                >
                    PORTFOLIO
                </div>
                <ul className="flex gap-10 font-bold text-sm uppercase tracking-widest">
                    <li
                        className={`cursor-pointer transition-all duration-300 ${
                            view === 'about' ? 'text-brand-main' : 'text-gray-400 hover:text-brand-main'
                        }`}
                        onClick={() => setView('about')}
                    >
                        About
                    </li>
                    <li
                        className={`cursor-pointer transition-all duration-300 ${
                            view === 'projects' ? 'text-brand-main' : 'text-gray-400 hover:text-brand-main'
                        }`}
                        onClick={() => setView('projects')}
                    >
                        Projects
                    </li>
                </ul>
            </nav>

            {/* 화면 전환 영역 */}
            <main className="pt-20">
                {view === 'main' && (
                    <div className="h-[85vh] flex flex-col items-center justify-center text-center px-6">
                        {/* 메인 타이틀: 그라데이션 및 메인 컬러 포인트 */}
                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                            WELCOME TO <br />
                            <span className="text-brand-main">HEE'S WORLD</span>
                        </h1>

                        {/* 하단 장식용 라인 */}
                        <div className="mt-20 h-1 w-24 bg-brand-sub rounded-full opacity-50 shadow-[0_0_15px_#FFE69A]" />
                    </div>
                )}

                {view === 'about' && <AboutMe />}

                {view === 'projects' && <Terminal />}
            </main>
        </div>
    );
}

export default App;
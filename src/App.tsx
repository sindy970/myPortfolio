import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AboutMe from './components/About/AboutMe.tsx';
import Terminal from './components/Terminal/Terminal.tsx';
import AbountMeCard from './components/AboutMe/AbountMeCard.tsx';

function App() {
    return (
        // 여기에 basename을 넣습니다. (GitHub 저장소 이름)
        <BrowserRouter basename="/myPortfolio">
            <div className="min-h-screen bg-dark-bg text-brand-white">
                <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-black/40 backdrop-blur-xl border-b border-white/5">
                    <Link to="/" className="text-2xl font-black text-brand-main cursor-pointer tracking-tighter">
                        PORTFOLIO
                    </Link>
                    <ul className="flex gap-10 font-bold text-sm uppercase tracking-widest">
                        <li><Link to="/about" className="hover:text-brand-main text-gray-400">About</Link></li>
                        <li><Link to="/projects" className="hover:text-brand-main text-gray-400">Projects</Link></li>
                        <li><Link to="/aboutMe" className="hover:text-brand-main text-gray-400">AboutMe</Link></li>
                    </ul>
                </nav>

                <main className="pt-20">
                    <Routes>
                        <Route path="/" element={
                            <div className="h-[85vh] flex flex-col items-center justify-center text-center px-6">
                                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                                    WELCOME TO <br />
                                    <span className="text-brand-main">HEE'S WORLD</span>
                                </h1>
                                <div className="mt-20 h-1 w-24 bg-brand-sub rounded-full opacity-50 shadow-[0_0_15px_#FFE69A]" />
                            </div>
                        } />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/projects" element={<Terminal />} />
                        <Route path="/aboutMe" element={<AbountMeCard />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
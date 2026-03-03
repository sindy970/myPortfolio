import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalView from '../Career/TerminalView.tsx';
import type {CareerData} from '../../types/career.ts';

const CareerDetail = () => {
    const [cards, setCards] = useState<CareerData[]>([]);
    const activeCareer = cards[0];

    useEffect(() => {
        // 실제로는 여기서 Node.js API를 호출합니다.
        // fetch('/api/career').then(...)
        setCards(mockData);
    }, []);

    const handleCardClick = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const first = newCards.shift();
            if (first) newCards.push(first);
            return newCards;
        });
    };

    return (
        <div className="min-h-screen bg-[#0f172a] p-6 md:p-12">
            {/* 뒤로가기 버튼 */}
            <Link to="/" className="text-gray-500 hover:text-white transition-colors mb-10 inline-block font-mono">
                ← BACK TO MAIN
            </Link>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-10">
                {/* 왼쪽: 카드 스택 */}
                <div className="flex flex-col items-center">
                    <div className="relative h-[450px] w-full max-w-[320px] cursor-pointer" onClick={handleCardClick}>
                        <AnimatePresence mode='popLayout'>
                            {cards.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    style={{ backgroundColor: item.color, zIndex: cards.length - index }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1 - index * 0.06,
                                        y: index * -25,
                                        filter: `brightness(${100 - index * 15}%)`
                                    }}
                                    exit={{ x: -500, opacity: 0, rotate: -30, transition: { duration: 0.4 } }}
                                    className="absolute inset-0 p-10 rounded-[3rem] shadow-2xl text-white flex flex-col justify-between border border-white/10"
                                >
                                    <div>
                    <span className="bg-black/20 px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                      {item.date}
                    </span>
                                        <h3 className="text-4xl font-black mt-6 tracking-tight">{item.title}</h3>
                                    </div>
                                    <p className="text-sm opacity-90 leading-relaxed font-medium">{item.desc}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 오른쪽: 터미널 뷰 */}
                <div className="w-full">
                    <TerminalView selectedCareer={activeCareer} />
                </div>
            </div>
        </div>
    );
};

export default CareerDetail;

// 임시 데이터 (실제 프로젝트에서는 별도 파일로 분리 추천)
const mockData: CareerData[] = [
    {
        id: 1, date: "2018-2022", title: "한국대학교", desc: "컴퓨터공학 학사 졸업", color: "#4F46E5",
        projects: [
            { name: "졸업작품: AI 챗봇", role: "Fullstack", tech: ["Python", "React"] },
            { name: "알고리즘 학회장", role: "Leader", tech: ["C++", "Data Structure"] }
        ]
    },
    {
        id: 2, date: "2022-2023", title: "스타트업 A", desc: "프론트엔드 인턴", color: "#10B981",
        projects: [
            { name: "어드민 대시보드 구축", role: "Frontend", tech: ["React", "React-Query"] },
            { name: "랜딩페이지 최적화", role: "Frontend", tech: ["Next.js", "SEO"] }
        ]
    },
    {
        id: 3, date: "2023-현재", title: "테크 컴퍼니 B", desc: "서비스 개발자", color: "#EC4899",
        projects: [
            { name: "메인 서비스 개편", role: "Frontend Lead", tech: ["TypeScript", "Zustand"] },
            { name: "사내 공통 컴포넌트 라이브러리", role: "Core Dev", tech: ["Rollup", "Storybook"] }
        ]
    }
];
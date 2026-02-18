import { motion } from 'framer-motion';
import { useAboutAnimation } from '../../hooks/useAboutAnimation.ts';
import TowingCharacter from './TowingCharacter';
import PersonalityCards from './PersonalityCards';

// 추후 이 부분을 useEffect 내 API fetch로 대체하면 됩니다.
const MOCK_DATA = {
    name: "한승희",
    role: "Backend Developer",
    strengths: [
        { id: "01", title: "구조적 사고", desc: "문제를 시스템적 관점에서 분석합니다.", tags: ['S3 개선', '보안그룹 점검'] },
        { id: "02", title: "책임감 있는 완수", desc: "어려운 과제도 끝까지 해결합니다.", tags: ['Security', 'CI/CD'] }
    ],
    weakness: "혼자 책임을 지려는 성향을 팀 단위 소통으로 보완 중입니다.",
    workEthics: ["업무 책임감", "구조적 질문", "기록 및 공유", "개선 지점 도출"]
};

const AboutMe = () => {
    const { charControls, nameAreaControls, personalityControls, isWalking, rotationY } = useAboutAnimation();

    return (
        <div className="relative min-h-screen w-full bg-dark-bg text-brand-white py-16 px-6 overflow-x-hidden selection:bg-brand-point/30">

            <TowingCharacter controls={charControls} isWalking={isWalking} rotationY={rotationY} />

            <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center gap-16">

                {/* 상단 이름 섹션 */}
                <motion.div animate={nameAreaControls} className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[250px]">
                    <div className="flex flex-col items-center md:items-end space-y-3">
                        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-brand-main">{MOCK_DATA.name}</h2>
                        <p className="text-brand-point tracking-[0.5em] text-sm md:text-base uppercase font-bold opacity-90">{MOCK_DATA.role}</p>
                        <div className="h-1 w-16 bg-brand-sub rounded-full mt-2" />
                    </div>
                    <div className="hidden md:block h-full w-full" />
                </motion.div>

                {/* 하단 카드 섹션 (DB 연동 준비 완료) */}
                <motion.div animate={personalityControls} className="w-full">
                    <PersonalityCards
                        strengths={MOCK_DATA.strengths}
                        weakness={MOCK_DATA.weakness}
                        workEthics={MOCK_DATA.workEthics}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default AboutMe;
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import workingVideo from '../assets/workingMotion.mp4';

const AboutMe = () => {
    const charControls = useAnimation();
    // 각 섹션별 애니메이션 컨트롤러
    const imgControls = useAnimation();
    const nameControls = useAnimation();
    const personalityControls = useAnimation();

    const [rotationY, setRotationY] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // 0. 초기 위치 설정 (모두 왼쪽 바깥)
            const hidden = { left: "-50%", opacity: 0 };
            charControls.set({ left: "-20%", top: "50%" });
            imgControls.set(hidden);
            nameControls.set(hidden);
            personalityControls.set(hidden);

            const duration = 4; // 각 견인당 소요 시간

            // 1. [이미지 견인]
            setRotationY(0);
            await Promise.all([
                charControls.start({ left: "55%", transition: { duration, ease: "easeOut" } }),
                imgControls.start({ left: "50%", opacity: 1, transition: { duration, ease: "easeOut" } })
            ]);

            // 2. [이름 견인] - 캐릭터가 다시 왼쪽으로 가서 이름을 가져옴
            setRotationY(180); // 왼쪽으로 돌아가기
            await charControls.start({ left: "-10%", transition: { duration: 1.5 } });

            setRotationY(0); // 다시 오른쪽으로 끌기
            await Promise.all([
                charControls.start({ left: "60%", transition: { duration, ease: "easeOut" } }),
                nameControls.start({ left: "50%", opacity: 1, transition: { duration, ease: "easeOut" } })
            ]);

            // 3. [성격 섹션 견인]
            setRotationY(180);
            await charControls.start({ left: "-10%", transition: { duration: 1.5 } });

            setRotationY(0);
            await Promise.all([
                charControls.start({ left: "65%", transition: { duration, ease: "easeOut" } }),
                personalityControls.start({ left: "50%", opacity: 1, transition: { duration, ease: "easeOut" } })
            ]);

            // 4. [자유 모드] 모든 배달이 끝나면 캐릭터는 랜덤하게 배회
            let prevX = 65;
            while (true) {
                const nextX = Math.random() * 80 + 10;
                const nextY = Math.random() * 80 + 10;
                setRotationY(nextX < prevX ? 180 : 0);
                prevX = nextX;
                await charControls.start({
                    left: `${nextX}%`, top: `${nextY}%`,
                    transition: { duration: Math.random() * 3 + 5, ease: "linear" }
                });
            }
        };

        sequence();
    }, []);

    return (
        <div className="relative h-screen w-full bg-[#050505] overflow-hidden text-white">

            {/* 견인 캐릭터 */}
            <motion.div animate={charControls} style={{ rotateY: rotationY }} className="absolute z-0 w-48 h-48 pointer-events-none">
                <video src={workingVideo} autoPlay loop muted playsInline className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
            </motion.div>

            {/* 전체 컨테이너 (중앙 정렬용) */}
            <div className="relative flex flex-col items-center justify-center h-full space-y-4 w-full">

                {/* 섹션 1: 이미지 */}
                <motion.div animate={imgControls} className="absolute z-10 -translate-x-1/2" style={{ top: '20%' }}>
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl shadow-xl shadow-blue-500/20 flex items-center justify-center text-3xl font-bold">ME</div>
                </motion.div>

                {/* 섹션 2: 이름 */}
                <motion.div animate={nameControls} className="absolute z-10 -translate-x-1/2 text-center" style={{ top: '40%' }}>
                    <h2 className="text-4xl font-bold">김철수</h2>
                    <p className="text-blue-400 tracking-widest text-sm mt-1">CREATIVE DEVELOPER</p>
                </motion.div>

                {/* 섹션 3: 성격 (장단점) */}
                <motion.div animate={personalityControls} className="absolute z-10 -translate-x-1/2 w-full max-w-xs" style={{ top: '55%' }}>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                        <div>
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-tighter">Pros</span>
                            <p className="text-gray-300 text-sm">불가능해 보이는 애니메이션도 코드로 구현해내는 끈기</p>
                        </div>
                        <div className="h-[1px] bg-white/10 w-full" />
                        <div>
                            <span className="text-red-400 text-xs font-bold uppercase tracking-tighter">Cons</span>
                            <p className="text-gray-300 text-sm">한 번 몰입하면 끼니를 거를 정도로 코딩에 집착함</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default AboutMe;
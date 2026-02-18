import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';

export const useAboutAnimation = () => {
    const charControls = useAnimation();
    const nameAreaControls = useAnimation();
    const personalityControls = useAnimation();
    const [isWalking, setIsWalking] = useState(true);
    const [rotationY, setRotationY] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            // 0. 초기화: 모든 섹션을 왼쪽(-100%) 바깥에 배치
            charControls.set({ left: "-20%", top: "25%", x: "-50%" });
            // x: "-100%"와 opacity: 0으로 시작 위치 설정
            nameAreaControls.set({ opacity: 0, x: "-100%" });
            personalityControls.set({ opacity: 0, x: "-100%" });

            const duration = 2.5;

            // 1. [상단 영역 견인]: 왼쪽 -> 오른쪽(x: 0)
            setRotationY(0);
            await Promise.all([
                charControls.start({ left: "60%", transition: { duration, ease: "linear" } }),
                nameAreaControls.start({ opacity: 1, x: 0, transition: { duration, ease: "linear" } })
            ]);

            // 2. [하단 섹션 견인을 위해 복귀]
            setRotationY(180);
            await charControls.start({ left: "-10%", top: "65%", transition: { duration: 2 } });

            // 3. [하단 상세 카드 견인]: 왼쪽 바깥 -> 오른쪽 안착(x: 0)
            setRotationY(0);
            await Promise.all([
                charControls.start({ left: "90%", transition: { duration: 3, ease: "linear" } }),
                personalityControls.start({ opacity: 1, x: 0, transition: { duration: 3, ease: "linear" } })
            ]);

            // 4. [최종 안착]: 이미지 자리로 이동
            await charControls.start({
                left: "65%",
                top: "10%",
                transition: { duration: 1.5, ease: "anticipate" }
            });

            setIsWalking(false);
        };

        sequence();
    }, [charControls, nameAreaControls, personalityControls]);

    return { charControls, nameAreaControls, personalityControls, isWalking, rotationY };
};
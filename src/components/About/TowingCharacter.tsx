import { motion } from 'framer-motion';
import workingVideo from '../../assets/workingMotion.mp4';
import fullBodyImage from '../../assets/fullBody.webp';

interface Props {
    controls: any;
    isWalking: boolean;
    rotationY: number;
}

const TowingCharacter = ({ controls, isWalking, rotationY }: Props) => (
    <motion.div
        animate={controls}
        style={{ rotateY: rotationY, position: isWalking ? 'fixed' : 'absolute', zIndex: 0 }}
        className="w-48 h-48 pointer-events-none flex items-center justify-center"
    >
        {isWalking ? (
            <video src={workingVideo} autoPlay loop muted playsInline className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
        ) : (
            <motion.div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-main/20 blur-[40px] rounded-full" />
                <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} src={fullBodyImage} className="h-64 w-auto object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,210,76,0.3)]" alt="Profile" />
            </motion.div>
        )}
    </motion.div>
);

export default TowingCharacter;
import { motion, AnimatePresence } from 'framer-motion';
import type {CareerData} from '../../types/career.ts';

interface Props {
    selectedCareer: CareerData | null;
}

const TerminalView = ({ selectedCareer }: Props) => {
    return (
        <div className="w-full h-[500px] bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-700 font-mono text-sm overflow-hidden flex flex-col">
            {/* 터미널 헤더 */}
            <div className="bg-[#333] p-2 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-400 text-xs ml-2">career_log — bash</span>
            </div>

            {/* 터미널 본문 */}
            <div className="p-6 text-green-400 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {selectedCareer ? (
                        <motion.div
                            key={selectedCareer.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-4">
                                <span className="text-white">$</span> cat experience/{selectedCareer.title.replace(/\s/g, '_')}.log
                            </div>

                            <div className="text-blue-300 mb-2">[INFO] Loading project history for {selectedCareer.date}...</div>

                            <div className="space-y-4 mt-4">
                                {selectedCareer.projects.map((proj, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="border-l-2 border-green-800 pl-4"
                                    >
                                        <div className="text-yellow-200 font-bold underline">{proj.name}</div>
                                        <div className="text-gray-400 mt-1">Role: {proj.role}</div>
                                        <div className="text-green-500/80">
                                            Tech: {proj.tech.join(', ')}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-6"
                            >
                                <span className="text-white animate-pulse">_</span>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600 italic">
                            왼쪽 카드를 클릭하여 상세 이력을 확인하세요...
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TerminalView;
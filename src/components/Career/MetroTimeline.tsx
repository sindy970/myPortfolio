import { motion } from 'framer-motion';
import type {CareerData} from '../../types/career.ts';

interface Props {
    data: CareerData[];
}

const MetroTimeline = ({ data }: Props) => {
    return (
        <div className="flex flex-col items-center p-10 bg-gray-900 text-white rounded-3xl my-10">
            <h2 className="text-3xl font-bold mb-16 text-blue-400">Experience Path</h2>
            {data.map((item, index) => (
                <div key={item.id} className="relative flex items-center mb-24 last:mb-0 w-full max-w-xl">
                    {/* 연결선 */}
                    {index !== data.length - 1 && (
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '150%' }}
                            className="absolute left-[19px] top-10 w-0.5 bg-gray-700"
                        />
                    )}

                    {/* 노드 (역) */}
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        style={{ backgroundColor: item.color }}
                        className="w-10 h-10 rounded-full border-4 border-gray-900 z-10 flex-shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    />

                    {/* 정보 카드 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="ml-10 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 w-full"
                    >
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{item.date}</span>
                        <h3 className="text-xl font-bold mt-1" style={{ color: item.color }}>{item.title}</h3>
                        <p className="mt-2 text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export default MetroTimeline;
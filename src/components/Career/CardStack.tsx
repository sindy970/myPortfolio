import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {CareerData} from '../../types/career.ts';

interface Props {
    data: CareerData[];
}

const CardStack = ({ data }: Props) => {
    const [cards, setCards] = useState(data);

    const handleNext = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const first = newCards.shift();
            if (first) newCards.push(first);
            return newCards;
        });
    };

    return (
        <div className="flex flex-col items-center py-20 bg-gray-100 rounded-3xl overflow-hidden">
            <h2 className="text-3xl font-bold mb-20 text-gray-800">Career Deck</h2>
            <div className="relative h-[350px] w-[280px] cursor-pointer" onClick={handleNext}>
                <AnimatePresence mode='popLayout'>
                    {cards.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            style={{ backgroundColor: item.color, zIndex: data.length - index }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1 - index * 0.05,
                                y: index * -15,
                                x: index * 2
                            }}
                            exit={{ x: 400, opacity: 0, rotate: 25, transition: { duration: 0.3 } }}
                            className="absolute inset-0 p-8 rounded-[2rem] shadow-2xl text-white flex flex-col justify-between"
                        >
                            <div>
                                <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4">
                                    {item.date}
                                </div>
                                <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
                            </div>
                            <p className="text-sm opacity-90 line-clamp-4">{item.desc}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <p className="mt-12 text-gray-400 text-sm font-medium animate-pulse">카드를 클릭해 보세요!</p>
        </div>
    );
};

export default CardStack;
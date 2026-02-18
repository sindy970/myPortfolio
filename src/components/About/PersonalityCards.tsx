import {type Strength } from '../../types/about.ts';

interface Props {
    strengths: Strength[];
    weakness: string;
    workEthics: string[];
}

const PersonalityCards = ({ strengths, weakness, workEthics }: Props) => (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        {/* 장점 섹션 */}
        <div className="lg:col-span-7 glass-card border-brand-sub/10 space-y-8">
            <h3 className="text-brand-main font-black text-[10px] uppercase tracking-[0.2em] flex items-center">
                <span className="w-1.5 h-1.5 bg-brand-main rounded-full mr-2 shadow-[0_0_8px_#FFD24C]"></span> Strengths
            </h3>
            <div className="space-y-8">
                {strengths.map((s) => (
                    <section key={s.id}>
                        <h4 className="text-brand-white font-bold text-lg mb-2 flex items-center gap-2">
                            <span className="text-brand-point font-mono text-xs">{s.id}</span> {s.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {s.tags.map(tag => <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-gray-500">{tag}</span>)}
                        </div>
                    </section>
                ))}
            </div>
        </div>

        {/* 단점 & 에틱 섹션 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card border-brand-point/10">
                <h3 className="text-brand-point font-black text-[10px] uppercase tracking-[0.2em] mb-3">Weakness</h3>
                <p className="text-gray-400 text-xs leading-relaxed italic">{`"${weakness}"`}</p>
            </div>
            <div className="bg-brand-point/5 border border-brand-point/20 rounded-[2.5rem] p-8 flex-1">
                <h3 className="text-brand-sub font-black text-[10px] uppercase tracking-[0.2em] mb-4">Work Ethic</h3>
                <ul className="space-y-3 text-[11px] text-gray-300 font-medium">
                    {workEthics.map((ethic, i) => (
                        <li key={i} className="flex items-center gap-2"><span className="text-brand-point">●</span> {ethic}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

export default PersonalityCards;
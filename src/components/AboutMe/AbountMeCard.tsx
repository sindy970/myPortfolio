import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, Zap, ArrowRight } from 'lucide-react';

// --- Types ---
interface SkillData {
    subject: string;
    value: number;
    fullMark: number;
}

interface TimelineStep {
    title: string;
    description: string;
    type: 'past' | 'present';
}

interface ManualItem {
    title: string;
    items: string[];
    type: 'positive' | 'warning';
}

// --- Mock Data ---
const SKILLS: SkillData[] = [
    { subject: '열정', value: 120, fullMark: 150 },
    { subject: '꼼꼼함', value: 98, fullMark: 150 },
    { subject: '학습력', value: 130, fullMark: 150 },
    { subject: '소통', value: 85, fullMark: 150 },
    { subject: '문제해결', value: 115, fullMark: 150 },
];

const TIMELINE: TimelineStep[] = [
    {
        title: "PAST: 신중함이 과해 느렸던 속도",
        description: "완벽을 기하려다 보니 마감 직전에 몰입하는 경향이 있었습니다.",
        type: 'past'
    },
    {
        title: "PRESENT: 리스크를 관리하는 디테일",
        description: "이제는 작업 우선순위를 먼저 설정하여, 그 신중함을 '결점 없는 결과물'을 만드는 무기로 활용합니다.",
        type: 'present'
    }
];

// --- Main Component ---
const PortfolioCharacter: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-24">

            {/* Header Section */}
            <header className="text-center space-y-4">
    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
        Who am I? <span className="text-indigo-600">Persona</span>
        </h1>
        <p className="text-lg text-slate-600">저의 강점과 보완점을 투명하게 공개합니다.</p>
    </header>

    {/* 1. Radar Chart (장점 시각화) */}
    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
    <div className="flex items-center gap-2 mb-8">
    <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500" />
    <h2 className="text-2xl font-bold text-slate-800">핵심 역량 스펙트럼</h2>
    </div>
    <div className="h-[350px] w-full">
    <ResponsiveContainer width="100%" height="100%">
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS}>
    <PolarGrid stroke="#e2e8f0" />
    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 14 }} />
    <Radar
    name="나"
    dataKey="value"
    stroke="#4f46e5"
    fill="#6366f1"
    fillOpacity={0.5}
    />
    </RadarChart>
    </ResponsiveContainer>
    </div>
    </section>

    {/* 2. Timeline (단점의 진화) */}
    <section className="space-y-8">
    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
    <ArrowRight className="text-indigo-600" /> 성장 히스토리
    </h2>
    <div className="relative border-l-2 border-indigo-200 ml-4 pl-8 space-y-12">
        {TIMELINE.map((step, idx) => (
                <div key={idx} className="relative">
            <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm ${
                step.type === 'past' ? 'bg-slate-300' : 'bg-indigo-600'
            }`} />
    <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${
        step.type === 'past' ? 'text-slate-400' : 'text-indigo-600'
    }`}>
    {step.title.split(':')[0]}
    </h3>
    <h4 className="text-xl font-bold text-slate-800 mb-2">{step.title.split(':')[1]}</h4>
        <p className="text-slate-600 leading-relaxed max-w-2xl">{step.description}</p>
        </div>
))}
    </div>
    </section>

    {/* 5. User Manual (사용 가이드) */}
    <section className="bg-slate-900 text-white p-10 rounded-[2rem] shadow-xl overflow-hidden relative">
    <div className="absolute top-0 right-0 p-8 opacity-10">
    <Zap size={120} />
    </div>
    <h2 className="text-3xl font-bold mb-10">사용자 가이드 (User Manual)</h2>
    <div className="grid md:grid-cols-2 gap-8">
    <ManualCard
        type="positive"
    title="최적의 시너지 조건"
    items={["명확한 목표가 있는 프로젝트", "자유로운 기술 토론", "데이터 기반의 의사결정"]}
    />
    <ManualCard
    type="warning"
    title="주의 및 관리 방법"
    items={["맥락 없는 단순 반복 작업 지양", "충분한 고민 시간이 주어질 때 고효율"]}
    />
    </div>
    </section>

    </div>
    </div>
);
};

// --- Sub Component ---
const ManualCard: React.FC<ManualItem> = ({ title, items, type }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-4">
    {type === 'positive' ? (
        <CheckCircle2 className="text-emerald-400" size={24} />
) : (
    <AlertCircle className="text-rose-400" size={24} />
)}
<h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <ul className="space-y-3">
    {items.map((item, i) => (
            <li key={i} className="text-slate-300 flex items-start gap-2">
        <span className="text-indigo-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
            {item}
            </li>
))}
</ul>
</div>
);

export default PortfolioCharacter;
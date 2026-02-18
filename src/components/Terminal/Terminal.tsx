import { useState, useRef, useEffect } from 'react';

// 1. 타입 정의 일치화 (message -> content로 통일)
type LogType = 'info' | 'error' | 'success' | 'system';

interface LogItem {
    type: LogType;
    content: string; // 속성명을 content로 통일하여 타입 오류 방지
}

interface IssueLog {
    id: string;
    title: string;
    subtitle: string;
    fullLogs: LogItem[];
}

// 2. 이력서 기반 데이터 (속성명을 content로 수정)
const ISSUES: IssueLog[] = [
    {
        id: "1",
        title: "Ncloud 인프라 및 보안 환경 구축",
        subtitle: "Ncloud / Nginx / SSL",
        fullLogs: [
            { type: 'info', content: "[시스템] Ncloud 인스턴스 프로비저닝 시작..." },
            { type: 'system', content: "[설정] VPC/Subnet 및 보안그룹(ACG) 규칙 정의 완료" },
            { type: 'info', content: "[설치] Reverse Proxy 설정을 위한 Nginx 배포" },
            { type: 'system', content: "[보안] SSL 인증서 적용 및 HTTPS 프로토콜 강제화" },
            { type: 'success', content: "[완료] 7일 이내 인프라 구축 및 정상 오픈 성공" }
        ]
    },
    {
        id: "2",
        title: "민감 정보 암호화 및 CI/CD 파이프라인",
        subtitle: "Jasypt / Jenkins / Spring Boot",
        fullLogs: [
            { type: 'info', content: "[CI/CD] GitLab Webhook 수신, Jenkins 빌드 파이프라인 가동" },
            { type: 'system', content: "[빌드] Spring Boot + QueryDSL 도메인 로직 컴파일 중..." },
            { type: 'error', content: "[경고] 환경 설정 파일 내 민감 정보(DB Password) 노출 위험 감지" },
            { type: 'system', content: "[보안] Jasypt 라이브러리를 이용한 설정값 암호화 적용" },
            { type: 'success', content: "[완료] 원격 서버 SSH 배포 및 서비스 안정화 확인" }
        ]
    },
    {
        id: "3",
        title: "서울반도체/바이오시스 API 및 CMS 구축",
        subtitle: "Rest API / MySQL / Tomcat",
        fullLogs: [
            { type: 'info', content: "[개발] 서울반도체 기업사이트 리뉴얼 Rest API 설계 시작" },
            { type: 'system', content: "[CMS] Pebble Template 기반 관리자 페이지 기능 구현" },
            { type: 'info', content: "[DB] MySQL 기반 데이터 모델링 및 쿼리 최적화" },
            { type: 'system', content: "[배포] Tomcat 9.0 서버 환경에 WAR 패키징 배포" },
            { type: 'success', content: "[완료] 대규모 기업 사이트 API 서비스 정상 가동 중" }
        ]
    },
    {
        id: "4",
        title: "S3 이미지 업로드 및 권한 관리 이슈 해결",
        subtitle: "AWS S3 / Spring Security",
        fullLogs: [
            { type: 'info', content: "[인증] Spring Security를 이용한 사용자 권한 검증" },
            { type: 'error', content: "[장애] 로컬 저장소 이미지 경로 이슈로 타 서버 이미지 엑세스 불가" },
            { type: 'system', content: "[해결] Amazon S3 연동을 통한 퍼블릭 URL 부여 방식으로 전환" },
            { type: 'info', content: "[수정] 이미지 CRUD 로직 내 S3 업로드 라이브러리 통합" },
            { type: 'success', content: "[완료] 분산 환경에서도 안정적인 이미지 서빙 환경 구축" }
        ]
    }
];

export default function ProjectTerminalDashboard() {
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
    const [terminalLogs, setTerminalLogs] = useState<LogItem[]>([]); // 타입 명시
    const [isStreaming, setIsStreaming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [terminalLogs]);

    const handleIssueClick = async (issue: IssueLog) => {
        if (isStreaming) return;

        setSelectedIssueId(issue.id);
        setTerminalLogs([]);
        setIsStreaming(true);

        const initialLog: LogItem = {
            type: 'system',
            content: `hee's@dev-server:~/projects/${issue.id}$ tail -f logs/application.log`
        };
        setTerminalLogs([initialLog]);

        for (const logItem of issue.fullLogs) {
            await new Promise(res => setTimeout(res, 600));
            // 여기서 prev: LogItem[] 타입을 명확히 하여 TS2345 오류 해결
            setTerminalLogs((prev: LogItem[]) => [...prev, logItem]);
        }
        setIsStreaming(false);
    };

    return (
        <div className="flex h-screen w-full bg-[#0d1117] text-gray-300 font-mono overflow-hidden">
            <aside className="w-1/3 border-r border-gray-800 flex flex-col bg-[#161b22]">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-white mb-1">경력 및 프로젝트</h2>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">3.5 Years Exp</p>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-3">
                    {ISSUES.map((issue) => (
                        <div
                            key={issue.id}
                            onClick={() => handleIssueClick(issue)}
                            className={`p-4 rounded-lg border transition-all cursor-pointer ${
                                selectedIssueId === issue.id
                                    ? 'bg-blue-600/10 border-blue-500/50 text-white'
                                    : 'bg-black/20 border-gray-800 hover:border-gray-600'
                            }`}
                        >
                            <div className="text-[10px] text-blue-400 font-bold mb-1 uppercase">{issue.subtitle}</div>
                            <div className="text-sm font-semibold">{issue.title}</div>
                        </div>
                    ))}
                </nav>
            </aside>

            <main className="w-2/3 flex flex-col bg-black">
                <div className="bg-[#21262d] px-4 py-2 flex items-center justify-between border-b border-gray-900">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] text-gray-400 tracking-tight">han_sh@backend_terminal</span>
                    <div className="w-8"></div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-2">
                    {terminalLogs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-700 opacity-50">
                            <span className="text-5xl mb-4 italic">$_</span>
                            <p className="text-xs tracking-widest uppercase text-center">Select an issue to stream debug logs</p>
                        </div>
                    ) : (
                        terminalLogs.map((log, i) => (
                            <div key={i} className="text-[13px] leading-relaxed">
                                <span className={getColor(log.type)}>{log.content}</span>
                            </div>
                        ))
                    )}
                    {isStreaming && (
                        <div className="flex items-center gap-2 mt-4 text-gray-500 animate-pulse">
                            <span className="w-1.5 h-4 bg-blue-500"></span>
                            <span className="text-[11px]">실시간 로그 수집 중...</span>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

function getColor(type: LogType): string {
    const colors: Record<LogType, string> = {
        system: 'text-blue-400 font-bold',
        info: 'text-gray-500',
        error: 'text-red-400 font-bold',
        success: 'text-emerald-400'
    };
    return colors[type] || 'text-gray-300';
}
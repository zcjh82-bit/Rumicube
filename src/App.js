import { useState } from "react";

const TileChip = ({ label, color = "#333", textColor = "#fff", small = false }) => (
  <div style={{
    background: color,
    color: textColor,
    borderRadius: small ? "6px" : "9px",
    padding: small ? "5px 10px" : "8px 14px",
    fontWeight: "800",
    fontSize: small ? "12px" : "15px",
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  }}>{label}</div>
);

const JokerTile = ({ small = false }) => (
  <div style={{
    background: "linear-gradient(135deg, #1a1a1a, #333)",
    color: "#f0c040",
    borderRadius: small ? "6px" : "9px",
    padding: small ? "5px 10px" : "8px 14px",
    fontWeight: "900",
    fontSize: small ? "12px" : "15px",
    border: "2px solid #f0c040",
    boxShadow: "0 2px 12px rgba(240,192,64,0.4)",
    whiteSpace: "nowrap",
  }}>🃏 JOKER</div>
);

const Arrow = () => (
  <span style={{ color: "#888", fontSize: "18px", alignSelf: "center" }}>→</span>
);

const jokerRules = [
  {
    id: "replace",
    icon: "🔀",
    title: "어떤 타일로든 대체 가능",
    color: "#4fc3f7",
    desc: "조커는 세트를 완성하는 데 필요한 어떤 숫자, 어떤 색의 타일로도 쓸 수 있어요.",
    examples: [
      {
        label: "런에서 사용",
        before: [
          <TileChip key="a" label="🔴 5" color="#b71c1c" />,
          <JokerTile key="j" />,
          <TileChip key="b" label="🔴 7" color="#b71c1c" />,
        ],
        after: "조커 = 🔴 6 역할",
        afterColor: "#81c784",
      },
      {
        label: "그룹에서 사용",
        before: [
          <TileChip key="a" label="🔴 9" color="#b71c1c" />,
          <TileChip key="b" label="🔵 9" color="#1565c0" />,
          <JokerTile key="j" />,
        ],
        after: "조커 = 🟡 9 또는 ⚫ 9 역할",
        afterColor: "#81c784",
      },
    ],
  },
  {
    id: "retrieve",
    icon: "🤲",
    title: "테이블의 조커 가져오기",
    color: "#aed581",
    desc: "테이블 위에 놓인 조커를 내 손으로 가져올 수 있어요. 단, 조커가 대체하는 실제 타일을 그 자리에 놓아야 해요.",
    steps: [
      { text: "테이블에 🔴5, 🃏, 🔴7 이 있다고 가정해요." },
      { text: "내 손에 🔴6이 있다면, 🔴6을 조커 자리에 놓고 조커를 가져올 수 있어요." },
      { text: "가져온 조커는 같은 턴 또는 이후 턴에 자유롭게 사용 가능!" },
    ],
    warning: "단, 조커를 가져온 턴에 반드시 다른 타일을 내려놓아야 해요 (조커만 가져오고 끝낼 수 없어요).",
  },
  {
    id: "initial",
    icon: "🚀",
    title: "첫 공개(Initial Meld)에서 조커",
    color: "#ffab91",
    desc: "처음 타일을 내려놓을 때 조커를 사용하면 조커의 점수는 0점으로 계산돼요.",
    examples: [
      {
        label: "예시",
        before: [
          <TileChip key="a" label="🔴 10" color="#b71c1c" />,
          <TileChip key="b" label="🔴 11" color="#b71c1c" />,
          <JokerTile key="j" />,
        ],
        after: "합계 = 10 + 11 + 0 = 21점 ❌ (30점 미달!)",
        afterColor: "#ef9a9a",
      },
      {
        label: "비교",
        before: [
          <TileChip key="a" label="🔴 10" color="#b71c1c" />,
          <TileChip key="b" label="🔴 11" color="#b71c1c" />,
          <TileChip key="c" label="🔴 12" color="#b71c1c" />,
        ],
        after: "합계 = 10 + 11 + 12 = 33점 ✅",
        afterColor: "#81c784",
      },
    ],
  },
  {
    id: "penalty",
    icon: "💸",
    title: "게임 종료 시 조커가 남아있으면",
    color: "#ce93d8",
    desc: "다른 플레이어가 먼저 이겼을 때 내 손에 조커가 남아 있다면 무려 -30점 패널티를 받아요!",
    warning: "조커는 강력하지만, 끝까지 쥐고 있으면 독이 돼요. 최대한 빨리 사용하는 게 좋아요.",
    tip: "💡 조커를 오래 보유하기보다 테이블 조작 등으로 빠르게 내려놓는 전략이 유리해요.",
  },
  {
    id: "rules",
    icon: "📋",
    title: "조커 관련 기타 규칙",
    color: "#80cbc4",
    desc: "알아두면 유용한 조커 세부 규칙들이에요.",
    list: [
      "한 세트에 조커는 1개만 사용할 수 있어요.",
      "조커를 가져올 때는 반드시 같은 턴에 다른 타일을 1개 이상 내려놓아야 해요.",
      "조커가 포함된 세트도 일반 세트와 똑같이 조작(분리·확장)할 수 있어요.",
      "조커를 가져간 후 테이블의 세트가 여전히 유효해야 해요 (3개 이상 유지).",
    ],
  },
];

const sections_nav = [
  { id: "joker", label: "🃏 조커 완벽 가이드" },
];

export default function JokerGuide() {
  const [active, setActive] = useState("replace");
  const current = jokerRules.find(r => r.id === active);
  const currentIdx = jokerRules.findIndex(r => r.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d12",
      color: "#e8e6e0",
      fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
      fontSize: "14px",
      lineHeight: "1.75",
    }}>
      {/* Header */}
      <div style={{
        padding: "32px 24px 20px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "linear-gradient(180deg, #1a1020 0%, transparent 100%)",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "5px", color: "#f0c040", textTransform: "uppercase", marginBottom: "8px" }}>Rummikub Guide</div>
        <h1 style={{ margin: 0, fontSize: "clamp(22px,5vw,34px)", fontWeight: "900", letterSpacing: "-1px" }}>
          🃏 조커 사용법 완벽 가이드
        </h1>
        <p style={{ margin: "8px 0 0", color: "#777", fontSize: "13px" }}>루미큐브에서 가장 헷갈리는 조커 규칙을 모두 정리했어요</p>
      </div>

      {/* Tab Nav */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: "8px",
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        scrollbarWidth: "none",
      }}>
        {jokerRules.map(r => (
          <button key={r.id} onClick={() => setActive(r.id)} style={{
            flexShrink: 0,
            background: active === r.id ? r.color : "rgba(255,255,255,0.05)",
            color: active === r.id ? "#0d0d12" : "#bbb",
            border: "none",
            borderRadius: "20px",
            padding: "8px 16px",
            fontSize: "12px",
            fontWeight: active === r.id ? "800" : "400",
            cursor: "pointer",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>
            {r.icon} {r.title.length > 12 ? r.title.slice(0, 12) + "…" : r.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "24px 18px" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${current.color}33`,
          borderLeft: `4px solid ${current.color}`,
          borderRadius: "18px",
          padding: "24px",
        }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "19px", fontWeight: "900", color: current.color }}>
            {current.icon} {current.title}
          </h2>
          <p style={{ margin: "0 0 20px", color: "#ccc" }}>{current.desc}</p>

          {/* Examples */}
          {current.examples && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {current.examples.map((ex, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>{ex.label}</div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "10px" }}>
                    {ex.before}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Arrow />
                    <span style={{ color: ex.afterColor, fontWeight: "700", fontSize: "13px" }}>{ex.after}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Steps */}
          {current.steps && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {current.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: current.color, color: "#0d0d12",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "900", fontSize: "12px", flexShrink: 0, marginTop: "2px",
                  }}>{i + 1}</div>
                  <p style={{ margin: 0, color: "#ccc" }}>{step.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* List */}
          {current.list && (
            <ul style={{ paddingLeft: "18px", color: "#ccc", display: "flex", flexDirection: "column", gap: "8px" }}>
              {current.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {/* Warning */}
          {current.warning && (
            <div style={{
              marginTop: "16px",
              background: "rgba(239,154,154,0.1)",
              border: "1px solid rgba(239,154,154,0.3)",
              borderRadius: "10px",
              padding: "12px 14px",
              color: "#ef9a9a",
              fontSize: "13px",
            }}>
              ⚠️ {current.warning}
            </div>
          )}

          {/* Tip */}
          {current.tip && (
            <div style={{
              marginTop: "12px",
              background: "rgba(240,192,64,0.08)",
              border: "1px solid rgba(240,192,64,0.25)",
              borderRadius: "10px",
              padding: "12px 14px",
              color: "#f0c040",
              fontSize: "13px",
            }}>
              {current.tip}
            </div>
          )}
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          {currentIdx > 0 ? (
            <button onClick={() => setActive(jokerRules[currentIdx - 1].id)} style={{
              flex: 1, background: "rgba(255,255,255,0.06)", color: "#ccc",
              border: "none", borderRadius: "12px", padding: "12px",
              cursor: "pointer", fontSize: "13px",
            }}>← 이전</button>
          ) : <div style={{ flex: 1 }} />}
          {currentIdx < jokerRules.length - 1 ? (
            <button onClick={() => setActive(jokerRules[currentIdx + 1].id)} style={{
              flex: 1, background: current.color, color: "#0d0d12",
              border: "none", borderRadius: "12px", padding: "12px",
              cursor: "pointer", fontSize: "13px", fontWeight: "700",
            }}>다음 →</button>
          ) : (
            <button onClick={() => setActive("replace")} style={{
              flex: 1, background: current.color, color: "#0d0d12",
              border: "none", borderRadius: "12px", padding: "12px",
              cursor: "pointer", fontSize: "13px", fontWeight: "700",
            }}>🃏 처음부터</button>
          )}
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "16px" }}>
          {jokerRules.map((r, i) => (
            <div key={r.id} onClick={() => setActive(r.id)} style={{
              width: active === r.id ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: active === r.id ? current.color : "rgba(255,255,255,0.15)",
              cursor: "pointer",
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

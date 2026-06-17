import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import '../styles/game.css';

import { DIFFICULTIES, ZONE_INFO, ALL_BUILDINGS, RESEARCH_TREE, CONTRACTS, EXPEDITIONS } from '../data/gameData';
import { makeDefault, doSave, doLoad, GameState } from '../utils/gameState';
import { calculateGameTick, buyBuilding, sellBuilding, unlockResearch, checkZoneAdvance, doPrestige, completeContract, completeExpedition } from '../utils/gameLogic';
import { fmtNum, fmtRate, XP_PER_LEVEL } from '../utils/formatters';

export default function Game() {
  const sr = useRef<GameState>(makeDefault());
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState('buildings');
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);

  // Load saved game on mount
  useEffect(() => {
    const saved = doLoad();
    if (saved) {
      sr.current = saved;
      setTick(t => t + 1);
    }
  }, []);

  // Game loop
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      calculateGameTick(sr.current, speed);
      setTick(t => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [paused, speed]);

  // Auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      doSave(sr.current);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const s = sr.current;
  const diff = DIFFICULTIES[(s.difficulty || 'normal') as keyof typeof DIFFICULTIES] || DIFFICULTIES.normal;
  const zInfo = ZONE_INFO[s.zone - 1] || ZONE_INFO[0];

  const handleBuyBuilding = useCallback((buildingId: string) => {
    if (buyBuilding(s, buildingId)) {
      setTick(t => t + 1);
    }
  }, [s]);

  const handleSellBuilding = useCallback((buildingId: string) => {
    if (sellBuilding(s, buildingId)) {
      setTick(t => t + 1);
    }
  }, [s]);

  const handleUnlockResearch = useCallback((researchId: string) => {
    if (unlockResearch(s, researchId)) {
      setTick(t => t + 1);
    }
  }, [s]);

  const handleReset = useCallback(() => {
    if (confirm('Oyunu sıfırlamak istediğine emin misin?')) {
      sr.current = makeDefault(s.difficulty);
      doSave(sr.current);
      setTick(t => t + 1);
    }
  }, [s.difficulty]);

  const zoneBuildings = useMemo(() => ALL_BUILDINGS.filter(b => b.zone === s.zone), [s.zone]);

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="header-title">🏭 Endüstri İmparatorluğu</div>
        <div className="header-stats">
          <div className="stat">💰 {fmtNum(s.money)} TL</div>
          <div className="stat">⬆️ Lv {s.level}</div>
          <div className="stat">🌐 {zInfo.name}</div>
          <div className="stat">🔬 {fmtNum(s.researchPoints)} RP</div>
        </div>
        <div className="header-controls">
          <button onClick={() => setPaused(!paused)}>
            {paused ? '▶️' : '⏸️'}
          </button>
          <button onClick={() => setSpeed(speed === 1 ? 2 : 1)}>
            {speed === 1 ? '⏩' : '⏱️'}
          </button>
        </div>
      </header>

      <nav className="game-tabs">
        {['buildings', 'research', 'resources', 'contracts', 'settings'].map(t => (
          <button
            key={t}
            className={`tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'buildings' && '🏗️ Binalar'}
            {t === 'research' && '🔬 Araştırma'}
            {t === 'resources' && '📦 Kaynaklar'}
            {t === 'contracts' && '📋 Sözleşmeler'}
            {t === 'settings' && '⚙️ Ayarlar'}
          </button>
        ))}
      </nav>

      <main className="game-content">
        {tab === 'buildings' && (
          <div className="buildings-tab">
            <h2>🏗️ Binalar - {zInfo.name}</h2>
            <div className="buildings-grid">
              {zoneBuildings.map(b => {
                const count = s.bldCounts[b.id] || 0;
                const cost = b.cost;
                const canBuy = s.money >= cost;
                return (
                  <div key={b.id} className={`building-card ${canBuy ? '' : 'cant-afford'}`}>
                    <div className="building-header">
                      <span className="building-icon">{b.icon}</span>
                      <span className="building-name">{b.name}</span>
                    </div>
                    <div className="building-desc">{b.desc}</div>
                    <div className="building-stats">
                      <div>Sahip: <strong>{count}</strong></div>
                      <div>Maliyet: <strong>{fmtNum(cost)} TL</strong></div>
                      {b.output && <div>Çıktı: <strong>{b.output}</strong> {fmtRate(b.rate)}</div>}
                      {b.energyProd > 0 && <div>Enerji: <strong>+{b.energyProd}</strong></div>}
                      {b.energyUse > 0 && <div>Enerji: <strong>-{b.energyUse}</strong></div>}
                    </div>
                    <div className="building-actions">
                      <button
                        className="buy-btn"
                        onClick={() => handleBuyBuilding(b.id)}
                        disabled={!canBuy}
                      >
                        Satın Al
                      </button>
                      {count > 0 && (
                        <button
                          className="sell-btn"
                          onClick={() => handleSellBuilding(b.id)}
                        >
                          Sat
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'research' && (
          <div className="research-tab">
            <h2>🔬 Araştırma</h2>
            <div className="research-grid">
              {RESEARCH_TREE.map(r => {
                const done = (s.researchUnlocked || []).includes(r.id);
                const canUnlock = s.researchPoints >= (r.cost || 0) && !done;
                return (
                  <div key={r.id} className={`research-card ${done ? 'done' : ''}`}>
                    <div className="research-icon">{r.icon}</div>
                    <div className="research-name">{r.name}</div>
                    <div className="research-desc">{r.desc}</div>
                    {!done && <div className="research-cost">{fmtNum(r.cost || 0)} RP</div>}
                    {done && <div className="research-status">✓ Tamamlandı</div>}
                    {!done && (
                      <button
                        className="unlock-btn"
                        onClick={() => handleUnlockResearch(r.id)}
                        disabled={!canUnlock}
                      >
                        Araştır
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'resources' && (
          <div className="resources-tab">
            <h2>📦 Kaynaklar</h2>
            <div className="resources-list">
              <div className="resource-item">
                <span>💰 Para</span>
                <span className="resource-value">{fmtNum(s.money)} TL</span>
              </div>
              <div className="resource-item">
                <span>🔬 Araştırma Puanı</span>
                <span className="resource-value">{fmtNum(s.researchPoints)}</span>
              </div>
              <div className="resource-item">
                <span>⚡ Enerji</span>
                <span className="resource-value">{s.energyProd} / {s.energyCons}</span>
              </div>
              {Object.entries(s.resources).map(([res, amount]) => (
                <div key={res} className="resource-item">
                  <span>{res}</span>
                  <span className="resource-value">{fmtNum(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'contracts' && (
          <div className="contracts-tab">
            <h2>📋 Sözleşmeler & Keşifler</h2>
            <div className="contracts-section">
              <h3>Sözleşmeler</h3>
              <div className="contracts-grid">
                {CONTRACTS.filter(c => c.zone <= s.zone).map(c => {
                  const done = (s.contractsCompleted || []).includes(c.id);
                  return (
                    <div key={c.id} className={`contract-card ${done ? 'done' : ''}`}>
                      <div className="contract-icon">{c.icon}</div>
                      <div className="contract-name">{c.name}</div>
                      <div className="contract-desc">{c.desc}</div>
                      <div className="contract-reward">{fmtNum(c.reward)} TL</div>
                      {!done && (
                        <button className="complete-btn" onClick={() => {
                          if (completeContract(s, c.id, c.reward)) {
                            setTick(t => t + 1);
                          }
                        }}>Tamamla</button>
                      )}
                      {done && <div className="contract-status">✓ Tamamlandı</div>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="expeditions-section">
              <h3>Keşifler</h3>
              <div className="expeditions-grid">
                {EXPEDITIONS.filter(e => e.zone <= s.zone).map(e => {
                  const done = (s.expeditionsCompleted || []).includes(e.id);
                  return (
                    <div key={e.id} className={`expedition-card ${done ? 'done' : ''}`}>
                      <div className="expedition-icon">{e.icon}</div>
                      <div className="expedition-name">{e.name}</div>
                      <div className="expedition-desc">{e.desc}</div>
                      <div className="expedition-chance">{Math.round(e.chance * 100)}% şans</div>
                      {!done && (
                        <button className="explore-btn" onClick={() => {
                          if (completeExpedition(s, e.id, e.reward, e.chance)) {
                            setTick(t => t + 1);
                          } else {
                            setTick(t => t + 1);
                          }
                        }}>Keşfet</button>
                      )}
                      {done && <div className="expedition-status">✓ Tamamlandı</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="settings-tab">
            <h2>⚙️ Ayarlar</h2>
            <div className="settings-section">
              <h3>Oyun Durumu</h3>
              <div className="setting-item">
                <span>Seviye: {s.level}</span>
              </div>
              <div className="setting-item">
                <span>Bölge: {s.zone}</span>
              </div>
              <div className="setting-item">
                <span>Zorluk: {diff.label}</span>
              </div>
              <div className="setting-item">
                <span>Oyun Süresi: {Math.floor(s.playTime)}s</span>
              </div>
            </div>
            <div className="settings-section">
              <h3>İstatistikler</h3>
              <div className="setting-item">
                <span>Toplam Bina: {s.totalBuildings}</span>
              </div>
              <div className="setting-item">
                <span>Toplam Kazanç: {fmtNum(s.totalEarned)} TL</span>
              </div>
              <div className="setting-item">
                <span>Araştırmalar: {s.researchUnlocked.length}</span>
              </div>
            </div>
            <div className="settings-section">
              <h3>Prestige</h3>
              <div className="setting-item">
                <span>Prestige Sayısı: {s.prestigeCount || 0}</span>
              </div>
              <div className="setting-item">
                <span>Prestige Bonusu: ×{(s.prestigeBonus || 1).toFixed(2)}</span>
              </div>
              {s.zone >= 2 && (
                <button className="prestige-btn" onClick={() => {
                  if (confirm(`Prestige yap? (${(s.zone - 1) * 10}% bonus kazanacaksın)`)) {
                    sr.current = doPrestige(s, makeDefault);
                    doSave(sr.current);
                    setTick(t => t + 1);
                  }
                }}>
                  ✨ Prestige Yap
                </button>
              )}
            </div>
            <div className="settings-section">
              <button className="reset-btn" onClick={handleReset}>
                🔄 Oyunu Sıfırla
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

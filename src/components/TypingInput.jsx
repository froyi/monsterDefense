import { useRef, useEffect, useState, useCallback } from 'react';
import useGameStore from '../stores/useGameStore';
import useStatsStore from '../stores/useStatsStore';

function TypingInput() {
    const inputRef = useRef(null);
    const typeChar = useGameStore(s => s.typeChar);
    const getActiveMonster = useGameStore(s => s.getActiveMonster);
    const monsters = useGameStore(s => s.monsters);
    const activeMonsterIndex = useGameStore(s => s.activeMonsterIndex);
    const phase = useGameStore(s => s.phase);
    const combo = useGameStore(s => s.combo);
    const recordKeypress = useStatsStore(s => s.recordKeypress);

    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const feedbackTimeout = useRef(null);

    // Keep input focused
    useEffect(() => {
        const focus = () => {
            if (inputRef.current && phase === 'playing') {
                inputRef.current.focus();
            }
        };
        focus();
        const interval = setInterval(focus, 500);
        document.addEventListener('click', focus);
        return () => {
            clearInterval(interval);
            document.removeEventListener('click', focus);
        };
    }, [phase]);

    const showFeedback = useCallback((text, type) => {
        setFeedback({ text, type });
        if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
        feedbackTimeout.current = setTimeout(() => {
            setFeedback({ text: '', type: '' });
        }, 1200);
    }, []);

    const handleKeyDown = useCallback((e) => {
        // Prevent default for most keys to avoid browser shortcuts
        if (e.key.length === 1 || e.key === 'Backspace') {
            e.preventDefault();
        }

        if (e.key.length !== 1) return; // Only single characters

        const monster = getActiveMonster();
        if (!monster) return;

        const expectedChar = monster.word[monster.typed];
        if (!expectedChar) return;

        const isCorrect = e.key === expectedChar;

        // Record stats
        recordKeypress(expectedChar, isCorrect);

        // Process in game store
        typeChar(e.key, expectedChar);

        if (isCorrect) {
            if (combo > 0 && (combo + 1) % 10 === 0) {
                showFeedback(`🔥 ${combo + 1}er Combo!`, 'hit');
            }
        } else {
            showFeedback('Fast! Versuch\'s nochmal! 💪', 'miss');
        }
    }, [getActiveMonster, combo, typeChar, recordKeypress, showFeedback]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Get active monster for display
    const activeMonster = monsters[activeMonsterIndex];
    const hasActiveMonster = activeMonster && !activeMonster.defeated && !activeMonster.reachedCastle;

    const renderCurrentWord = () => {
        if (!hasActiveMonster) {
            return <span style={{ color: 'var(--text-muted)' }}>Warte auf Monster...</span>;
        }

        return activeMonster.word.split('').map((char, i) => {
            let className = 'char-pending';
            if (i < activeMonster.typed) className = 'char-correct';
            else if (i === activeMonster.typed) className = 'char-current';

            return <span key={i} className={className}>{char}</span>;
        });
    };

    return (
        <div className="typing-area">
            <input
                ref={inputRef}
                className="typing-input-hidden"
                type="text"
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                tabIndex={0}
            />
            <div className="typing-word-display" id="typing-display">
                {renderCurrentWord()}
            </div>
            <div className={`typing-feedback ${feedback.type}`} id="typing-feedback">
                {feedback.text}
            </div>
            <div className="typing-hint">
                Tippe das Wort, um das Monster zu besiegen!
            </div>
        </div>
    );
}

export default TypingInput;

/**
 * EcrioniX Privacy-First Learner Progress & Retention Engine
 * 100% Client-Side (localStorage), zero third-party telemetry, instant reactivity.
 */
(function(window) {
  'use strict';

  const STORAGE_KEY = 'ecrionix_learner_progress_v1';

  function getTodayString() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  function getYesterdayString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('[EcrioniX Progress] Failed to read localStorage', e);
    }
    return {
      completed: {},
      bookmarks: {},
      streak: {
        count: 1,
        lastDate: getTodayString(),
        history: [getTodayString()]
      },
      lastActive: Date.now()
    };
  }

  function saveState(state) {
    try {
      state.lastActive = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new CustomEvent('ecx-progress-updated', { detail: state }));
    } catch (e) {
      console.warn('[EcrioniX Progress] Failed to write localStorage', e);
    }
  }

  function checkStreak(state) {
    if (!state.streak) {
      state.streak = { count: 1, lastDate: getTodayString(), history: [getTodayString()] };
      return;
    }
    const today = getTodayString();
    const yesterday = getYesterdayString();
    const last = state.streak.lastDate;

    if (last === today) {
      // Already active today
      return;
    } else if (last === yesterday) {
      // Consecutive day!
      state.streak.count = (state.streak.count || 1) + 1;
      state.streak.lastDate = today;
      if (!Array.isArray(state.streak.history)) state.streak.history = [];
      if (!state.streak.history.includes(today)) state.streak.history.push(today);
    } else {
      // Broken streak
      state.streak.count = 1;
      state.streak.lastDate = today;
      if (!Array.isArray(state.streak.history)) state.streak.history = [];
      if (!state.streak.history.includes(today)) state.streak.history.push(today);
    }
  }

  const Engine = {
    getState: function() {
      const state = loadState();
      checkStreak(state);
      return state;
    },

    isCompleted: function(id) {
      const state = this.getState();
      return !!state.completed[id];
    },

    setCompleted: function(id, val) {
      const state = this.getState();
      if (val) {
        state.completed[id] = Date.now();
      } else {
        delete state.completed[id];
      }
      saveState(state);
      return !!val;
    },

    toggleCompleted: function(id) {
      const state = this.getState();
      const current = !!state.completed[id];
      if (current) {
        delete state.completed[id];
      } else {
        state.completed[id] = Date.now();
      }
      saveState(state);
      return !current;
    },

    isBookmarked: function(id) {
      const state = this.getState();
      return !!state.bookmarks[id];
    },

    toggleBookmark: function(id) {
      const state = this.getState();
      const current = !!state.bookmarks[id];
      if (current) {
        delete state.bookmarks[id];
      } else {
        state.bookmarks[id] = Date.now();
      }
      saveState(state);
      return !current;
    },

    getStats: function() {
      const state = this.getState();
      const completedCount = Object.keys(state.completed || {}).length;
      const bookmarkCount = Object.keys(state.bookmarks || {}).length;
      return {
        completedCount: completedCount,
        bookmarkCount: bookmarkCount,
        streakCount: (state.streak && state.streak.count) || 1,
        lastActive: state.lastActive || Date.now()
      };
    },

    getPathProgress: function(stepIds) {
      if (!Array.isArray(stepIds) || stepIds.length === 0) {
        return { completed: 0, total: 0, percent: 0 };
      }
      const state = this.getState();
      let done = 0;
      for (let i = 0; i < stepIds.length; i++) {
        if (state.completed[stepIds[i]]) {
          done++;
        }
      }
      return {
        completed: done,
        total: stepIds.length,
        percent: Math.round((done / stepIds.length) * 100)
      };
    },

    exportSummaryMarkdown: function() {
      const state = this.getState();
      const stats = this.getStats();
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      
      let md = `# EcrioniX Engineering Learning Transcript\n\n`;
      md += `**Date:** ${date}\n`;
      md += `**Learning Streak:** ${stats.streakCount} Day(s)\n`;
      md += `**Total Modules & Challenges Completed:** ${stats.completedCount}\n`;
      md += `**Bookmarked Topics:** ${stats.bookmarkCount}\n\n`;
      
      md += `## Completed Items\n`;
      const keys = Object.keys(state.completed || {});
      if (keys.length === 0) {
        md += `_No modules completed yet._\n`;
      } else {
        keys.forEach(k => {
          const time = new Date(state.completed[k]).toISOString().split('T')[0];
          md += `- [x] **${k}** (Completed: ${time})\n`;
        });
      }
      
      md += `\n---\n*Verified locally via EcrioniX Privacy-First Engineering Hub (https://ecrionix.org)*\n`;
      return md;
    },

    downloadSummary: function() {
      const md = this.exportSummaryMarkdown();
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ecrionix-learning-transcript-${getTodayString()}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    resetAll: function() {
      if (confirm('Are you sure you want to reset all local course progress, bookmarks, and streaks?')) {
        localStorage.removeItem(STORAGE_KEY);
        const blank = {
          completed: {},
          bookmarks: {},
          streak: { count: 1, lastDate: getTodayString(), history: [getTodayString()] },
          lastActive: Date.now()
        };
        saveState(blank);
        return true;
      }
      return false;
    }
  };

  // Run initial streak check
  Engine.getState();

  window.EcrioniXProgress = Engine;
})(window);

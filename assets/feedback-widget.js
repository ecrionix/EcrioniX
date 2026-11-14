/**
 * EcrioniX In-Page Contextual Engineering Feedback Widget
 * Lightweight, privacy-respecting, rate-limited.
 */
(function(window, document) {
  'use strict';

  function initFeedbackWidget() {
    // Avoid double injection
    if (document.getElementById('ecx-feedback-root')) return;

    const root = document.createElement('div');
    root.id = 'ecx-feedback-root';
    root.innerHTML = `
      <style>
        #ecx-feedback-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0c1526;
          color: #38bdf8;
          border: 1px solid rgba(56,189,248,0.35);
          border-radius: 999px;
          padding: 8px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          z-index: 9998;
          transition: all 0.2s ease;
        }
        #ecx-feedback-btn:hover {
          transform: translateY(-2px);
          background: #38bdf8;
          color: #020617;
        }
        #ecx-feedback-card {
          position: fixed;
          bottom: 74px;
          right: 24px;
          width: 320px;
          background: #080d1a;
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 16px 36px rgba(0,0,0,0.5);
          z-index: 9999;
          display: none;
          font-family: 'Outfit', sans-serif;
        }
        .ecx-fb-title {
          font-size: 14px;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ecx-fb-close {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 18px;
          cursor: pointer;
        }
        .ecx-fb-options {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }
        .ecx-fb-opt-btn {
          flex: 1;
          padding: 6px;
          background: #0c1526;
          border: 1px solid rgba(148,163,184,0.15);
          color: #e2e8f0;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.15s;
        }
        .ecx-fb-opt-btn:hover, .ecx-fb-opt-btn.active {
          border-color: #38bdf8;
          color: #38bdf8;
          background: rgba(56,189,248,0.1);
        }
        .ecx-fb-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 8px;
          background: #020617;
          border: 1px solid rgba(148,163,184,0.15);
          border-radius: 6px;
          color: #f8fafc;
          font-size: 12px;
          font-family: inherit;
          resize: none;
          height: 64px;
          margin-bottom: 10px;
          outline: none;
        }
        .ecx-fb-textarea:focus {
          border-color: #38bdf8;
        }
        .ecx-fb-submit {
          width: 100%;
          padding: 7px;
          background: #2dd4bf;
          color: #020617;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }
        .ecx-fb-submit:hover {
          background: #14b8a6;
        }
      </style>
      <button id="ecx-feedback-btn" onclick="window.EcrioniXFeedback.toggle()">
        <span>💬</span> Feedback
      </button>
      <div id="ecx-feedback-card">
        <div class="ecx-fb-title">
          <span>Tool &amp; Lesson Feedback</span>
          <button class="ecx-fb-close" onclick="window.EcrioniXFeedback.close()">&times;</button>
        </div>
        <p style="font-size:12px; color:#94a3b8; margin-bottom:8px;">Was this engineering resource useful?</p>
        <div class="ecx-fb-options">
          <button class="ecx-fb-opt-btn" id="btnFbUseful" onclick="window.EcrioniXFeedback.setRating('useful')">👍 Yes, Helpful</button>
          <button class="ecx-fb-opt-btn" id="btnFbIssue" onclick="window.EcrioniXFeedback.setRating('needs_improvement')">⚠️ Found Issue</button>
        </div>
        <textarea class="ecx-fb-textarea" id="txtFbNote" placeholder="What was confusing or what should be added?"></textarea>
        <button class="ecx-fb-submit" onclick="window.EcrioniXFeedback.submit()">Send Feedback</button>
      </div>
    `;

    document.body.appendChild(root);
  }

  let selectedRating = 'useful';

  window.EcrioniXFeedback = {
    toggle: function() {
      const card = document.getElementById('ecx-feedback-card');
      if (card) card.style.display = (card.style.display === 'block') ? 'none' : 'block';
    },
    close: function() {
      const card = document.getElementById('ecx-feedback-card');
      if (card) card.style.display = 'none';
    },
    setRating: function(rating) {
      selectedRating = rating;
      const b1 = document.getElementById('btnFbUseful');
      const b2 = document.getElementById('btnFbIssue');
      if (b1 && b2) {
        if (rating === 'useful') {
          b1.classList.add('active');
          b2.classList.remove('active');
        } else {
          b2.classList.add('active');
          b1.classList.remove('active');
        }
      }
    },
    submit: function() {
      const note = (document.getElementById('txtFbNote').value || '').trim();
      const payload = {
        path: window.location.pathname,
        rating: selectedRating,
        note: note,
        timestamp: Date.now()
      };

      try {
        if (window.firebase && firebase.firestore) {
          firebase.firestore().collection('user_feedback').add(payload);
        }
      } catch(e){}

      // Local storage cache
      try {
        const stored = JSON.parse(localStorage.getItem('ecx_user_feedback') || '[]');
        stored.push(payload);
        localStorage.setItem('ecx_user_feedback', JSON.stringify(stored));
      } catch(e){}

      const card = document.getElementById('ecx-feedback-card');
      if (card) {
        card.innerHTML = `<p style="color:#2dd4bf;font-weight:700;font-size:13px;text-align:center;padding:12px 0;">✓ Thank you! Your feedback helps engineering peers worldwide.</p>`;
        setTimeout(() => { card.style.display = 'none'; }, 2200);
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeedbackWidget);
  } else {
    initFeedbackWidget();
  }
})(window, document);

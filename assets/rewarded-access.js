/**
 * EcrioniX Rewarded Ad Access Architecture
 * Implements Google Ad Manager Web Rewarded Ads policy & graceful fallback
 */
(function() {
  'use strict';

  const SESSION_PREFIX = 'ecx_unlocked_lesson_';
  let isGamRewardedConfigured = false;
  let rewardedSlot = null;
  let onRewardGrantedCallback = null;

  // Initialize Google Publisher Tag for Rewarded Ads if configured
  if (window.googletag && googletag.cmd) {
    googletag.cmd.push(() => {
      if (typeof googletag.defineOutOfPageSlot === 'function' &&
          googletag.enums && googletag.enums.OutOfPageType &&
          googletag.enums.OutOfPageType.REWARDED) {
        
        // Note: Replace with active GAM rewarded ad unit path when configured in Google Ad Manager
        // e.g. googletag.defineOutOfPageSlot('/1234567/rewarded_ad_unit', googletag.enums.OutOfPageType.REWARDED);
        
        // Listen for official Google rewarded events
        googletag.pubads().addEventListener('rewardedSlotGranted', (event) => {
          console.log('[RewardedAd] Reward officially granted by Google Ad Manager:', event.payload);
          if (typeof onRewardGrantedCallback === 'function') {
            onRewardGrantedCallback(true);
            onRewardGrantedCallback = null;
          }
        });

        googletag.pubads().addEventListener('rewardedSlotClosed', () => {
          console.log('[RewardedAd] Rewarded ad closed by user.');
          if (typeof onRewardGrantedCallback === 'function') {
            onRewardGrantedCallback(false);
            onRewardGrantedCallback = null;
          }
        });
      }
    });
  }

  // Public Interface
  window.EcrioniXRewardedAd = {
    /**
     * Checks if GAM Web Rewarded ad inventory is active and supported
     */
    isAvailable: function() {
      return isGamRewardedConfigured && typeof window.googletag !== 'undefined';
    },

    /**
     * Checks if a specific lesson has already been unlocked for this session
     */
    isLessonUnlocked: function(lessonId) {
      return sessionStorage.getItem(SESSION_PREFIX + lessonId) === 'true';
    },

    /**
     * Marks a lesson as unlocked for the current browser session
     */
    unlockLessonSession: function(lessonId) {
      sessionStorage.setItem(SESSION_PREFIX + lessonId, 'true');
      console.log(`[RewardedAd] Lesson ${lessonId} unlocked for active session.`);
    },

    /**
     * Requests rewarded ad playback or executes graceful open-access fallback
     */
    requestUnlock: function(lessonId, onGranted, onDeclined) {
      if (this.isLessonUnlocked(lessonId)) {
        if (onGranted) onGranted();
        return;
      }

      if (this.isAvailable()) {
        onRewardGrantedCallback = (granted) => {
          if (granted) {
            this.unlockLessonSession(lessonId);
            if (onGranted) onGranted();
          } else {
            if (onDeclined) onDeclined();
          }
        };
        // Display Google GAM rewarded prompt
        googletag.cmd.push(() => {
          googletag.pubads().display(rewardedSlot);
        });
      } else {
        // Graceful Fallback: When GAM rewarded inventory is not active,
        // grant open-access without fake promises or ad simulations.
        console.log('[RewardedAd] GAM Rewarded inventory not configured. Granting open access fallback.');
        this.unlockLessonSession(lessonId);
        if (onGranted) onGranted();
      }
    }
  };
  window.EcrioniXRewarded = window.EcrioniXRewardedAd;
})();

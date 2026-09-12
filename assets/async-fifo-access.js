/* Open course: article is always visible (AdSense / no-JS). Sign-in saves progress. */
(function () {
  'use strict';

  function hideSpinner() {
    var el = document.getElementById('authLoading');
    if (el) el.style.display = 'none';
  }

  function show(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
  }

  function setBanner(user) {
    var banner = document.getElementById('afSignInBanner');
    if (!banner) return;
    banner.style.display = user ? 'none' : 'block';
  }

  window.EcrioniXAsyncFifo = {
    hasAccess: function (user) {
      return !!user;
    },
    bootLesson: function (slug) {
      hideSpinner();
      show('lessonContent');
      if (typeof firebase === 'undefined' || !firebase.auth) {
        setBanner(null);
        if (typeof window.onAsyncFifoReady === 'function') window.onAsyncFifoReady();
        return;
      }
      firebase.auth().onAuthStateChanged(function (user) {
        hideSpinner();
        show('lessonContent');
        setBanner(user);
        if (user && slug) {
          firebase.firestore().collection('users').doc(user.uid).set({
            completedLessons: { 'async-fifo': firebase.firestore.FieldValue.arrayUnion(slug) }
          }, { merge: true }).catch(function () {});
        }
        if (typeof window.onAsyncFifoReady === 'function') window.onAsyncFifoReady();
      });
    },
    bootIndex: function () {
      hideSpinner();
      show('courseContent');
      if (typeof firebase === 'undefined' || !firebase.auth) return;
      firebase.auth().onAuthStateChanged(function (user) {
        hideSpinner();
        show('courseContent');
        setBanner(user);
        if (!user) return;
        firebase.firestore().collection('users').doc(user.uid).get().then(function (doc) {
          var data = doc.data() || {};
          var completed = (data.completedLessons && data.completedLessons['async-fifo']) || [];
          var slugs = window.ASYNC_FIFO_LESSON_SLUGS || [];
          var n = slugs.filter(function (s) { return completed.indexOf(s) !== -1; }).length;
          var fill = document.querySelector('.course-progress-fill');
          var label = document.querySelector('.course-progress-label');
          if (fill && slugs.length) fill.style.width = Math.round((n / slugs.length) * 100) + '%';
          if (label) label.textContent = n + ' of ' + slugs.length + ' lessons complete';
        }).catch(function () {});
      });
    }
  };

  window.addEventListener('scroll', function () {
    var b = document.getElementById('back-to-top');
    if (b) b.classList.toggle('show', window.scrollY > 400);
  });
})();

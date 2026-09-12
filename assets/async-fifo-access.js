/* Admin-only gate for the Async FIFO from Scratch course.
   Later: also allow approvedCourses.includes('async-fifo'). */
(function () {
  'use strict';
  var ADMIN_UID = 'aUH4VdmtHKZQbFqXJqCOcQRNVOG2';

  window.EcrioniXAsyncFifo = {
    ADMIN_UID: ADMIN_UID,
    hasAccess: function (user) {
      return !!(user && user.uid === ADMIN_UID);
    },
    bootLesson: function (slug) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          window.location.href = '/premium-course/';
          return;
        }
        document.getElementById('authLoading').style.display = 'none';
        if (!window.EcrioniXAsyncFifo.hasAccess(user)) {
          document.getElementById('noAccess').style.display = 'block';
          return;
        }
        document.getElementById('lessonContent').style.display = 'block';
        if (slug) {
          firebase.firestore().collection('users').doc(user.uid).set({
            completedLessons: { 'async-fifo': firebase.firestore.FieldValue.arrayUnion(slug) }
          }, { merge: true }).catch(function () { /* ignore */ });
        }
        if (typeof window.onAsyncFifoReady === 'function') window.onAsyncFifoReady();
      });
    },
    bootIndex: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          window.location.href = '/premium-course/';
          return;
        }
        document.getElementById('authLoading').style.display = 'none';
        if (!window.EcrioniXAsyncFifo.hasAccess(user)) {
          document.getElementById('noAccess').style.display = 'block';
          return;
        }
        document.getElementById('courseContent').style.display = 'block';
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
})();

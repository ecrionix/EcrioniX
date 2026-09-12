/* Signed-in admin only. Guests go to Premium login. Other members are bounced. */
(function () {
  'use strict';
  var ADMIN_UID = 'aUH4VdmtHKZQbFqXJqCOcQRNVOG2';

  function denyOtherMembers() {
    window.location.replace('/premium-course/?denied=async-fifo');
  }

  window.EcrioniXAsyncFifo = {
    ADMIN_UID: ADMIN_UID,
    hasAccess: function (user) {
      return !!(user && user.uid === ADMIN_UID);
    },
    bootLesson: function (slug) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          window.location.replace('/premium-course/');
          return;
        }
        if (!window.EcrioniXAsyncFifo.hasAccess(user)) {
          denyOtherMembers();
          return;
        }
        document.getElementById('authLoading').style.display = 'none';
        var lesson = document.getElementById('lessonContent');
        if (lesson) lesson.style.display = 'block';
        if (slug) {
          firebase.firestore().collection('users').doc(user.uid).set({
            completedLessons: { 'async-fifo': firebase.firestore.FieldValue.arrayUnion(slug) }
          }, { merge: true }).catch(function () {});
        }
        if (typeof window.onAsyncFifoReady === 'function') window.onAsyncFifoReady();
      });
    },
    bootIndex: function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          window.location.replace('/premium-course/');
          return;
        }
        if (!window.EcrioniXAsyncFifo.hasAccess(user)) {
          denyOtherMembers();
          return;
        }
        document.getElementById('authLoading').style.display = 'none';
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

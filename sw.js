// Необязательный файл: нужен, чтобы уведомления работали на Android и показывались «как у приложения».
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const chat = (e.notification.data || {}).chat || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { c.postMessage({ openChat: chat }); if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});

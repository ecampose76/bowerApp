// ============================================================
// NO-AUTH STUB — Bower is a portfolio piece with no real staff,
// so there's no login/register gate or Supabase backend here.
// This file exists only to satisfy the two hooks app.js expects
// from auth.js (getStoredAuth, clearAuth) so the engine boots
// straight to the home screen. Nothing else changes in app.js.
// ============================================================

function getStoredAuth() {
  return { name: "Guest" };
}

function clearAuth() {
  // no-op — nothing to clear, there's no session
}

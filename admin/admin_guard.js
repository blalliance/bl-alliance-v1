// admin_guard.js

function checkAdminAuth() {
    const token = sessionStorage.getItem('admin_auth');
    const authTime = sessionStorage.getItem('admin_auth_time');
    const now = Date.now();
    
    // 5 minutes = 300 000 ms
    const limit = 5 * 60 * 1000;

    // Si pas de token ou temps écoulé
    if (!token || !authTime || (now - authTime > limit)) {
        logoutAdmin();
    } else {
        // Rafraîchissement du temps à chaque vérification (activité)
        sessionStorage.setItem('admin_auth_time', Date.now());
    }
}

function logoutAdmin() {
    sessionStorage.clear();
    // Redirection vers la page de login admin
    window.location.href = 'bl-backoffice.html';
}

// Ne pas exécuter la vérification si on est déjà sur la page de login
if (!window.location.pathname.includes('bl-backoffice.html')) {
    checkAdminAuth();
    // Vérification automatique toutes les 30 secondes
    setInterval(checkAdminAuth, 30000);
}



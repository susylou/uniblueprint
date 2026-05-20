/**
 * Header widget — server script.
 * Loads the portal's main menu and the current user's initials.
 */
(function () {
    var portal = $sp.getPortalRecord();
    var menuId = portal.getValue('main_menu');
    if (menuId) {
        data.menu = $sp.getMenu(menuId);
    }

    var user = gs.getUser();
    var fn = (user ? user.getFirstName() : '') || '';
    var ln = (user ? user.getLastName() : '') || '';
    var initials = (fn.charAt(0) + ln.charAt(0)).toUpperCase();
    data.userInitials = initials || 'U';
})();

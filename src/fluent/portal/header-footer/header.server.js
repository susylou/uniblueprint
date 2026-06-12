/**
 * Header widget — server script.
 *
 * Renders the portal's main menu as the top nav. The SDK widget runtime
 * exposes no controller methods to the template, so the menu (each item's
 * href + active state) and the user's initials all land on `data`.
 *
 * IMPORTANT — use $sp.getMenuItems(menuSysId). It returns the menu items
 * with item.href ALREADY built for both link types (page-type resolves to
 * ?id=<sp_page url suffix>, url-type uses the raw url). The previous version
 * called $sp.getMenu(), which is NOT a real $sp API — so the menu never
 * populated and every tab dead-ended (you had to navigate by URL). Verified
 * against @servicenow/glide GlideSPScriptable.d.ts: getMenuItems / getMenuHREF
 * are the real methods; getMenu does not exist.
 */
(function () {
    var portal = $sp.getPortalRecord();
    var menuId = portal.getValue('main_menu');
    var currentPageId = $sp.getParameter('id') || portal.getDisplayValue('default_page') || '';

    data.menu = { items: [] };

    if (menuId) {
        var items = $sp.getMenuItems(menuId) || [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            // href is already correct from getMenuItems — just flag the active
            // tab so the header can highlight where the student is.
            item.isActive = (hrefPageId(item.href) === currentPageId);
            data.menu.items.push(item);
        }
    }

    var user = gs.getUser();
    var fn = (user ? user.getFirstName() : '') || '';
    var ln = (user ? user.getLastName() : '') || '';
    data.userInitials = ((fn.charAt(0) + ln.charAt(0)).toUpperCase()) || 'U';

    // Pull the ?id= page suffix out of a built href so we can match it
    // against the current page for active-state styling.
    function hrefPageId(href) {
        if (!href) return '';
        var m = ('' + href).match(/[?&]id=([^&]+)/);
        return m ? m[1] : '';
    }
})();

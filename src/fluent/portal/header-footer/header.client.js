function HeaderController($location) {
    var c = this;
    c.lang = 'en';

    c.setLang = function (lang) {
        c.lang = lang;
        // Persisting per-user lang preference is a future iteration.
        // For now, this just toggles the active visual state.
    };

    /**
     * Render the right href for a menu item. SP menu items can be:
     *   - type 'page' → ?id=<page_id>
     *   - type 'url'  → the url directly
     *   - otherwise   → '#' (placeholder)
     */
    c.itemHref = function (item) {
        if (!item) { return '#'; }
        if (item.type === 'url' && item.url) { return item.url; }
        if (item.type === 'page' && item.page) { return '?id=' + item.page; }
        return '#';
    };

    /**
     * Highlight the current page in nav.
     */
    c.isActive = function (item) {
        if (!item || item.type !== 'page') { return false; }
        var current = ($location.search() || {}).id || 'home';
        return current === item.page;
    };
}

api.controller = HeaderController;

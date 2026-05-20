/**
 * Hero widget — client controller.
 * Controller alias is 'c' per SDK convention. No $scope direct access.
 */
function HeroController($location) {
    var c = this;
    c.query = '';

    /**
     * Otto CTA — for now, navigate to the conversation page. The actual
     * Otto chat widget arrives in Phase 5 once AI Agent Studio is installed.
     */
    c.openOtto = function () {
        $location.search('id', 'conversation');
    };

    /**
     * Chip click pre-fills the search and submits.
     */
    c.useChip = function (text) {
        c.query = text;
        c.submitSearch();
    };

    /**
     * Enter key in the search input.
     */
    c.onSearchKey = function (evt) {
        if (evt && evt.which === 13) {
            c.submitSearch();
        }
    };

    /**
     * Search submission — for now route to /student?id=search&q=<query>.
     * Search page itself arrives in a later iteration.
     */
    c.submitSearch = function () {
        var q = (c.query || '').trim();
        if (!q) { return; }
        $location.search({ id: 'search', q: q });
    };
}

api.controller = HeroController;

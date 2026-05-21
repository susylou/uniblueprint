/**
 * Quick-actions widget — client controller.
 * Internal links update the portal route; external (tel:) hand off to the OS.
 */
function QuickActionsController($location, $window) {
    var c = this;

    c.go = function (card) {
        if (!card) { return; }
        if (card.external) {
            $window.location.href = card.href;
            return;
        }
        // Internal portal route — strip leading '?' and parse into search params.
        var raw = (card.href || '').replace(/^\?/, '');
        var params = {};
        raw.split('&').forEach(function (pair) {
            if (!pair) { return; }
            var bits = pair.split('=');
            params[decodeURIComponent(bits[0])] = decodeURIComponent(bits[1] || '');
        });
        $location.search(params);
    };
}

api.controller = QuickActionsController;

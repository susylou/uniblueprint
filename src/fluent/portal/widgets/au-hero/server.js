/**
 * Hero widget — server script.
 * Fetches the current user's first name for the persona-first greeting.
 * Falls back to a friendly default if the user is anonymous or unnamed.
 */
(function () {
    var user = gs.getUser();
    var firstName = user ? user.getFirstName() : '';

    if (!firstName) {
        firstName = 'there';
    }

    data.firstName = firstName;
})();

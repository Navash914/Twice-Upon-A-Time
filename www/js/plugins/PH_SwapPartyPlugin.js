/*:

    @plugindesc This plugin allows you to swap the leader of the party by pressing a key.
    @author PrimeHover
    @version 1.0

    ---------------------------------------------------------------------------------------
    This work is licensed under the Creative Commons Attribution 4.0 International License.
    To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
    ---------------------------------------------------------------------------------------

    @param swapKey
    @desc The keycode of the input key (Default: 76 [L])
    @default 76

 */

(function() {

    /* Getting parameters */
    var parameters = PluginManager.parameters('PH_SwapPartyPlugin');
    var swapKey = Number(parameters['swapKey']);

    /* Swap function */
    var swapFunc = function() {
        var i, temp;
        var actors = $gameParty._actors;

        if (actors.length > 1) {

            temp = actors[0];
            for (i = 0; i < actors.length; i++) {
                if ((i + 1) == actors.length) {
                    actors[i] = temp;
                } else {
                    actors[i] = actors[i + 1];
                }
            }

            //console.log(actors);

            /* Refreshing the screen */
            $gamePlayer.refresh();

        }
    };

    /* Adding the event listener */
    document.addEventListener("keydown", function(e) {
        e.preventDefault();
        if (e.keyCode == swapKey) {
            swapFunc();
        }
    })

})();
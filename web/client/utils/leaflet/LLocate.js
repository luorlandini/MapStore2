import L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import debounce from 'lodash/debounce';

L.Control.MSLocate = L.Control.Locate.extend({
    setMap: function(map) {
        this._map = map;
        this._layer = this.options.layer || new L.LayerGroup();
        this._layer.addTo(map);
        this._event = undefined;
        this._prevBounds = null;
        // extend the follow marker style and circle from the normal style
        let tmp = {};
        L.extend(tmp, this.options.markerStyle, this.options.followMarkerStyle);
        this.options.followMarkerStyle = tmp;
        tmp = {};
        L.extend(tmp, this.options.circleStyle, this.options.followCircleStyle);
        this.options.followCircleStyle = tmp;
        this._resetVariables();
        this._map.on('unload', this._unload, this);
    },
    setLocateOptions: function(options) {
        this.options.locateOptions = {...options};
    },
    onChangePosition: function(map) {
        console.log('onChangePosition');
        console.log(this.options.locateOptions);
        if (this.options.locateOptions.rateControl) {
            //this._deactivate();
            console.log('stopFollowing');
            console.log(map);
            let debounceFun = debounce(function() {
                //return map._activate();

                console.log('debounceFun');
            }, this.options.locateOptions.rateControl);
            debounceFun();
            console.log('start');
        }

    },
    _setClasses: function(state) {
        this._map.fire('locatestatus', {state: state});
        return state;
    },
    _updateContainerStyle: function() {
        if (this._isFollowing()) {
            this._setClasses('following');
        } else if (this._active) {
            this._setClasses('active');
        }
    },
    _cleanClasses: function() {
        return null;
    },
    setStrings: function(newStrings) {
        this.options.strings = { ...this.options.strings, ...newStrings };
    }
});

export default L.Control.MSLocate;

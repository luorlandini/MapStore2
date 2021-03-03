
/*
 * Copyright 2021, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getResolutionsForScales, DEFAULT_SCREEN_DPI} from '../../../utils/MapUtils';

const withScalesDenominators = (Component) => {

    return (props) => {
        const projection = props?.map?.projection || 'EPSG:3857';
        // if null the getResolutionsForScales will use DEFAULT_SCREEN_DPI automatically
        const dpi = props?.map?.mapOptions?.view?.DPI || null;
        const scales = props?.map?.mapOptions?.view?.scales;
        const resolutions = (scales) ? (getResolutionsForScales(scales, projection, dpi)) : null;
        const mapProps = (resolutions) ? {
            ...props,
            map: {
                ...props.map,
                mapOptions: {
                    ...props.mapOptions,
                    view: {
                        ...props.mapOptions.view,
                        resolutions: resolutions
                    }
                }
            }
        } : props;

        return <Component {...mapProps} />;
    };
};

withScalesDenominators.propTypes = {
    Component: PropTypes.element
};
export default withScalesDenominators;
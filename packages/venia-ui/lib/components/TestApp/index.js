import React from 'react';
import { Page, MapTo, withModel } from '@adobe/aem-react-editable-components';
import Text, { TextEditConfig } from '../TextAEM';
import { Carousel, CarouselEditConfig } from '../Carousel';

const AppPage = props => {
    return <Page {...props} />;
};

export default withModel(AppPage, { injectPropsOnInit: true });

MapTo('wknd-spa-react/components/page')(AppPage);
MapTo('wknd-spa-react/components/text')(Text, TextEditConfig);
MapTo('wknd-spa-react/components/commerce/carousel')(
    Carousel,
    CarouselEditConfig
);

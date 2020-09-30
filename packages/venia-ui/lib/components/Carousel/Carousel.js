import React from 'react';
import { MapTo } from '@adobe/aem-react-editable-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './mockData';
import classes from './Carousel.css';

const productsQuery = gql`
    query getProducts($skus: [String]!) {
        products(filter: { sku: { in: $skus } }) {
            items {
                sku
                name
                thumbnail {
                    url
                }
                price_range {
                    minimum_price {
                        final_price {
                            currency
                            value
                        }
                    }
                }
            }
        }
    }
`;

export const CarouselEditConfig = {
    emptyLabel: 'Product Carousel',
    isEmpty: props => {
        console.log(`Do we have props? `, props);
        return !props || !props.sku || props.sku.length < 1;
    }
};

const Carousel = props => {
    console.log(`Retrieve data for these skus ${props.sku}`);
    const { cqPath } = props;
    const { data, loading, error } = useQuery(productsQuery, {
        variables: { skus: props.sku }
    });
    console.log(`Still loading?  ${loading}`);

    if (error) {
        return <div>Error retrieving data</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const carouselItem = item => (
        <div className={classes.carousel_item} key={item.sku}>
            <img
                src={item.thumbnail.url}
                alt={item.name}
                className={classes.image}
            />
            <h2>{item.name}</h2>
        </div>
    );

    return (
        <div
            id={cqPath.substr(cqPath.lastIndexOf('/') + 1)}
            className={classes.carousel_root}
        >
            {data.products.items.map(item => carouselItem(item))}
        </div>
    );
};

export default MapTo('wknd-spa-react/components/commerce/carousel')(
    Carousel,
    CarouselEditConfig
);

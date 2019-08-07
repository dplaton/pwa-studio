import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

import { HeadProvider, Title, Link, Meta, Style } from '../';

afterEach(cleanup);

test('snapshot testing HeadProvider', () => {
    const root = TestRenderer.create(<HeadProvider />);

    expect(root.toJSON()).toMatchSnapshot();
});

test('HeadProvider should delete all title tags if any', () => {
    document.head.appendChild(document.createElement('title'));

    expect(document.getElementsByTagName('title').length).toBe(1);

    render(<HeadProvider />);

    expect(document.getElementsByTagName('title').length).toBe(0);
});

test('HeadProvider should render title if provided', () => {
    const newTitle = 'New Title';
    render(
        <HeadProvider>
            <Title>{newTitle}</Title>
        </HeadProvider>
    );

    expect(document.getElementsByTagName('title').length).toBe(1);
    expect(document.title).toBe(newTitle);
});

test('HeadProvider should replace all previous title tags with the latest tag', () => {
    const oldTitle = 'Old Title';
    const newTitle = 'New Title';
    render(
        <HeadProvider>
            <Title>{oldTitle}</Title>
            <Title>{newTitle}</Title>
        </HeadProvider>
    );

    expect(document.getElementsByTagName('title').length).toBe(1);
    expect(document.title).toBe(newTitle);
});

test('HeadProvider should be able to render single or multiple meta tags', () => {
    expect(document.getElementsByTagName('meta').length).toBe(0);

    render(
        <HeadProvider>
            <Meta name="title" content="Sample Title" />
            <Meta name="description" content="Sample Description" />
            <Meta name="keywords" content="Sample Keywords" />
        </HeadProvider>
    );

    expect(document.getElementsByTagName('meta').length).toBe(3);
});

test('HeadProvider should be able to render single or multiple link tags', () => {
    expect(document.getElementsByTagName('link').length).toBe(0);

    render(
        <HeadProvider>
            <Link rel="manifest" href="/manifest.json" />
            <Link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/icons/apple-touch-icon.png"
            />
            <Link rel="stylesheet" href="styles.css" />
        </HeadProvider>
    );

    expect(document.getElementsByTagName('link').length).toBe(3);
});

test('HeadProvider should be able to render single or multiple style tags', () => {
    expect(document.getElementsByTagName('style').length).toBe(0);

    render(
        <HeadProvider>
            <Style type="text/css">
                {`.icon {
                    align-items: center;
                    display: inline-flex;
                    justify-content: center;
                }`}
            </Style>
        </HeadProvider>
    );

    expect(document.getElementsByTagName('style').length).toBe(1);
});

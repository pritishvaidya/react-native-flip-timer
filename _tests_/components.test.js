/* eslint-disable react/forbid-foreign-prop-types */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { FlipNumber, FormatNumbers } from '../src';

jest.useFakeTimers();

describe('Testing Components', () => {
  describe('FormatNumbers Component details', () => {
    const componentTestRenderer = TestRenderer.create(<FormatNumbers
      time={1000}
    />);
    const wrapper = componentTestRenderer.toJSON();

    it('should render the component correctly', () => {
      expect(componentTestRenderer).toMatchSnapshot();
    });

    it('should contain a view ', () => {
      expect(wrapper.type).toBe('View');
    });

    it('should contain a nested elements ', () => {
      expect(wrapper.children[0].type).toBe('View');
    });
  });

  describe('FlipNumbers Component details', () => {
    const componentTestRenderer = TestRenderer.create(<FlipNumber
      number="1000"
      unit="seconds"
    />);
    const wrapper = componentTestRenderer.toJSON();

    it('should render the component correctly', () => {
      expect(componentTestRenderer).toMatchSnapshot();
    });

    it('should contain a view ', () => {
      expect(wrapper.type).toBe('View');
    });

    it('should contain a nested elements ', () => {
      expect(wrapper.children[0].type).toBe('View');
    });
  });
});

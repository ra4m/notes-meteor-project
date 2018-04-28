import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    it('should render title and timestamp', function() {
      const title = 'My title here';
      const updatedAt = 1524926807228;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('4/28/18');
    });

    it('should render default title if title not set', function() {
      const updatedAt = 1524926807228;
      const wrapper = mount(<NoteListItem note={{ updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe('Undefined title');
      expect(wrapper.find('p').text()).toBe('4/28/18');
    });
  });
}

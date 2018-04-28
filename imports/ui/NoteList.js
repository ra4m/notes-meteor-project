import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';
import { Session } from 'meteor/session';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = props => {
  return (
    <div>
      <NoteListHeader />
      NoteList {props.notes.length}
      {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
      {props.notes.map(note => {
        return <NoteListItem key={note._id} note={note} />;
      })}
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find()
      .fetch()
      .map(note => {
        return {
          ...note,
          selected: selectedNoteId === note._id
        };
      })
  };
}, NoteList);

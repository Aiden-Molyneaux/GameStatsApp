import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { GamerTag, PartialGamerTag } from '../../backend/models/gamerTagModel';

export interface GamerTagListItem extends GamerTag {
    mode: string; // maybe
}

export interface PartialGamerTagListItem extends PartialGamerTag {
    // mode: string; // maybe
}

export interface GamerTagList {
    gamerTags: GamerTagListItem[]
}

const initialGamerTagState: GamerTagList = {
  gamerTags: []
};

export const gamerTagListSlice = createSlice({
  name: 'gamerTagData',
  initialState: initialGamerTagState,
  reducers: {
    fetchGamerTagsSuccess: (state, action: PayloadAction<{ gamerTags: GamerTag[] }>) => {
      const newGamerTags = action.payload.gamerTags;
        
      console.log(newGamerTags);

      state.gamerTags = newGamerTags;
    },

    addGamerTagAction: (state, action: PayloadAction<{ gamerTag: GamerTag }>) => {
      console.log(action.payload.gamerTag);
      state.gamerTags.push(action.payload.gamerTag);
    },

    updateGamerTagAction: (state, action: PayloadAction<{ gamerTag: GamerTagListItem}>) => {
      const { gamerTag } = action.payload;
      state.gamerTags = state.gamerTags.map(obj => obj.id === gamerTag.id ? gamerTag : obj);
    },

    deleteGamerTagAction: (state, action: PayloadAction<{ deletedGamerTagId: number }>) => {
      state.gamerTags = state.gamerTags.filter(item => item.id !== action.payload.deletedGamerTagId);
    },

    reset: (state) => {
      state.gamerTags = initialGamerTagState.gamerTags;
    }
  }
});

export const { 
  fetchGamerTagsSuccess, 
  addGamerTagAction, 
  updateGamerTagAction, 
  deleteGamerTagAction,
  reset 
} = gamerTagListSlice.actions;

export default gamerTagListSlice.reducer;
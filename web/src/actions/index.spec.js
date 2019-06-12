import * as actions from './index';

describe('actions', () => {
    it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
        expect(actions.setVisibilityFilter('active')).toEqual({
            type: 'SET_VISIBILITY_FILTER',
            filter: 'active'
        })
    });
});

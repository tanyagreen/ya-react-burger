import { userInitialState, userSlice, userLogin, userRegister, userPatch, getUserFromAPI, userLogout } from './user';

const mockedUser = [
    {
        emai: 'user@email',
        name: 'user',
    },
];

describe('user', () => {
    it('should return the user initialstate', () => {
        expect(userSlice.reducer(undefined, {})).toEqual(userInitialState);
    });
    it('should handle setUser action', () => {
        expect(userSlice.reducer(userInitialState, userSlice.actions.setUser(mockedUser))).toEqual({
            ...userInitialState,
            user: mockedUser,
        });
    });
    it('should handle setAuthChecked action', () => {
        expect(userSlice.reducer(userInitialState, userSlice.actions.setAuthChecked(true))).toEqual({
            ...userInitialState,
            isAuthChecked: true,
        });
    });
    it('should handle user cleanError action', () => {
        expect(userSlice.reducer(userInitialState, userSlice.actions.cleanError())).toEqual({
            ...userInitialState,
            error: null,
        });
    });
});

describe('user userRegister', () => {
    it('should handle userRegister pending action', () => {
        expect(userSlice.reducer(userInitialState, userRegister.pending)).toEqual({
            ...userInitialState,
            loading: true,
        });
    });

    it('should handle userRegister fulfilled action', () => {
        expect(userSlice.reducer(userInitialState, userRegister.fulfilled(mockedUser))).toEqual({
            ...userInitialState,
            user: mockedUser,
            isAuthChecked: true,
        });
    });

    it('should handle userRegister rejected action', () => {
        expect(userSlice.reducer(userInitialState, userRegister.rejected('Error'))).toEqual({
            ...userInitialState,
            error: 'Error',
        });
    });
});

describe('user userLogin', () => {
    it('should handle userLogin pending action', () => {
        expect(userSlice.reducer(userInitialState, userLogin.pending)).toEqual({
            ...userInitialState,
            loading: true,
        });
    });

    it('should handle userLogin fulfilled action', () => {
        expect(userSlice.reducer(userInitialState, userLogin.fulfilled(mockedUser))).toEqual({
            ...userInitialState,
            user: mockedUser,
            isAuthChecked: true,
        });
    });

    it('should handle userLogin rejected action', () => {
        expect(userSlice.reducer(userInitialState, userLogin.rejected('Error'))).toEqual({
            ...userInitialState,
            error: 'Error',
        });
    });
});

describe('user userPatch', () => {
    it('should handle userPatch pending action', () => {
        expect(userSlice.reducer(userInitialState, userPatch.pending)).toEqual({
            ...userInitialState,
            loading: true,
        });
    });

    it('should handle userPatch fulfilled action', () => {
        expect(userSlice.reducer(userInitialState, userPatch.fulfilled(mockedUser))).toEqual({
            ...userInitialState,
            user: mockedUser,
        });
    });

    it('should handle userPatch rejected action', () => {
        expect(userSlice.reducer(userInitialState, userPatch.rejected('Error'))).toEqual({
            ...userInitialState,
            error: 'Error',
        });
    });
});

describe('user getUserFromAPI', () => {
    it('should handle getUserFromAPI pending action', () => {
        expect(userSlice.reducer(userInitialState, getUserFromAPI.pending)).toEqual({
            ...userInitialState,
            loading: true,
        });
    });

    it('should handle getUserFromAPI fulfilled action', () => {
        expect(userSlice.reducer(userInitialState, getUserFromAPI.fulfilled(mockedUser))).toEqual({
            ...userInitialState,
            user: mockedUser,
        });
    });

    it('should handle getUserFromAPI rejected action', () => {
        expect(userSlice.reducer(userInitialState, getUserFromAPI.rejected('Error'))).toEqual({
            ...userInitialState,
            error: 'Error',
        });
    });
});

describe('user userLogout', () => {
    it('should handle userLogout  pending action', () => {
        expect(userSlice.reducer(userInitialState, userLogout.pending)).toEqual({
            ...userInitialState,
            loading: true,
        });
    });

    it('should handle userLogout fulfilled action', () => {
        expect(userSlice.reducer(userInitialState, userLogout.fulfilled(mockedUser))).toEqual(userInitialState);
    });

    it('should handle userLogout rejected action', () => {
        expect(userSlice.reducer(userInitialState, userLogout.rejected('Error'))).toEqual({
            ...userInitialState,
            error: 'Error',
        });
    });
});

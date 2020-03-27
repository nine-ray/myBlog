import {routerRedux} from 'dva/router';

export default {
    namespace: 'common',

    state: {
        deskHeight:376,
        deskDivWidth:1440,
        collectList:[]
    },

    effects: {
        * deskChange({payload}, {call, put}) {
            const {deskHeight,deskDivWidth} = payload;
            console.log("deskChange",payload);
            yield put({
                type: "changeStatus",
                payload: {
                    deskHeight,
                    deskDivWidth
                }
            });
        },
        * collectListChange({payload}, {call, put}) {
            const {collectList} = payload;
            yield put({
                type: "changeStatus",
                payload: {
                    collectList
                }
            });
        },
    },

    reducers: {
        changeStatus(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        },
    },
};

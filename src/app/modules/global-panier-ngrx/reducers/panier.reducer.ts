import { IBaseAction } from '../../shared/actions/base.action.i';
import { IPanierState } from '../states/panier.state.i';
import { IPanierAction } from '../actions/panier.action';

export const initialState: IPanierState = {
    panierContent: [],
    panierContentCount: 0,
    panierAmount: 0,
    successFullyAddArticle: false,
    successFullyRemoveArticle: false,
    errorAddArticle: false,
    errorRemoveArticle: false
};

export function PanierReducer(state: IPanierState = initialState, action: IBaseAction<IPanierAction>): IPanierState {
    switch (action.type) {
        case 'ADD_ARTICLE':
        return {
            ...state,
            panierContent: [...state.panierContent, action.payload.article],
            panierAmount: Number(state.panierAmount) + Number(action.payload.article.price),
            panierContentCount: state.panierContentCount + 1,
            successFullyAddArticle: true
        };

        case 'APPLY_COMMERCIAL_OFFER':
        return {
            ...state,
            panierAmount: Number(state.panierAmount) - Number(action.payload.commercialOffer)
        };

        case 'REMOVE_ARTICLE':
        return {
            ...state,
            panierContentCount: state.panierContentCount - 1,
            panierAmount:  state.panierAmount - state.panierContent[action.payload.removeIndex].price,
            panierContent: state.panierContent.slice(action.payload.removeIndex),
            successFullyRemoveArticle: true
        };
        case 'FAILED_ADD_ARTICLE':
        return {
            ...state,
            errorAddArticle: true
        };

        case 'INIT_ACTION_STATE':
        return {
            ...state,
            successFullyAddArticle: false,
            errorAddArticle: false,
            successFullyRemoveArticle: false,
            errorRemoveArticle: false
        };
        default:
        return state;
    }
}

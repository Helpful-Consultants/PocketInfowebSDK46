import Types from '../constants/Types';

export const getDealerCampaignsStart = () => ({
  type: Types.GET_DEALER_CAMPAIGNS_START,
});

export const getDealerCampaignsRequest = ({ dealerId, intId }) => ({
  type: Types.GET_DEALER_CAMPAIGNS_REQUEST,
  payload: {
    dealerId,
    intId,
  },
});

export const getDealerCampaignsSuccess = ({ statusCode, items }) => ({
  type: Types.GET_DEALER_CAMPAIGNS_SUCCESS,
  statusCode,
  payload: {
    items,
    statusCode,
  },
});

export const emptyDealerCampaignsRequest = () => ({
  type: Types.EMPTY_DEALER_CAMPAIGNS_REQUEST,
});

export const dealerCampaignsError = ({ error, statusCode, dataErrorUrl }) => ({
  type: Types.DEALER_CAMPAIGNS_ERROR,
  payload: {
    error,
    statusCode,
    dataErrorUrl,
  },
});

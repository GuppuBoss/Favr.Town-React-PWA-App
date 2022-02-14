/* eslint-disable react/jsx-sort-props */
/* eslint-disable react-perf/jsx-no-jsx-as-prop */
/* eslint-disable react-perf/jsx-no-new-array-as-prop */
// import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import ROUTES, { ROUTE_ACCESS } from '../constants/routes';
import { getAuthenticatedUser } from '../redux/selectors/accountSelector';
import getUserGroup from '../utils/authUtil';
import Account from '../views/account/Index';
import AcknowledgementsPage from '../views/acknowledgements/AcknowledgementsPage';
import Actions from '../views/action/Actions';
import ConfirmPage from '../views/confirm/ConfirmPage';
import ConversationDetail from '../views/conversation/detail/ConversationDetail';
import Conversations from '../views/conversation/list/Conversations';
import CouponBook from '../views/coupon/list/Coupons';
import EmailPage from '../views/email/EmailPage';
import Merchant from '../views/home/merchant/Merchant';
import Patron from '../views/home/patron/Patron';
import LocationDetail from '../views/location/detail/LocationDetail';
import Locations from '../views/location/list/Locations';
import MerchantDetails from '../views/merchant/details/MerchantDetails';
import Merchants from '../views/merchant/list/MerchantList';
import NewsDetail from '../views/news/detail/NewsDetail';
import News from '../views/news/list/News';
import NotFound from '../views/notFound/index';
import PasswordPage from '../views/password/PasswordPage';
import PatronDetail from '../views/patron/detail/PatronDetail';
import Patrons from '../views/patron/list/Patrons';
import PrivacyPage from '../views/privacy/PrivacyPage';
import Profile from '../views/profile/Index';
import Program from '../views/program/Program';
import Qr from '../views/qr/Qr';
import RewardDetail from '../views/reward/detail/RewardDetail';
import Rewards from '../views/reward/list/Rewards';
import Rules from '../views/rules/Rules';
import Search from '../views/search/Search';
import SignInPage from '../views/signIn/SignInPage';
import Statistics from '../views/statistics/Statistics';
import SuggestionDetail from '../views/suggestion/detail/SuggestionDetail';
import Suggestions from '../views/suggestion/list/Suggestions';
import SurveyDetail from '../views/survey/detail/SurveyDetail';
import Surveys from '../views/survey/list/Surveys';
import TermsPage from '../views/terms/TermsPage';

const TotalRoutes = () => {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const userGroup = getUserGroup(authenticatedUser);

  return (
    <Routes>
      <Route end path={ROUTES.TERMS} element={<TermsPage />} />
      <Route
        end
        path={ROUTES.ACKNOWLEDGEMENTS}
        element={<AcknowledgementsPage />}
      />
      <Route end path={ROUTES.PRIVACY} element={<PrivacyPage />} />
      <Route end path={ROUTES.CONFIRM} element={<ConfirmPage />} />
      <Route end path={ROUTES.PASSWORD} element={<PasswordPage />} />
      <Route end path={ROUTES.EMAIL} element={<EmailPage />} />,
      <Route
        end
        path={ROUTES.ACCOUNT}
        element={
          ROUTE_ACCESS.ACCOUNT.includes(userGroup) ? (
            <Account />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.PATRON}
        element={
          ROUTE_ACCESS.PATRON.includes(userGroup) ? (
            <Patron />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.MERCHANT}
        element={
          ROUTE_ACCESS.MERCHANT.includes(userGroup) ? (
            <Merchant />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.PROFILE}
        element={
          ROUTE_ACCESS.PROFILE.includes(userGroup) ? (
            <Profile />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.SEARCH}
        element={
          ROUTE_ACCESS.SEARCH.includes(userGroup) ? (
            <Search />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.MERCHANTS}
        element={
          ROUTE_ACCESS.MERCHANTS.includes(userGroup) ? (
            <Merchants />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.MERCHANT_DETAILS}
        element={
          ROUTE_ACCESS.MERCHANT_DETAILS.includes(userGroup) ? (
            <MerchantDetails />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.COUPON_BOOK}
        element={
          ROUTE_ACCESS.COUPON_BOOK.includes(userGroup) ? (
            <CouponBook />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.PROGRAM}
        element={
          ROUTE_ACCESS.PROGRAM.includes(userGroup) ? (
            <Program />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.ACTIONS}
        element={
          ROUTE_ACCESS.ACTIONS.includes(userGroup) ? (
            <Actions />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.CONVERSATIONS}
        element={
          ROUTE_ACCESS.CONVERSATIONS.includes(userGroup) ? (
            <Conversations />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.CONVERSATION_DETAIL}
        element={
          ROUTE_ACCESS.CONVERSATION_DETAIL.includes(userGroup) ? (
            <ConversationDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.PATRON_INFO}
        element={
          ROUTE_ACCESS.PATRON_INFO.includes(userGroup) ? (
            <PatronDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.PATRONS}
        element={
          ROUTE_ACCESS.PATRONS.includes(userGroup) ? (
            <Patrons />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.QR}
        element={
          ROUTE_ACCESS.QR.includes(userGroup) ? (
            <Qr />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.REWARDS}
        element={
          ROUTE_ACCESS.REWARDS.includes(userGroup) ? (
            <Rewards />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.REWARD_DETAIL}
        element={
          ROUTE_ACCESS.REWARD_DETAIL.includes(userGroup) ? (
            <RewardDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.LOCATIONS}
        element={
          ROUTE_ACCESS.LOCATIONS.includes(userGroup) ? (
            <Locations />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.LOCATION_DETAIL}
        element={
          ROUTE_ACCESS.LOCATION_DETAIL.includes(userGroup) ? (
            <LocationDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.NEWS}
        element={
          ROUTE_ACCESS.NEWS.includes(userGroup) ? (
            <News />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.NEWS_DETAILS}
        element={
          ROUTE_ACCESS.NEWS_DETAILS.includes(userGroup) ? (
            <NewsDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.RULES}
        element={
          ROUTE_ACCESS.RULES.includes(userGroup) ? (
            <Rules />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.STATISTICS}
        element={
          ROUTE_ACCESS.STATISTICS.includes(userGroup) ? (
            <Statistics />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.SUGGESTIONS}
        element={
          ROUTE_ACCESS.SUGGESTIONS.includes(userGroup) ? (
            <Suggestions />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.SUGGESTION_DETAIL}
        element={
          ROUTE_ACCESS.SUGGESTION_DETAIL.includes(userGroup) ? (
            <SuggestionDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.SURVEYS}
        element={
          ROUTE_ACCESS.SURVEYS.includes(userGroup) ? (
            <Surveys />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        end
        path={ROUTES.SURVEY_DETAIL}
        element={
          ROUTE_ACCESS.SURVEY_DETAIL.includes(userGroup) ? (
            <SurveyDetail />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route
        path={ROUTES.NOT_FOUND}
        element={
          ROUTE_ACCESS.NOT_FOUND.includes(userGroup) ? (
            <NotFound />
          ) : (
            <Navigate to={ROUTES.HOME} />
          )
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      <Route element={<SignInPage />} path="/" />
    </Routes>
  );
};

export default TotalRoutes;

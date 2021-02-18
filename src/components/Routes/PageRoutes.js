import Overview from '../Layouts/DashOverview/Overview';
import Cases from '../Layouts/ReportedCases/Cases';
import CaseDetails from '../Layouts/ReportedCases/CaseDetails';
import LandingPage from '../Layouts/LandingPage/LandingPage';
import SignIn from '../Layouts/LandingPage/Signin';
import SignUp from '../Layouts/LandingPage/SignUp';
import Sidebar from './SideBar/Sidebar';
import ForgotPassword from '../Layouts/LandingPage/ForgotPassword';

export default [
	{
		path: '/',
		component: LandingPage,
		exact: true
	},
	{
		path: '/sidebar',
		component: Sidebar,
		exact: false
	},
	{
		path: '/signin',
		component: SignIn,
		exact: true
	},
	,
	{
		path: '/reset-password',
		component: ForgotPassword,
		exact: true
	},
	{
		path: '/signup',
		component: SignUp,
		exact: true
	},
	{
		path: '/overview',
		component: Overview,
		exact: true
	},
	{
		path: '/overview/cases',
		component: Cases,
		exact: false
	},
	{
		path: '/case-details',
		component: CaseDetails,
		exact: false
	}
];
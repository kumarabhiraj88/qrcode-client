import { Dashboard, People, CropFree } from '@material-ui/icons';

export const sideNav = [
	{ icon: <Dashboard className="sidenavIcon" />, routeLabel: "Dashboard", link:"/admin/dashboard" },
	{ icon: <People className="sidenavIcon" />, routeLabel: "Users", link:"/admin/users" },
	{ icon: <CropFree className="sidenavIcon" />, routeLabel: "QRCode", link:"/admin/qrcode" },
	{ icon: <CropFree className="sidenavIcon" />, routeLabel: "QRCode Arabic", link:"/admin/qrcode-arabic" },
]
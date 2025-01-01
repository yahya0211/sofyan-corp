import { Navigate, RouteObject } from "react-router-dom";
import MemberIndex from "../pages";
import CreateMember from "../pages/CreateMember";
import DetailMember from "../pages/DetailMember";
import EditMember from "../pages/EditMember";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/anggota"} replace />,
  },
  {
    path: "/anggota",
    element: <MemberIndex />,
  },
  {
    path: "/anggota/create",
    element: <CreateMember />,
  },
  {
    path: "/anggota/:id",
    element: <DetailMember />,
  },
  {
    path: "/anggota/:id/edit",
    element: <EditMember />,
  },
];

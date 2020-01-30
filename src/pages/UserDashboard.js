import React from 'react'
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import DashboardNav from '../components/DashboardNav';
import UserDashboardContent from '../components/UserDashboardContent';

function UserDashboard() {

   return (
      <>
         <Layout>
            <DashboardNav />
            <UserDashboardContent />
         </Layout>
      </>
   )
}

export default UserDashboard
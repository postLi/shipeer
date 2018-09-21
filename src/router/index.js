import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main/main.vue'
import Login from '@/pages/login/index.vue'
import Register from '@/pages/register/index.vue'
import PayFor from '@/pages/orderRouter/payFoy.vue'
import InSingle from '@/pages/orderRouter/inSingle.vue'
import AlOrder from '@/pages/orderRouter/alOrder.vue'
import GetPickUp from '@/pages/orderRouter/getPickUp.vue'
import Order from '@/pages/order/order.vue'
import MyDriver from '@/pages/myDriver/index.vue'
import ManageCenter from '@/pages/manageCenter/index.vue'
import ManageAllRecod from '@/pages/manageCenter/allRecod.vue'
import ManageCoupon from '@/pages/manageCenter/coupon.vue'
import ManageCouponList from '@/pages/manageCenter/couponList.vue'
import ManageToPayCoupon from '@/pages/manageCenter/toPayCoupon.vue'
import OrderManage from '@/pages/orderManage/index.vue'
import AlcencelOrder from '@/pages/orderManage/alcencel.vue'
import AllOrderOrder from '@/pages/orderManage/allOrder.vue'
import AlreadyOrder from '@/pages/orderManage/already.vue'
import ServerOrder from '@/pages/orderManage/server.vue'

import AddressManage from '@/pages/addressManage/addressManage.vue'
import RouteManage from '@/pages/routeManage/routeManage.vue'
Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/order',
          name: 'Order',
          component: Order,
        },
        {
          path: '/myDriver',
          name: 'MyDriver',
          component: MyDriver,
        },
        {
          path: '/orderManage',
          name: 'OrderManage',
          component: OrderManage,
          children: [
            {
              path: '/OrderManage/allOrder',
              name: 'AllOrderOrder',
              component: AllOrderOrder,
            },
            {
              path: '/OrderManage/alcencel',
              name: 'AlcencelOrder',
              component: AlcencelOrder,
            },

            {
              path: '/OrderManage/already',
              name: 'AlreadyOrder',
              component: AlreadyOrder,
            },
            {
              path: '/OrderManage/server',
              name: 'ServerOrder',
              component: ServerOrder,
            },

          ],
        },
        {
          path: '/orderRouter/payFoy', component: PayFor,name:'PayFor'
        },
        {
          path: '/orderRouter/inSingle', component: InSingle,name:'InSingle'
        },
        {
          path: '/orderRouter/alOrder', component: AlOrder,name:'AlOrder'
        },{
          path: '/orderRouter/getPickUp', component: GetPickUp,name:'GetPickUp'
        },
        {
          path: '/allRecod',
          name: 'ManageAllRecod',
          component: ManageAllRecod,
        }, {
          path: '/coupon',
          name: 'ManageCoupon',
          component: ManageCoupon,
        },
        {
          path: '/couponList',
          name: 'ManageCouponList',
          component: ManageCouponList,
        }, {
          path: '/toPayCoupon',
          name: 'ManageToPayCoupon',
          component: ManageToPayCoupon,
        },
        {
          path: '/manageCenter',
          name: 'ManageCenter',
          component: ManageCenter,
        },
        {
          path: '/addressManage',
          name: 'AddressManage',
          component: AddressManage,
        },
        {
          path: '/routeManage',
          name: 'RouteManage',
          component: RouteManage,
        },

      ]
    },
    {
      path: '/', component: Login,name:'Login'
    },
    {
      path: '/register', component: Register,name:'Register'
    },
    {
      path: '/order1',
      name: 'Order1',
      component: Order,
    },
  ]
})

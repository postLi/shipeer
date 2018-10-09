import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('@/pages/main/main.vue');
const Login = () => import('@/pages/login/index.vue');
const Register = () => import('@/pages/register/register.vue');
const PayFor = () => import('@/pages/orderRouter/payFoy.vue');
const EvaluateDriver = () => import('@/pages/orderRouter/evaluateDriver.vue');
const UnloadOrder = () => import('@/pages/orderRouter/unloadOrder.vue');
const InSingle = () => import('@/pages/orderRouter/inSingle.vue');
const AlOrder = () => import('@/pages/orderRouter/alOrder.vue');
const GetPickUp = () => import('@/pages/orderRouter/getPickUp.vue');
const GetPickUp2 = () => import('@/pages/orderRouter/getPickUp2.vue');
const Order = () => import('@/pages/order/order.vue');
const ShowMapNext = () => import('@/pages/order/showMapNext.vue');
const MyDriver = () => import('@/pages/myDriver/index.vue');
const ManageCenter = () => import('@/pages/manageCenter/index.vue');
const ManageAllRecod = () => import('@/pages/manageCenter/allRecod.vue');
const ManageCoupon = () => import('@/pages/manageCenter/coupon.vue');
const ManageCouponList = () => import('@/pages/manageCenter/couponList.vue');
const ManageToPayCoupon = () => import('@/pages/manageCenter/toPayCoupon.vue');
const OrderManage = () => import('@/pages/orderManage/index.vue');
const AlcencelOrder = () => import('@/pages/orderManage/alcencel.vue');
const AllOrderOrder = () => import('@/pages/orderManage/allOrder.vue');
const AlreadyOrder = () => import('@/pages/orderManage/already.vue');
const ServerOrder = () => import('@/pages/orderManage/server.vue');
const ChargeStandard = () => import('@/pages/chargeStandard/chargeStandard.vue');
const AddressManage = () => import('@/pages/addressManage/addressManage.vue');
const RouteManage = () => import('@/pages/routeManage/routeManage.vue');
const PassWordEdit = () => import('@/pages/passWordEdit/passWordEdit.vue');
const OrderMonitor = () => import('@/pages/orderMonitor/orderMonitor.vue');
const Track = () => import('@/pages/orderMonitor/track.vue');

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/orderMonitor',
          name: 'orderMonitor',
          component: OrderMonitor,
        },
        {
          path: '/track',
          name: 'track',
          component: Track,
        },
        {
          path: '/order',
          name: 'Order',
          component: Order,
        },
        {
          path: '/order/showMapNext',
          name: 'ShowMapNext',
          component: ShowMapNext,
        },
        {
          path: '/chargeStandard',
          name: 'ChargeStandard',
          component: ChargeStandard,
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
          path: '/orderRouter/unloadOrder', component: UnloadOrder, name: 'UnloadOrder'
        },
        {
          path: '/orderRouter/evaluateDriver', component: EvaluateDriver, name: 'EvaluateDriver'
        },
        {
          path: '/orderRouter/payFoy', component: PayFor, name: 'PayFor'
        },
        {
          path: '/orderRouter/inSingle', component: InSingle, name: 'InSingle'
        },
        {
          path: '/orderRouter/alOrder', component: AlOrder, name: 'AlOrder'
        },
        {
          path: '/orderRouter/getPickUp', component: GetPickUp, name: 'GetPickUp'
        },
        {
          path: '/orderRouter/getPickUp2', component: GetPickUp2, name: 'GetPickUp2'
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
      path: '/', component: Login, name: 'Login'
    },
    {
      path: '/register', component: Register, name: 'Register'
    },
    {
      path: '/passWordEdit', component: PassWordEdit, name: 'PassWordEdit'
    },
    {
      path: '/order1',
      name: 'Order1',
      component: Order,
    },
    {
      path: '/orderMonitor2',
      name: 'orderMonitor2',
      component: OrderMonitor,
    }
  ]
})

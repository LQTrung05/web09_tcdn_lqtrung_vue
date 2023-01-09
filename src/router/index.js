import { createRouter, createWebHistory } from 'vue-router'
import ProcessPage from '../views/process/ProcessPage'
import EmployeePage from '../views/employee/EmployeePage'
import ProviderPage from '../views/provider/ProviderPage'
import PaymentPage from '../views/payment/PaymentPage'
import LayoutProcess from '../views/process/LayoutProcess'
const routes = [
  {
    path: '/',
    name: "processPage",
    component: ProcessPage,
    children: [
      {
        path: '/payment',
        name: "payment",
        components: {
          menu: PaymentPage,
        },
      },
      {
        path: '',
        name: "home",
        components: {
          menu: LayoutProcess,
        },
      },
    ]

  },
  {
    path: '/employee',
    name: "employeePage",
    component: EmployeePage
  },
  {
    path: '/provider',
    name: "providerPage",
    component: ProviderPage
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router     
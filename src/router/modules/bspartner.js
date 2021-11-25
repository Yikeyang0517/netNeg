/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const BPRouter = {
  path: '/bpmanagement',
  component: Layout,
  redirect: '/bpmanagement/bplist',
  name: 'Table',
  meta: {
    title: '客户库',
    icon: 'table'
  },
  children: [
    {
      path: 'bplist',
      component: () => import('@/views/bpmanagement/bplist'),
      name: 'bplist',
      meta: { title: 'BP列表' }
    },
    {
      path: 'custpsn',
      component: () => import('@/views/bpmanagement/custpsn'),
      name: 'custpsn',
      meta: { title: '客户人员' }
    },
    {
      path: 'test',
      component: () => import('@/views/bpmanagement/test'),
      name: 'test',
      meta: { title: 'test' }
    },
    {
      path: 'contactlist',
      component: () => import('@/views/bpmanagement/contactlist'),
      name: 'contactlist',
      meta: { title: '沟通记录' }
    }
  ]
}
export default BPRouter

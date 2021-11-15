/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const BPRouter = {
  path: '/bpmanagement',
  component: Layout,
  redirect: '/bpmanagement/bplist',
  name: 'Table',
  meta: {
    title: 'BP列表',
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
      path: 'bpmember',
      component: () => import('@/views/bpmanagement/bpmember'),
      name: 'bpmember',
      meta: { title: '客户人员' }
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

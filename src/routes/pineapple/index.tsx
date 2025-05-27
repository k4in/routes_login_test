import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pineapple/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pineapple/"!</div>
}

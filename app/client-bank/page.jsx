import React from 'react'
import Aside from '../components/UI/Aside'
import Link from 'next/link'

const page = () => {
  return (
    <main className="flex">
    <Aside>
      <Link className="link text-lg mb-4 " href="/client-documents">Documents</Link>
      <Link className="link text-lg link-active" href="/client-bank">Bank Connection</Link>
    </Aside>
    <div>client-bank</div>
  </main>
  )
}

export default page
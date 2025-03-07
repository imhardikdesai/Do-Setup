'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const CampaignCard = ({ campaign }: any) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden campaign-card' data-campaign-id={campaign.id}>
      <Image
        src={campaign.imageUrl}
        alt={campaign.altText}
        className='w-full h-48 object-cover'
        width={1000}
        height={1000}
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>{campaign.title}</h2>
        <p className='text-gray-600'>{campaign.description}</p>
        <div className='mt-4 flex justify-between items-center'>
          <span className='text-sm text-gray-500'>
            Status:
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.statusColor}`}
            >
              {campaign.status}
            </span>
          </span>
          <button className='text-blue-500 hover:underline view-details-btn' onClick={toggleDetails}>
            View Details
          </button>
        </div>
        <div className={`campaign-details mt-4 ${showDetails ? '' : 'hidden'}`}>
          {campaign.details.map((detail: any, index: any) => (
            <p key={index}>{detail}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

const KeyMetric = ({ title, value, color }: any) => (
  <div className='bg-white rounded-lg shadow-md p-4'>
    <h3 className='text-lg font-semibold text-gray-700'>{title}</h3>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
)

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const campaigns = [
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      altText: 'Summer Sale 2024 Campaign Image',
      title: 'Summer Sale 2024',
      description: 'Drive sales with a massive summer discount.',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      details: [
        'Additional details about the Summer Sale 2024 campaign.',
        'Start Date: 2024-06-01',
        'End Date: 2024-08-31'
      ]
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      altText: 'New Product Launch Campaign Image',
      title: 'New Product Launch',
      description: 'Introduce our latest innovation to the market.',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      details: [
        'Additional details about the New Product Launch campaign.',
        'Product: AwesomeGadget 3000',
        'Target Audience: Tech Enthusiasts'
      ]
    },
    {
      id: 3,
      imageUrl:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9mZmVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      altText: 'Holiday Promotion Campaign Image',
      title: 'Holiday Promotion',
      description: 'Boost end-of-year sales with festive offers.',
      status: 'Inactive',
      statusColor: 'bg-red-100 text-red-800',
      details: [
        'Additional details about the Holiday Promotion campaign.',
        'Discount: 20% off all items',
        'Duration: December 1st - December 25th'
      ]
    }
  ]

  const keyMetrics = [
    { title: 'Total Impressions', value: '125,000', color: 'text-blue-500' },
    { title: 'Click-Through Rate', value: '4.5%', color: 'text-green-500' },
    { title: 'Conversion Rate', value: '2.1%', color: 'text-yellow-500' },
    { title: 'Total Conversions', value: '2,625', color: 'text-indigo-500' }
  ]

  return (
    <div>
      {/* Navbar */}
      <nav className='bg-white shadow-md'>
        <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
          <a href='#' className='text-xl font-semibold'>
            Hardik Desai&apos;s Template
          </a>

          {/* Mobile Menu Button */}
          <button id='mobile-menu-button' className='md:hidden' onClick={toggleMobileMenu}>
            <span className='material-symbols-outlined'>menu</span>
          </button>

          {/* Nav Links */}
          <div className='hidden md:flex space-x-4'>
            <a href='#' className='hover:text-blue-500'>
              Dashboard
            </a>
          </div>
        </div>

        {/* Mobile Menu (Hidden by default) */}
        <div id='mobile-menu' className={`${isMobileMenuOpen ? '' : 'hidden'} md:hidden bg-gray-100 py-2 px-4`}>
          <a href='#' className='block py-1 hover:text-blue-500'>
            Dashboard
          </a>
        </div>
      </nav>

      <div className='container mx-auto p-8'>
        <header className='mb-8'>
          <h1 className='text-3xl font-semibold mb-2'>Marketing Campaign Overview</h1>
          <p className='text-gray-600'>Stay updated on your latest marketing initiatives.</p>
        </header>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Active Campaigns</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Key Metrics</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {keyMetrics.map((metric, index) => (
              <KeyMetric key={index} title={metric.title} value={metric.value} color={metric.color} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App

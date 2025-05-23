import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import React from 'react'

function EventCard({ event, isRegistered = false }) {
  const { id, title, description, image, date, location, category } = event
  const { t } = useTranslation()

  const formattedDate = format(new Date(date), 'MMMM d, yyyy')

  const truncatedDescription = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description

  return (
    <div className="card hover:shadow-md transition-shadow duration-300 relative flex flex-col justify-between bg-white dark:bg-gray-900 rounded-xl">
      <div>
        <div className="relative">
          <img
            src={image || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
            alt={title}
            className="w-full h-48 object-cover rounded-t-xl"
          />

          {/* Category Tag */}
          <div className="absolute top-2 end-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            {category}
          </div>

          {/* Registered Badge */}
          {isRegistered && (
            <div className="absolute top-2 start-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              ✅ {t('registered')}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{truncatedDescription}</p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
            <FiCalendar />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 rtl:flex-row-reverse rtl:space-x-reverse space-x-2">
            <FiMapPin />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between px-4 pb-4 mt-auto gap-2">
        {isRegistered ? (
          <Link to={`/events/${id}`} className="btn-outline w-full">
            {t('viewDetails')}
          </Link>
        ) : (
          <Link to={`/events/${id}`} className="btn-primary w-full">
            {t('bookNow')}
          </Link>
        )}
      </div>
    </div>
  )
}

export default EventCard

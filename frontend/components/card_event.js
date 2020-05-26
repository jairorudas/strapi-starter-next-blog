import React from 'react'
import Link from 'next/link'

const CardEvent = ({ event }) => {
  const imageUrl = event.thumb.url.startsWith('/')
    ? process.env.NEXT_PUBLIC_API_URL + event.thumb.url
    : event.thumb.url
  return (
    <Link as={`/event/${event.id}`} href="/event/[id]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <img src={imageUrl} alt={event.thumb.url} height="100" />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {event.category.name}
            </p>
            <p id="title" className="uk-text-large">
              {event.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardEvent

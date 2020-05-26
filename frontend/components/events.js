import React from 'react'
import CardEvent from './card_event'

const Events = ({ events }) => {
  const leftArticlesCount = Math.ceil(events.length / 5)
  const leftArticles = events.slice(0, leftArticlesCount)
  const rightArticles = events.slice(leftArticlesCount, events.length)

  return (
    <div>
      <div className="uk-child-width-1-2 uk-grid" data-uk-grid>
        <div>
          {leftArticles.map(event => {
            return <CardEvent event={event} key={`event__${event.id}`} />
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match uk-grid uk-grid-stack" data-uk-grid>
            {rightArticles.map(event => {
              return <CardEvent event={event} key={`event__${event.id}`} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events

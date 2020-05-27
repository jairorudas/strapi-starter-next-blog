// import React from 'react';
// import ReactDOM from 'react-dom';
import Iframe from 'react-iframe'
import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment'
import { getEvents, getEvent, getCategories } from '../../lib/api'
import Layout from '../../components/layout'
import DownloadLink from '../../components/download_link'
// import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';
// import { TwitchEmbed } from 'react-twitch-embed';

// import ReactTwitchEmbedVideo from "react-twitch-embed-video"



const Event = ({ event, categories }) => {
  // const imageUrl = event.thumb.url.startsWith('/')
  //   ? process.env.NEXT_PUBLIC_API_URL + event.thumb.url
  //   : event.thumb.url
  // const imageUrl = process.env.NEXT_PUBLIC_API_URL + event.thumb.url;
  const imageUrl = event.thumb.url;


  return (
    <Layout categories={categories}>
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{event.title}</h1>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown source={event.description} />
          <p>
          Dynamic URL: {event.youtube_url}<br/>
          <Iframe url={event.youtube_url}
                  width="450px"
                  height="450px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"/>
          </p>
          <p>
          openprocessing: {event.openprocessing_iframe}<br/>
          <Iframe url={event.openprocessing_iframe}
                  width="800px"
                  height="850px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"/>
          </p>
          <p>
            <ReactMarkdown source={event.iframe} />
          </p>
          <p><DownloadLink to={imageUrl}
                           children="Download" />
          </p>
          <p>
            { /*
            <TwitchEmbed
              channel="moonstar_x"
              id="moonstar_x"
              theme="dark"
              muted
              onVideoPause={() => console.log(':(')}
            />

            
            <TwitchChat className="chat-embed-boder" channel="moonstar_x" theme="dark" />
            <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" />
            <TwitchPlayer video="333014765" />
             */ }
          </p>

          { /*<Link to={imageUrl} target="_blank" download>Download Link</Link> */ }
          
          <p>
            
          </p>
          <p>
            <Moment format="MMM Do YYYY">{event.published_at}</Moment>
          </p>

        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const events = (await getEvents()) || []
  return {
    paths: events.map(event => ({
      params: {
        id: event.id,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const event = (await getEvent(params.id)) || []
  const categories = (await getCategories()) || []
  return {
    props: { event, categories },
  }
}

export default Event

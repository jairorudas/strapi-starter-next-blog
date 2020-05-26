import React from 'react'
import Articles from '../components/articles'
import Events from '../components/events'
import Layout from '../components/layout'
import { getArticles, getCategories, getEvents } from '../lib/api'

const Home = ({ articles, categories, events }) => {
  return (
    <Layout categories={categories}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Strapi blog</h1>
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const articles = (await getArticles()) || []
  const categories = (await getCategories()) || []
  const events = (await getEvents()) || []
  return {
    props: { articles, categories, events },
  }
}

export default Home

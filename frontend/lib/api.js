async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getArticles() {
  const data = await fetchAPI(`query Articles {
    articles {
      id
      title
      category {
        id
        name
      }
      image {
        url
      }
    }
  }`)
  return data.articles
}

export async function getArticle(id) {
  const data = await fetchAPI(
    `query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      content
      image {
        url
      }
      category {
        id
        name
      }
      published_at
    }
  }`,
    { variables: { id } }
  )
  return data.article
}

export async function getEvents() {
  const data = await fetchAPI(`query Events {
    events {
      id
      title
      category {
        id
        name
      }
      thumb {
        url
      }
    }
  }`)
  return data.events
}

export async function getEvent(id) {
  const data = await fetchAPI(
    `query Events($id: ID!) {
    event(id: $id) {
      id
      title
      description
      live_datetime
      display
      thumb{
        url
        previewUrl
      }
      youtube_url
      openprocessing_iframe
      iframe
      video{
        id
        url
      }
      category {
        id
        name
      }
      vimeo_url
    }
  }`,
    { variables: { id } }
  )
  return data.event
}

export async function getCategories() {
  const data = await fetchAPI(`query Categories {
    categories {
      id
      name
    }
  }`)
  return data.categories
}

export async function getCategory(id) {
  const data = await fetchAPI(
    `query Category($id: ID!) {
    category(id: $id) {
      id
      name
      articles {
        id
        title
        content
        image {
          url
        }
        category {
          id
          name
        }
      }
      events {
        id
        title
        description
        thumb {
          url
        }
        category {
          id
          name
        }
      }
    }
  }
`,
    { variables: { id } }
  )
  return data.category
}

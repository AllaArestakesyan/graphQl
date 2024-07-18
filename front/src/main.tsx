import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import ApolloProviderWrapper from "./app/ApolloClient"
import { store } from "./app/store"
import "./index.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <ApolloProviderWrapper>
        <App />
      </ApolloProviderWrapper>
    </Provider>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

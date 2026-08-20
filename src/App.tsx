import { RouterProvider } from "react-router-dom"
import { router } from "@/routes"
import { UserProvider } from "@/context/UserContext"
import { ThemeProvider } from "@/context/ThemeContext"
import { I18nProvider } from "@/lib/i18n"

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App

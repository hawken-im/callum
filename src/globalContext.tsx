import { createContext, useContext } from "react"

export type GlobalContent = {
  copy: string
  setCopy:(c: string) => void
}

export const MyGlobalContext = createContext<GlobalContent>({
copy: 'Hello World', // set a default value
setCopy: () => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)
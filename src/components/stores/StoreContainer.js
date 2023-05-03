import { useState } from "react"
import { StoreSearch } from "./StoreSearch"
import { StoreList } from "./StoreList"

export const StoreContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <StoreSearch setterFunction={setSearchTerms}/> 
    <StoreList searchTermState={searchTerms} />
    </>
}
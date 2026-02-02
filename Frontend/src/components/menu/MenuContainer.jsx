import { useState, useCallback } from "react"
import useDebounce from "../../hooks/useDebounce"
import useFetch from "../../hooks/useFetch"
import { getMenuItems } from "../../api/menuApi"
import MenuFilters from "./MenuFilters"
import MenuTable from "./MenuTable"

const MenuContainer = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  const fetchMenuItems = useCallback(() => {
    return getMenuItems({ q: debouncedSearch })
  }, [debouncedSearch])

  const {
    data: menuItems,
    loading,
    error,
    setData: setMenuItems,
  } = useFetch(fetchMenuItems, [fetchMenuItems])

  return (
    <>
      <MenuFilters search={search} setSearch={setSearch} />
      <MenuTable
        menuItems={menuItems}
        loading={loading}
        error={error}
        setMenuItems={setMenuItems}
      />
    </>
  )
}

export default MenuContainer
